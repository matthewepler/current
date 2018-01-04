import gql from 'graphql-tag';
import client from '../apollo';
import {
  FETCH_PENDING,
  FETCH_SUCCESS,
  FETCH_FAIL,
  SET_LOCATION_DATA,
  SET_ADDRESS_DATA,
  SET_DURATION_DATA,
} from '../utils/constants';

export const fetchPending = () => ({
  type: FETCH_PENDING,
});

export const fetchSuccess = data => ({
  type: FETCH_SUCCESS,
  data,
});

export const fetchFail = msg => ({
  type: FETCH_FAIL,
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
        dispatch(fetchFail('error with graphql request'));
        throw error;
      },
    );
  };
}
export const setLocationData = data => ({
  type: SET_LOCATION_DATA,
  data,
});

export const setAddressData = data => ({
  type: SET_ADDRESS_DATA,
  data,
})

export const setDuration = data => ({
  type: SET_DURATION_DATA,
  data,
})

function getTravelDistance() { // {latitude, longitude}
  return (dispatch, getState) => {
    const [origin, destination] = getState().app.latLongs;
    const originString = `${origin.latitude},${origin.longitude}`;
    const destinationString = `${destination.latitude},${destination.longitude}`;
    const paramString = `origin=${originString}&destination=${destinationString}`;
    const uri = 'http://maps.googleapis.com/maps/api/directions/json?';

    return fetch(uri + paramString,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then((resp) => {
        return resp.json()
      }).then((data) => {
        if (data.routes.length < 1) throw new Error('(no route returned from Google Maps)');
        const result = data.routes[0].legs[0];
        console.log(result);
        dispatch(setAddressData(result.start_address));
        dispatch(setAddressData(result.end_address));
        dispatch(setDuration(result.duration.text));

      })
      .catch((err) => {
        console.error(err);
        dispatch(fetchFail(err.message));
      });
  };
}

// 66.71.248.230
// 184.152.73.85

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
    dispatch(fetchPending());
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
        return dispatch(getTravelDistance()).then((res3) => {
          dispatch(fetchSuccess());
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