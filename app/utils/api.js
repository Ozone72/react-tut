var axios = require("axios");

module.exports = {
  // allows us to pass in the language, ping the github api
  fetchPopularRepos: function(language) {
    var encodedURI = window.encodeURI(
      "https://api.github.com/search/repositories?qstars:>1+language:" +
        language +
        "&sort=stars&order=desc&type=Repositories"
    );
    // axios uses a promise to provide a formatted response
    return axios.get(encodeURI).then(function(response) {
      return response.data.items;
    });
  }
};
