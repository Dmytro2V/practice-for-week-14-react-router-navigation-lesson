Practice: React Router Navigation
Focus
Mark as Complete 
Navigation
Navigation

2 users recently completed this Reading
Now that you know how to create front-end routes with React Router, you'll need to implement a way for your users to navigate the routes! React Router's Link, NavLink, and Redirect components, and React Router's useHistory hook can help you do this.

In this article, you'll be working off of the demo project you built in the React Router Intro reading. When you finish this article, you should be able to use the following components from the react-router-dom library:

<Link> or <NavLink> to create links with relative paths to routes in your application (like "/users/1")
<Redirect> to redirect a user to another path (e.g., a login page when the user is not logged in)
React Router's useHistory hook to update a browser's URL programmatically.
Adding links for navigation
React Router's <Link> is one way to simplify navigation around your app. It issues an on-click navigation event to a route defined in your app's router. Using <Link> renders an anchor tag with a correctly set href attribute.

Link
To use it, update your imports from the react-router-dom package to include Link in your entry file, src/index.js:

// ./src/index.js
import { BrowserRouter, Route, Link } from 'react-router-dom';
Note that <Link> can take two props: to and onClick.

The to prop is a route location description that points to an absolute path (e.g., /users). Add the following Link components in your index.js file above your routes:

// ./src/index.js
// ...
const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/">App</Link>
        <Link to="/users">Users</Link>
        <Link to="/users/1">Andrew's Profile</Link>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/users/:userId">
          <Profile />
        </Route>
      </div>
    </BrowserRouter>
  );
};
// ...
The onClick prop is just like any other JSX click handler. You can write a function that takes in an event and handles it. Add the following Link before your routes and the following click handler function within your Root component:

// ./src/index.js
// ...
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

        <Route exact path="/">
          <App />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/users/:userId">
          <Profile />
        </Route>
      </div>
    </BrowserRouter>
  );
};
// ...
Now, test your routes and links! If you inspect the page, you'll see that your links are now rendered as <a> elements. Notice that clicking the App with click handler link logs a message in your console while directing your browser to render the App component.

NavLink
The <NavLink> works just like a <Link> but with a little extra functionality. It has the ability to add extra styling when the path it links to matches the current path. This makes it an ideal choice for a navigation bar, hence the name. This styling can be controlled by three extra props: activeClassName, activeStyle, and exact. To begin using NavLink, update your imports from the react-router-dom package:

import { BrowserRouter, Route, NavLink } from 'react-router-dom';
The activeClassName prop of the NavLink component allows you to set a CSS class name for styling the NavLink when its route is active. By default, the activeClassName is set to active. This means that you simply need to add an .active class to your CSS file to add active styling to your link. A NavLink will be active if its to prop path matches the current URL.

Update all your Link elements to NavLink elements. Now let's change your "Users", "Hello", and "Andrew's Profile" links to be different colors and have a larger font size when active. To do this, set an appropriate activeClassName prop on those NavLinks.

<NavLink to="/">App</NavLink>
<NavLink activeClassName="red" to="/users">Users</NavLink>
<NavLink activeClassName="blue" to="/hello">Hello</NavLink>
<NavLink activeClassName="green" to="/users/1">Andrew's Profile</NavLink>
<NavLink to="/" onClick={handleClick}>App with click handler</NavLink>
This is what the rendered HTML <a> tag will look like when the browser navigates to the / or /users path:

<!-- Navigated to the / path (the activeClassName
     prop is set to "active" by default) -->
<a href="/" class="active">App</a>

<!-- NOT navigated to the / path -->
<a href="/">App</a>
<!-- Navigated to the /users path (the activeClassName
     prop is manually set to "red") -->
<a href="/users" class="red">Users</a>

<!-- NOT navigated to the `/users` path -->
<a href="/users">Users</a>
Now add the following class styles to your index.css file:

.active {
  font-weight: bold;
}

.red {
  color: red;
  font-size: 30px;
}

.blue {
  color: blue;
  font-size: 30px;
}

.green {
  color: green;
  font-size: 30px;
}
Test your styled links! Notice how the App and App with click handler links are always boldface. This is because all of your links begin with--and thus include--the / path, meaning that the link to / will always be active. (Do you notice a related issue when you navigate to Andrew's Profile?)

The activeStyle prop is a style object that will be applied inline to the NavLink when its to prop matches the current URL. Add the following activeStyle to your App link and comment out the .active class in your CSS file.

<NavLink to="/" activeStyle={{ fontWeight: "bold" }}>App</NavLink>
Now the following html is rendered when at the / path:

<a href="/" style="font-weight:bold;" class="active">App</a>
Notice how your App with click handler is not boldface anymore. The default active class is still applied to the link, but that class no longer has any CSS stylings defined for it. Uncomment the .active class in your CSS file to bring the boldface back to this NavLink.

The exact prop is a boolean that defaults to false. If set to true, then the activeStyle and activeClassName props will only be applied when the current URL matches the to prop exactly. Update your App and App with click handler links with an exact prop set. Just like in your routes, you can use the exact flag instead of exact={true}.

<NavLink to="/" exact={true} activeStyle={{ fontWeight: "bold" }}>App</NavLink>
<NavLink to="/" exact onClick={handleClick}>App with click handler</NavLink>
Now your App and App with click handler links will appear in boldface only when you have navigated precisely to the / path.

Switching between routes
You came across styling issues because the /users and /users/1 paths matched the / path. Routing can have this issue as well. Sometimes, you want to select only one route to match out of a list of routes. React Router's <Switch> component can help you control the switching between routes.

The <Switch> component allows you to render only one <Route> even if several match the current URL. You can nest as many Routes as you wish between the opening and closing Switch tags, but only the first one that matches the current URL will be rendered.

This is particularly useful if you want a default component that will only render if none of our other routes match. View the example below. Without the Switch, DefaultComponent would always render: since there isn't set a path in the DefaultComponent route, it would simply use the default path of /. With the Switch, the DefaultComponent will render only when neither of the preceding routes match.

<Switch>
  <Route path="some/url">
    <SomeComponent />
  </Route>
  <Route path="some/other/url">
    <OtherComponent />
  </Route>
  <Route>
    <DefaultComponent />
  </Route>
</Switch>
Import Switch from react-router-dom and add <Switch> tags around your routes to take care of ordering and switching between your routes! Begin by adding the following route to the bottom of your routes to render a 404: Page not found message:

<Route>
  <h1>404: Page not found</h1>
</Route>
This is what your Root component should look like at this point:

// ./src/index.js
// ...
const Root = () => {
  // click handler function
  const handleClick = () => {
    console.log('Thanks for clicking!')
  };
  return (
    <BrowserRouter>
      <div>
        <NavLink to="/" exact={true} activeStyle={{ fontWeight: "bold" }}>App</NavLink>
        <NavLink activeClassName="red" to="/users">Users</NavLink>
        <NavLink activeClassName="blue" to="/hello">Hello</NavLink>
        <NavLink activeClassName="green" to="/users/1">Andrew's Profile</NavLink>
        {/* NavLink with onClick prop */}
        <NavLink to="/" exact onClick={handleClick}>App with click handler</NavLink>

        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/users/:userId">
            <Profile />
          </Route>
          <Route>
            <h1>404: Page not found</h1>
          </Route>
        </Switch>

      </div>
    </BrowserRouter>
  );
};
// ...
Now you have control over the precedence of rendered components! Try navigating to http://localhost:3000/asdf or any other route you have not defined. The <h1>404: Page not found</h1> JSX of the last <Route> will be rendered whenever the browser attempts to visit an undefined route.

Another thing to note is that the Profile component will not render at the path of /users/:userId anymore because the Route for the Users component will match the path of /users first. Go ahead and fix that!

Redirecting users
What if you want to redirect users to a login page when they aren't logged in? The <Redirect> component from React Router helps you redirect users!

The <Redirect> component takes only one prop: to. When it renders, it replaces the current URL with the value of its to prop. Typically, you conditionally render <Redirect> to redirect the user away from some page you don't want them to visit. The example below checks whether the wildcard of userId in the Profile component is an invalid id of 0. If so, then it will redirect the user to the home page, /.

// ./src/components/Profile.js
import React from "react";
import { Redirect, useParams } from 'react-router-dom';

const Profile = () => {
  const params = useParams();
  const { userId } = params;

  if (userId === "0") return <Redirect to="/" />;

  return <h1>Hello from User Profile {userId}!</h1>
}

export default Profile;
Note that useParams returns parameters as strings, so we have to check the value of userId against "0" instead of 0. (Alternatively, we could use parseInt() to transform userId into an int or simply use the == operator instead of ===.)

useHistory
You know how to redirect users with a <Redirect> component, but what if you need to redirect users programmatically? You've learned about React Router's useParams hook, now let's go over another one of the React Router hooks, useHistory!

The useHistory hook returns a history object that has convenient methods for navigation. history lets you update the URL programmatically. For example, suppose you want to push a new URL when the user clicks a button. It has two useful methods:

push - This adds a new URL to the end of the history stack. That means that clicking the back button will take the browser to the previous URL. Note that pushing the same URL multiple times in a row will have no effect; the URL will still only show up on the stack once. In development mode, pushing the same URL twice in a row will generate a console warning. This warning is disabled in production mode.
replace - This replaces the current URL on the history stack, so the back button won't return you to the current URL. For example:
import { useHistory } from 'react-router-dom';

export default function Example() {
  // history object is returned from useHistory hook and has various methods
  const history = useHistory();
  
  // Pushing a new URL (and adding to the end of history stack):
  const handleClick = () => history.push('/some/url');
  
  // Replacing the current URL (won't be tracked in history stack):
  const redirect = () => history.replace('/some/other/url');
  // ...
}
Note: You should try to use <Redirect>, <Link>, or <NavLink> before using useHistory to redirect your user. Don't try to force the code to use <Redirect>, <Link>, or <NavLink>, however, if it makes your code less readable. useHistory is sometimes the best choice to avoid unnecessary complexity.

What you learned
In this article, you learned how to create navigation links for your route paths using the <Link> and <NavLink> components. You also learned how to redirect users using the <Redirect> component and update a browser's URL programmatically (or when triggered by user input) by using a history object returned from React Router's useHistory hook.

See the docs on Link, docs on NavLink, docs on Redirect, and docs on useHistory to learn more about what you can do with them.