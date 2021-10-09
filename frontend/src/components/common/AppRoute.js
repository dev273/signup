import {Route, Redirect} from 'react-router-dom'

import {useAuthenticatedUser} from '../../providers/AuthProvider'

export default function AppRoute({
  component: Component,
  restrictedTo,
  ...otherProps
}) {
  const authenticatedUser = useAuthenticatedUser()

  if (!restrictedTo) {
    return <Route {...otherProps} render={props => <Component {...props} />} />
  }

  if (restrictedTo === 'guest') {
    return (
      <Route
        {...otherProps}
        render={props =>
          !authenticatedUser.role ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    )
  }

  if (restrictedTo === 'authenticated') {
    return (
      <Route
        {...otherProps}
        render={props =>
          ['user', 'admin'].includes(authenticatedUser.role) ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    )
  }

  if (restrictedTo === 'admin') {
    return (
      <Route
        {...otherProps}
        render={props =>
          authenticatedUser.role === 'admin' ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    )
  }
}
