import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  makeStyles,
  Toolbar,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import {
  useAuthenticatedUser,
  useUpdateAuthenticatedUser,
} from '../../providers/AuthProvider'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  box: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.appBarSpacer,
}))

export default function Navbar() {
  const classes = useStyles()
  const updateAuthenticatedUser = useUpdateAuthenticatedUser()
  const authenticatedUser = useAuthenticatedUser()

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    updateAuthenticatedUser({})
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Box className={classes.box}>
            <Button
              color="inherit"
              component="Link"
              to="/"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
          </Box>

          {authenticatedUser.role === 'admin' && (
            <Button color="inherit" component="Link" to="/admin">
              Admin Panel
            </Button>
          )}

          {['user', 'admin'].includes(authenticatedUser.role) && (
            <Button color="secondary" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.appBarSpacer}></div>
    </div>
  )
}
