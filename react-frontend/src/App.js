import React from 'react';
import { Login } from './Login/Login'
import { UserShow } from './UserShow/UserShow'
import { BrowserRouter, Route } from 'react-router-dom'
import { StripeProvider } from 'react-stripe-elements'
class App extends React.Component {

  render() {
    return (
      <StripeProvider apiKey='pk_test_kQmNCX01JOkO75Vkrm66CyUv00CDtR3bfr'>
        <BrowserRouter>
          <Route exact path="/" component={Login} />
          <Route exact path="/users/:id" component={UserShow} />
        </BrowserRouter>
      </StripeProvider>
    )
  }
}

export default App;
