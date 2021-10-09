import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import {LockOutlined} from '@material-ui/icons'
import {useFormik} from 'formik'
import {useState} from 'react'
import * as yup from 'yup'
import {Link as RouterLink} from 'react-router-dom'
import {Link} from '@material-ui/core'

import {login, me} from '../../../dataAccess/auth'
import {useUpdateAuthenticatedUser} from '../../../providers/AuthProvider'
import CustomAlert from '../../common/Alert'

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Your email is required'),
  password: yup.string().required('This field cannot be empty').min(6),
})

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Login() {
  const classes = useStyles()

  const updateAuthenticatedUser = useUpdateAuthenticatedUser()

  const [openAlert, setOpenAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  const handleOpenAlert = (severity, message) => {
    setAlertSeverity(severity)
    setAlertMessage(message)
    setOpenAlert(true)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      login(values).then(({success, token, error}) => {
        if (success) {
          localStorage.setItem('authToken', token)
          me().then(({success, user}) => {
            if (success) {
              handleOpenAlert('success', 'Login Successful')
              updateAuthenticatedUser(user)
            } else {
              handleOpenAlert('error', 'Authentication Failed')
            }
          })
        } else {
          handleOpenAlert('error', error)
        }
      })
    },
  })

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.errors.email}
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.errors.passowrd}
                variant="outlined"
                fullWidth
                id="password"
                type="password"
                label="Password"
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
      <CustomAlert
        open={openAlert}
        severity={alertSeverity}
        message={alertMessage}
        handleClose={() => setOpenAlert(false)}
      />
    </Container>
  )
}
