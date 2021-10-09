import {Route, Switch} from 'react-router'
import Navbar from './components/common/Navbar'
import AuthProvider from './providers/AuthProvider'
import AppRoute from './components/common/AppRoute'
import Error404 from './components/pages/errors/Error404'

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Switch>
        {/* <AppRoute restrictedTo="guest" exact path="/login" component={Login} />
        <AppRoute
          restrictedTo="guest"
          exact
          path="/signup"
          component={Signup}
        /> */}

        {/* <AppRoute
          restrictedTo="authenticated"
          exact
          path="/"
          component={Home}
        /> */}

        {/* <AppRoute restrictedTo="admin" exact path="/admin" component={Admin} /> */}

        <Route path="*" component={Error404} />
      </Switch>
    </AuthProvider>
  )
}

export default App
