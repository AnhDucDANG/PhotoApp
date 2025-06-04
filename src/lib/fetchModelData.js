/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url - The URL to issue the GET request.
 * @returns {Promise<object>} - A promise that resolves to the model data.
 */
function fetchModel(url) {
  return fetch(`http://localhost:8081${url}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Fetch model failed:", error);
      throw error;
    });
}

export default fetchModel;
