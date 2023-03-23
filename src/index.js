import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Link, NavLink, Switch, useHistory } from 'react-router-dom';
import Users from './components/Users';
import Profile from './components/Profile';


const Root = () => {
  // click handler function
  const handleClick = () => {
    console.log('Thanks for clicking!')
  };
  return (
    
    <BrowserRouter>
      <div>
        <Link to="/">App</Link>
        <Link to="/users">Users</Link>
        <Link to="/users/1">Andrew's Profile</Link>

        {/* Link with onClick prop */}
        <Link to="/" onClick={handleClick}>App with click handler</Link>
        <br />
        <br />


        <NavLink to="/" exact={true} activeStyle={{ fontWeight: "bold" }}>App</NavLink>
        <NavLink exact activeClassName="red" to="/users">Users</NavLink>
        <NavLink activeClassName="blue" to="/hello">Hello</NavLink>
        <NavLink activeClassName="green" to="/users/1">Andrew's Profile</NavLink>
        <NavLink to="/" exact onClick={handleClick}>App with click handler</NavLink>

        {/* TODO: Routes */}
        <Switch>
          <Route exact path="/">
            <App />

          </Route>
          <Route path="/users/:userId">
            <div>
              <Profile />
            </div>
          </Route>
          <Route exact path="/users">
            <div>
              <Users />
            </div>
          </Route>

        
          <Route>
            <h1>404: Page not found</h1>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>

  );
};
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);