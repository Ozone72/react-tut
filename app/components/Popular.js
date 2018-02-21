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

// require propTypes
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
      </div>
    );
  }
}

module.exports = Popular;
