import gql from 'graphql-tag';
import client from '../apollo';
import {
  IP_FETCH_PENDING,
  IP_FETCH_SUCCESS,
  IP_FETCH_FAIL,
  SET_LAT_LONG,
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

function getLatLong(ip) {
  return (dispatch) => {
    const ipQuery = gql`
      {
        getLocation(ip: "${ip}") {
          location {
            latitude
            longitude
          }
        }
      }
    `;
    return client.query({ query: ipQuery }).then(
      (res) => {
        if (!res.data.getLocation.location) throw Error();
        return res.data.getLocation.location;
      },
      (error) => {
        dispatch(ipFetchFail('error with graphql request'));
        throw error;
      },
    );
  };
}
export const setLatLong = data => ({
  type: SET_LAT_LONG,
  data,
});

function getAddress() { // {latitude, longitude}
  return (dispatch) => {
    return new Promise(() => {
      true === true;
    });
  };
}

export const fetchAddressesAndDistance = (origin, destination) => {
  console.log('heeeey');

  return (dispatch, getState) => {
    dispatch(ipFetchPending());
    const originIp = getState().inputField.origin;
    if (!originIp) throw new Error('invalid origin IP value');
    return dispatch(getLatLong(originIp)).then((res) => {
      if (!res.latitude || !res.longitude) throw new Error('origin ip failed fetch');
      dispatch(setLatLong(res));
      const destinationIp = getState().inputField.destination;
      if (!destinationIp) throw new Error('invalid destination IP value');
      return dispatch(getLatLong(destinationIp)).then((res2) => {
        if (!res2.latitude || !res2.longitude) throw new Error('destination ip failed fetch');
        dispatch(setLatLong(res2));
        return dispatch(getAddress(), getState()).then((res3) => {
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