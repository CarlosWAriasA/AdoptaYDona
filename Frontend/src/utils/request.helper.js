const RequestHelper = {
  get: async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in GET request:", error.message);
      throw error;
    }
  },

  post: async (
    url,
    data,
    headers = {
      "Content-Type": "application/json",
    }
  ) => {
    try {
      console.log("making request", data);
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error in POST request:", error.message);
      throw error;
    }
  },
};

export default RequestHelper;
