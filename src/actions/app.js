import gql from 'graphql-tag';
import client from '../apollo';
import {
  IP_FETCH_PENDING,
  IP_FETCH_SUCCESS,
  IP_FETCH_FAIL,
  SET_LOCATION_DATA,
} from '../utils/constants';

export const ipFetchPending = () => ({
  type: IP_FETCH_PENDING,
});

export const ipFetchSuccess = data => ({
  type: IP_FETCH_SUCCESS,
  data,
});

export const ipFetchFail = msg => ({
  type: IP_FETCH_FAIL,
  data: msg,
});

function getLocationData(ip) {
  return (dispatch) => {
    const ipQuery = gql`
      {
        getLocation(ip: "${ip}") {
          location {
            latitude
            longitude
          }
          country {
            names {
              en
            }
          }
          city {
            names {
              en
            }
          }
        }
      }
    `;
    return client.query({ query: ipQuery }).then(
      (res) => {
        if (!res.data.getLocation) throw Error();
        return res.data.getLocation;
      },
      (error) => {
        dispatch(ipFetchFail('error with graphql request'));
        throw error;
      },
    );
  };
}
export const setLocationData = data => ({
  type: SET_LOCATION_DATA,
  data,
});

export const getSingleAddress = ({ latitude, longitude }) => {
  return (dispatch) => {
    return fetch('http://maps.googleapis.com/maps/api/directions/json?origin=${},${}&desintation=${},${}') // <- test that the thunk is working, then replace this fetch with the GraphQL one
      .then((resp) => {
        if (!resp.ok) {
          throw Error(resp.statusText);
        }
        return resp;
      })
      .then((resp) => {
        resp.json();
        console.log(resp.json());
      })
      .then(items => dispatch(ipFetchSuccess(items)))
      .catch(() => {
        console.log('fetch failed');
        dispatch(ipFetchFail());
      });
  }
};

function getAddresses() { // {latitude, longitude}
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      resolve(true);
    })
  };
}

function extractDataObject(result) {
  return {
    address: {
      city: result.city.names.en,
      country: result.country.names.en,
    },
    location: {
      latitude: result.location.latitude,
      longitude: result.location.longitude,
    },
  };
}

export const fetchAddressesAndDistance = (origin, destination) => {
  return (dispatch, getState) => {
    dispatch(ipFetchPending());
    const originIp = getState().inputField.origin;
    if (!originIp) throw new Error('invalid origin IP value');
    return dispatch(getLocationData(originIp)).then((res) => {
      if (!res.location) throw new Error('origin ip failed fetch');
      const data = extractDataObject(res);
      dispatch(setLocationData(data));
      const destinationIp = getState().inputField.destination;
      if (!destinationIp) throw new Error('invalid destination IP value');
      return dispatch(getLocationData(destinationIp)).then((res2) => {
        if (!res2.location) throw new Error('destination ip failed fetch');
        const data2 = extractDataObject(res2);
        dispatch(setLocationData(data2));
        return dispatch(getAddresses()).then((res3) => {
          console.log('well look at you go:', res3);
        });
      });
    }).catch((err) => {
      console.error(err);
    });
  };
};

// export const ipFetch = (origin, destination) => {
//   console.log('heeeey');
//   return (dispatch) => {
//     console.log('ipFetch is happening');
//     dispatch(ipFetchPending());
//     fetch('https://openlibrary.org/api/books?bibkeys=ISBN:0451526538') // <- test that the thunk is working, then replace this fetch with the GraphQL one
//       .then((resp) => {
//         if (!resp.ok) {
//           throw Error(resp.statusText);
//         }
//         return resp;
//       })
//       .then((resp) => {
//         resp.json();
//         console.log(resp.json());
//       })
//       .then(items => dispatch(ipFetchSuccess(items)))
//       .catch(() => {
//         console.log('fetch failed');
//         dispatch(ipFetchFail());
//       });
//   };
// }