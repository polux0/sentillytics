import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import HomePage from './views/home';
import Header from './views/Header';
import Analisys from './views/Analisys';
import Login from './views/Login';
import MyAccount from './views/MyAccount';
import ChartTestDevelopment from './views/ChartTestDevelopment';
import {Auth} from './components/Auth';
import Register from './views/Register';
import Projects from './views/Projects';
import Project from './views/Project';

const test = () => {

  if (localStorage.getItem('token') && localStorage.getItem('userId')) {
    Auth.isAuthenticated = true;
    Auth.token = localStorage.getItem('token');
    Auth.userId = localStorage.getItem('userId');
  }
  else Auth.isAuthenticated = false;
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Auth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

const App = () => (

  <Router>
    <div>
      <Header />
      <div className="content">
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={About} />
      <Route path="/:lang/about" component={About} />
      <Route path="/topics" component={Topics} />
      <Route path="/analisys" component={Analisys} />
      <Route path="/devtest" component={ChartTestDevelopment} />
      <Route path="/:lang/analisys" component={Analisys} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/projects" component={Projects} />
      <Route path="/project/:id" component={Project} />
      <Route path="/register" component={Register} />
      
      <PrivateRoute path="/my-account" component={MyAccount} />
      
      </div>
      <Footer />
    </div>
  </Router>
);

{test()}
//const Home = () => <h2>Home test</h2>;
const About = ({ match }) => <h2>About {match.params.lang}</h2>;
const Topic = ({ match }) => <h3>Requested Param: {match.params.id}</h3>;
const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>

    <ul>
      <li>
        <Link to={`${match.url}/components`}>Components {match.path}</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.path}/:id`} component={Topic} />
    <Route
      exact
      path={match.path}
      render={() => <h3>Please select a topic.</h3>}
    />

  </div>
);


const Footer = () => (
  <div className="footer">Sentilytics 2019, all rights reserved</div>
);

export default App;
