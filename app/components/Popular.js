var React = require("react");
var PropTypes = require("prop-types");
var api = require("../utils/api");

// stateless functional component
function SelectLanguage(props) {
  var languages = [
    "All",
    "JavaScript",
    "Python",
    "Ruby",
    "Go",
    "C#",
    "Rust",
    "CSS"
  ];
  return (
    <ul className="languages">
      {languages.map(function(lang) {
        return (
          //  have to use .bind to pass lang to initial function
          <li
            style={
              lang === props.selectedLanguage ? { color: "#EC53FF" } : null
            }
            onClick={props.onSelect.bind(null, lang)}
            key={lang}
          >
            {lang}
          </li>
        );
      })}
    </ul>
  );
}

// function to take in repos as props and return gridded items
function RepoGrid(props) {
  return (
    <ul className="popular-list">
      {props.repos.map(function(repo, index) {
        return (
          <li key={repo.name} className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={"Avatar for " + repo.owner.login}
                />
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

// propTypes for our 2 components taking in props
RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

class Popular extends React.Component {
  //   constructor that sets initial state of the component
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All"
    };
    // in order for this.updateLanguage to be invoked correctly with the right context, we need to bind the 'this' keyword (returns a new function)this.updateLanguage so that it's always invoked correctly
    this.updateLangage = this.updateLangage.bind(this);
  }
  // lifecycle event
  componentDidMount() {
    this.updateLangage(this.state.selectedLanguage);
  }
  //   method for updating the selected language state
  updateLangage(lang) {
    this.setState(function() {
      return { selectedLanguage: lang, repos: null };
    });
    // Ajax request to our api, passing in current selectedLanguage, and with promise, should return some repos
    api.fetchPopularRepos(lang).then(
      function(repos) {
        // console.log("repos: ", repos);
        this.setState(function() {
          return {
            repos: repos
          };
        });
      }.bind(this)
    );
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLangage}
        />
        {!this.state.repos ? (
          <p>LOADING...</p>
        ) : (
          <RepoGrid repos={this.state.repos} />
        )}
      </div>
    );
  }
}

module.exports = Popular;
