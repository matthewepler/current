import gql from 'graphql-tag';
import client from '../apollo';
import { parseDuration } from '../utils/helpers';
import {
  FETCH_PENDING,
  FETCH_SUCCESS,
  FETCH_FAIL,
  SET_LOCATION_DATA,
  SET_ADDRESS_DATA,
  SET_DURATION_DATA,
  SET_VOICE,
} from '../utils/constants';

// data calls have started
export const fetchPending = () => ({
  type: FETCH_PENDING,
});

// all data calls were successful
export const fetchSuccess = data => ({
  type: FETCH_SUCCESS,
  data,
});

// data calls did not succeed or returned bad data
export const fetchFail = msg => ({
  type: FETCH_FAIL,
  data: msg,
});

// save lat/long in state
export const setLocationData = data => ({
  type: SET_LOCATION_DATA,
  data,
});

// save street address in state
export const setAddressData = data => ({
  type: SET_ADDRESS_DATA,
  data,
});

// save travel duration time in state
export const setDuration = data => ({
  type: SET_DURATION_DATA,
  data,
});

// get lat/long using GraphQL
const getLocationData = (ip) => {
  return (dispatch) => {
    // data request model
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
    // actual data request
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
};

// response parser for GraphQL results
function extractDataObject(result) {
  return {
    location: {
      latitude: result.location.latitude,
      longitude: result.location.longitude,
    },
  };
}

// create a text string based on length of duration in minutes
export const setVoice = (durationStr) => {
  let voiceStr;
  const minutesTotal = parseDuration(durationStr);
  if (minutesTotal <= 20) {
    voiceStr = 'You\'ll be there in a jiffy!';
  } else if (minutesTotal > 20 && minutesTotal < 120) {
    voiceStr = 'It\'s not THAT bad. Bring tunes!';
  } else if (minutesTotal >= 120) {
    voiceStr = 'Bring snacks. Lots of snacks.';
  }
  return {
    type: SET_VOICE,
    data: voiceStr,
  }
}

// use lat/long in state to query Google API for travel duration
function getTravelDuration() {
  return (dispatch, getState) => {
    const [origin, destination] = getState().app.latLongs;
    const originString = `${origin.latitude},${origin.longitude}`;
    const destinationString = `${destination.latitude},${destination.longitude}`;
    const paramString = `origin=${originString}&destination=${destinationString}`;
    const uri = 'https://maps.googleapis.com/maps/api/directions/json?';

    return fetch(uri + paramString,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then((resp) => {
        return resp.json();
      }).then((data) => {
        if (data.routes.length < 1) throw new Error('(no route returned from Google Maps)');
        const result = data.routes[0].legs[0];
        dispatch(setAddressData(result.start_address));
        dispatch(setAddressData(result.end_address));
        dispatch(setDuration(result.duration.text));
        dispatch(setVoice(result.duration.text));
      })
      .catch((err) => {
        console.error(err);
        dispatch(fetchFail(err.message));
      });
  };
}

// Sample IP Addresses that work
// 66.71.248.230
// 184.152.73.85

// The main function that kicks off all data fetches
export const fetchLocationDataAndDuration = (origin, destination) => {
  return (dispatch, getState) => {
    // give the user some feedback that we're getting some data
    dispatch(fetchPending());

    // ip data is saved in state when user exits an input field so we already have it
    // get the lat/long for the origin
    const originIp = getState().inputField.origin;
    if (!originIp) throw new Error('invalid origin IP value');
    return dispatch(getLocationData(originIp)).then((res) => {
      if (!res.location) throw new Error('origin ip failed fetch');
      const data = extractDataObject(res);
      dispatch(setLocationData(data));

      // get the lat/long for the destination
      const destinationIp = getState().inputField.destination;
      if (!destinationIp) throw new Error('invalid destination IP value');
      return dispatch(getLocationData(destinationIp)).then((res2) => {
        if (!res2.location) throw new Error('destination ip failed fetch');
        const data2 = extractDataObject(res2);
        dispatch(setLocationData(data2));

        // using lat/longs, get the duration for travel between the two
        return dispatch(getTravelDuration()).then((res3) => {
          // update state if successful, causing re-render of DOM
          dispatch(fetchSuccess());
        });
      });
    }).catch((err) => {
      console.error(err);
    });
  };
};
