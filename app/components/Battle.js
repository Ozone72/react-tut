var React = require("react");
var PropTypes = require("prop-types");

class PlayerInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };
  }

  render() {
    return (
      <form className="column">
        <label htmlFor="username" className="header">
          {this.props.label}
        </label>
        <input
          type="text"
          id="username"
          placeholder="GitHub username"
          autoComplete="off"
          value={this.state.username}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};
class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: "",
      playerTwoName: "",
      playerOneImage: null,
      playerTwoImage: null
    };

    this.handleSubmit = this.state.bind(this);
  }
  handleSubmit(id, username) {
    this.setState(function() {
      var newState = {};
      newState[id + "Name"] = username;
      newState[id + "Image"] =
        "https://github.com/" + username + ".png?size=200";
      return newState;
    });
  }
  render() {
    return (
      <div>
        <div className="row">
          {!playerOneName && (
            <PlayerInput
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />
          )}
          {!playerTwoName && (
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          )}
        </div>
      </div>
    );
  }
}

module.exports = Battle;
