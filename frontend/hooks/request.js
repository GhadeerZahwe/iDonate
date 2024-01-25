const UseHttp = async (url, method = "GET", body, header = {}) => {
  let data;
  const URL = "http://192.168.0.101:8000/api/";
  try {
    const Response =
      (await fetch(URL + url, {
        method: method,
        headers: header,
        body: body ? body : null,
      })) || null;
    data = await Response.json();
    if (!Response.ok) {
      throw new Error(data.message);
    }
  } catch (err) {
    console.log(err.message);
  }

  return data;
};

export default UseHttp;

// const URL = "http://ec2-13-39-108-7.eu-west-3.compute.amazonaws.com:80/api/";
