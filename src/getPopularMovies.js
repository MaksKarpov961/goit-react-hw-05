import axios from "axios";

const getMovies = async (type = "trending", query = "", id = null) => {
  const baseOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OWQ2NzNlYTRlNDFkMTBhMTQ0ZjZkMzQ4MGE1YTU0YiIsIm5iZiI6MTczMDg4NDMwOC42MjU5NDI1LCJzdWIiOiI2NzJiMzFhZTQyNGNjNmEzYmUyZTQ4YTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4RztPMpJL3rZyRbg0-trbxjyHdw9hkbVTGY6UmwzlWQ",
    },
  };

  let url = "";
  let params = {};

  if (type === "search") {
    url = "https://api.themoviedb.org/3/search/movie";
    params = {
      query: query,
      include_adult: "false",
      language: "en-US",
      page: "1",
    };
  } else if (type === "trending") {
    url = "https://api.themoviedb.org/3/trending/movie/day";
    params = {
      language: "en-US",
    };
  } else if (type === "moreInfo" && id) {
    url = `https://api.themoviedb.org/3/movie/${id}`;
    params = {
      language: "en-US",
    };
  } else {
    console.error("Invalid request type or missing ID for moreInfo");
    return null;
  }

  const requestOptions = {
    ...baseOptions,
    url,
    params,
  };

  try {
    const response = await axios.request(requestOptions);
    return type === "moreInfo" ? response.data : response.data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default getMovies;
