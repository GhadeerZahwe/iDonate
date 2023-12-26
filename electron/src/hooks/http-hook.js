const UseHttp = async (url, method = "GET", body = "", header = {}) => {
  let data;
  const URL = "http://localhost:8000/api/";
  try {
    const Response =
      (await fetch(URL + url, {
        method: method,
        headers: header,
        body: !!body ? body : null,
      })) || null;
    data = await Response.json();
    if (!Response.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
  return data;
};

export default UseHttp;
