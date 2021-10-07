export const fetchData = async (urlToFetch) => {
  try {
    const request = await fetch(urlToFetch);
    if (request.ok) {
      const jsonResponse = await request.json();
      return jsonResponse;
    }
    throw new Error(request.status);
  } catch (error) {
    console.log(error.message);
  }
};
