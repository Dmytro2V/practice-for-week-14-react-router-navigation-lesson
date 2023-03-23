App Academy Open - home
Your Content

Practice: React Router Intro
Focus
Mark as Complete 
React Router
Router Introduction

3 users recently completed this Reading
Now that you know how to render components in a React app, how do you handle rendering components only on specific URL paths to simulate navigating through different webpages on a single page app? React Router is the answer!

Think about how you created server-side routes in your previous projects. For example, you could define a GET route for /users/:userId. Then, when a user goes to http://localhost:3000/users/2, this GET route would cause the server to respond with user 2's show page in HTML. In the default React setup, you lose the ability to create routes in this way. This is the problem React Router aims to solve.

React Router is a frontend routing library that allows you to control which components to display using the browser location. A user can also copy and paste a URL and email it to a friend or link to it from their own website.

When you finish this article, you should be able to use the following from the react-router-dom library:

<BrowserRouter> to provide your application access to the react-router-dom library; and
<Route> to connect specific URL paths to specific components you want rendered; and
<Switch> to wrap several Route elements, rendering only one even if several match the current URL; and
React Router's match prop to access route path parameters.
Getting started with routing
Since you are writing single page apps, you don't want to refresh the page each time you change the browser location. Instead, you want to update the browser location and your app's response using just JavaScript. This is known as client-side routing. You are using React, so you will use React Router to do this.

Create a simple react project template with npm:

npx create-react-app my-app --template @appacademy/react-v17 --use-npm
Change directory into my-app and install React Router:

cd my-app && npm install --save react-router-dom@^5.1.2
Start the React development server at http://localhost:3000:

npm start
Now import BrowserRouter from react-router-dom in your entry file, src/index.js:

// ./src/index.js
import { BrowserRouter } from 'react-router-dom';
BrowserRouter
BrowserRouter is the primary component of the router that wraps your route hierarchy. It makes routing information from React Router available to all its descendent components. For example, if you want to give <App> and all its children components access to React Router, you would wrap <App> like so:

// ./src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const Root = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};
(You would also need to connect this new Root component in ReactDOM.render instead of App.)

// ./src/index.js
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
Now you can route the rendering of certain components to certain URLs (e.g., https://www.website.com/profile).

HashRouter
Alternatively, you could import and use HashRouter from react-router-dom. Links for applications that use <HashRouter> would look like https://www.website.com/#/profile (with a # between the domain and path).

You'll focus on using <BrowserRouter>. <HashRouter> is primarily used in legacy code or for sites that need to be compatible with legacy browsers.

<Route> component
React Router helps your React application render specific components based on the URL path. The React Router component you'll use most often is <Route>.

The <Route> component is used to wrap another component, causing that component to be rendered only if a certain URL is matched. The behavior of the <Route> component is controlled by the following props: exact and path.

The App component at App.js is returning <h1>Hello from App</h1>. Add a ! to change the rendered text to Hello from App!. Create a similar component Users that returns <h1>Hello from Users!</h1>. To do this, add a components folder in the src folder and make a file called Users.js. The Users.js file should look exactly like App.js except with Users substituted everywhere for App.

Now let's refactor your index.js file so that you can create your routes within a Root component. First, run your imports. You'll need the App and Users component along with the BrowserRouter and Route components from react-router-dom.

// ./src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import Users from './components/Users';
const Root = () => {
  return (
    <BrowserRouter>
      <div>
        {/* TODO: Routes */}
      </div>
    </BrowserRouter>
  );
};
Finally, make sure that you have connected the Root component in ReactDOM.render instead of App.

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
Put it all together and you've got a dynamic browser routing component.

Note that BrowserRouter can only have a single child component, so the snippet above wraps all routes within a parent <div> element.

Now let's create some routes!

<Route>
Your Root component should render the App component at the root path of /. Do this by wrapping App with a Route containing a path prop set to /.

// ./src/index.js
// ...
const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/">
          <App />
        </Route>
      </div>
    </BrowserRouter>
  );
};
// ...
Navigate to http://localhost:3000. You should see the text, "Hello from App!"

Next, render the Users component at the path of /users.

// ./src/index.js
// ...
const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/">
          <App />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
      </div>
    </BrowserRouter>
  );
};
// ...
The wrapped component App will be rendered only when the path is matched. The path matches the URL when it matches some initial portion of the URL. For example, a path of / would match both / and /users URLs. (/ matches the URL /users because /users begins with a /.)

Take a moment to navigate to http://localhost:3000/users to see both "Hello from App!" and "Hello from Users!", which means both the App component and the Users component are rendering at the path of /users.

If you navigate to a route NOT beginning in /users, like /test, then you should only see the App component rendered.

exact prop
If this exact flag is set as a prop in the Route component, the path will match only when it exactly matches the URL. If you add exact to the route for App, then browsing to the /users path will no longer match / and only the Users component will be rendered (instead of both the App component and the Users component).

<Route exact path="/">
  <App />
</Route>
<Route path="/users">
  <Users />
</Route>
Navigate to http://localhost:3000/users. You should see only "Hello from Users!", which means only the Users component is rendering at the path of /users. The App component will now only render at exactly the path of /.

Path params and useParams
A component's props can also hold information about a URL's parameters. The router will match route segments starting at : up to the next /, ?, or #. Such segments are wildcard values that make up your route parameters.

For example, take the route below:

<Route path="/users/:userId">
  <Profile />
</Route>
The router would break down the full /users/:userId path into two parts: /users, :userId.

The Profile component can access the :userId part of the http://localhost:3000/users/:userId URL through a function given by React Router called useParams. useParams returns information about all the wildcard values in your route parameters.

To use it, simply import the useParams function from react-router-dom and call it inside of a React component. It returns a params object. For example:

import React from 'react';
import { useParams } from 'react-router-dom';

function Example() {
  const params = useParams();
}
The params object would then have a property of userId which would hold the value of the :userId wildcard value. Let's render the userId parameter in a user profile component. Take a moment to create a Profile.js file in the components folder with the following code:

// ./src/components/Profile.js
import React from "react";
import { useParams } from 'react-router-dom';

const Profile = () => {
  const params = useParams();
  const { userId } = params;

  return <h1>Hello from User Profile {userId}!</h1>
}

export default Profile;
Don't forget to import your Profile component in src/index.js!

In a real world application, you would use this wildcard to make an AJAX call to fetch the user information from the database and render the returned data in the Profile component. Recall that your Profile component was rendered at the path /users/:userId. Thus you can use your userId parameters to fetch a specific user.

The useParams function is a specific type of function used in React components called a hook. Hooks are functions that give a component access to data that doesn't need to be passed down directly by the parent component. They also help manage the flow of data across the multiple renders of a React component. You'll see more examples of React Router and React hooks later this week.

What you learned
In this article, you learned how to use the BrowserRouter and Route components from the React Router library. You also learned how to create routes to render specific components at different URL paths and manage the order of the routes. You learned how to use the exact prop flag on a Route component to ensure that only the specified path renders specified component. Finally, you learned how to use the useParams hook from the React Router library to access the params of the URL path and get the path's wildcard values.

To learn more about the Route component, see the docs on Route. To learn more about the React Router hook useParams, see the docs on useParams.

--------------------------
# Create React App Template

A no-frills template from which to create React applications with
[Create React App](https://github.com/facebook/create-react-app).

```sh
npx create-react-app my-app --template @appacademy/simple --use-npm
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
