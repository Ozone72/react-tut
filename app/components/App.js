var React = require("react");
var ReactRouter = require("react-router-dom");
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
/*------- User created requires -------*/
var Nav = require("./Nav");
var Home = require("./Home");
var Battle = require("./Battle");
var Popular = require("./Popular");

/*-------Components------- */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            {/*Commenting in React is a pain... Anyhoo, remember that exact path
          is needed when you don't want the previous route's UI to show up */}
            <Route exact path="/" component={Home} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/popular" component={Popular} />
            <Route
              render={function() {
                return <h1>Page Not Found</h1>;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
/*------- Export -------*/
module.exports = App;
