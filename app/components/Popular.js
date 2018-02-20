var React = require("react");
var PropTypes = require("prop-types");

class SelectLanguage extends React.Component {
  render() {
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
                lang === this.props.selectedLanguage
                  ? { color: "#EC53FF" }
                  : null
              }
              onClick={this.props.onSelect.bind(null, lang)}
              key={lang}
            >
              {lang}
            </li>
          );
        }, this)}
      </ul>
    );
  }
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

class Popular extends React.Component {
  //   adding a constructor to the class that sets initial state of the component
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All"
    };
    // need to add this because in order for this.updateLanguage to be invoked correctly with the right context, we need to bind the this keyword (returns a new function)this.updateLanguage so that it's always invoked correctly
    this.updateLangage = this.updateLangage.bind(this);
  }
  updateLangage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang
      };
    });
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
