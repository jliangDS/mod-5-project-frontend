import React from 'react';
import { Login } from './Login/Login'
import { UserShow } from './UserShow/UserShow'
import { BrowserRouter, Route } from 'react-router-dom'
class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Login } />
        <Route exact path="/users/:id" component={UserShow} />
      </BrowserRouter>
    )
  }
}

export default App;
