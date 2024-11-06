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

  switch (type) {
    case "search":
      url = "https://api.themoviedb.org/3/search/movie";
      params = {
        query: query,
        include_adult: "false",
        language: "en-US",
        page: "1",
      };
      break;

    case "trending":
      url = "https://api.themoviedb.org/3/trending/movie/day";
      params = {
        language: "en-US",
      };
      break;

    case "moreInfo":
      if (!id) {
        console.error("ID is required for moreInfo request");
        return null;
      }
      url = `https://api.themoviedb.org/3/movie/${id}`;
      params = {
        language: "en-US",
      };
      break;

    case "cast":
      if (!id) {
        console.error("ID is required for cast request");
        return null;
      }
      url = `https://api.themoviedb.org/3/movie/${id}/credits`;
      params = {
        language: "en-US",
      };
      break;
    case "reviews":
      if (!id) {
        console.error("ID is required for reviews request");
        return null;
      }
      url = `https://api.themoviedb.org/3/movie/${id}/reviews`;
      params = {
        language: "en-US",
      };
      break;

    default:
      console.error("Invalid request type");
      return null;
  }

  const requestOptions = {
    ...baseOptions,
    url,
    params,
  };

  try {
    const response = await axios(requestOptions);
    if (type === "moreInfo") {
      return response.data;
    }

    return response.data.results || response.data.cast || response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default getMovies;
