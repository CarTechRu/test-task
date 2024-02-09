import axios from 'axios';

function handleRequestError(error, dispatch, action) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      dispatch(action(error.response.data.error));
    } else if (error.request) {
      dispatch(action('Request failed: no response received'));
    } else {
      dispatch(action('An unknown error occurred'));
    }
  } else {
    dispatch(action('An unknown error occurred'));
  }
}

export default handleRequestError;
