
export const wait = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Handles fetch errors and calls the onErrorCallback function if specified.
 * @param {Response} response - The response object from a fetch call.
 * @param {function} onErrorCallback - The callback function to be called when an error occurs. Defaults to a console.log message.
 * @returns {Response} The response object passed as input if there are no errors.
*/
export const handleFetchErrors = (response, onErrorCallback = () => console.log('No error callback function specified.')) => {
  if(!response.ok) {
    onErrorCallback(response);
    console.log(response)
    throw Error(response.statusText);
  }
  return response
}