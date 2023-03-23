import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, useParams } from 'react-router-dom';
import Users from './components/Users';
import Profile from './components/Profile';


const Root = () => {
  return (
    <BrowserRouter>
      <div>
        {/* TODO: Routes */}
        <Route exact path="/">
          <App />    
             
        </Route>

        <Route path="/users">
          <div>
            <Users />          
          </div>
        </Route>

        <Route path="/users/:userId">
          <div>
            <Profile />          
          </div>
        </Route>
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