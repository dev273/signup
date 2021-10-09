import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import {LockOutlined} from '@material-ui/icons'
import {useFormik} from 'formik'
import {useState} from 'react'
import * as yup from 'yup'
import {Link as RouterLink} from 'react-router-dom'
import {me, signup} from '../../../dataAccess/auth'
import {useUpdateAuthenticatedUser} from '../../../providers/AuthProvider'
import CustomAlert from '../../common/Alert'

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

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Please give us a valid email')
    .required('Your email is required'),
  name: yup.string().required('Please enter your name').min(3),
  password: yup.string().required('This field cannot be empty').min(6),
})

export default function Signup() {
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
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      signup(values).then(({success, token, error}) => {
        if (success) {
          localStorage.setItem('authToken', token)

          me().then(({success, user}) => {
            if (success) {
              handleOpenAlert('success', 'Signup successful')
              updateAuthenticatedUser(user)
            } else {
              handleOpenAlert('error', 'Authentication failed')
            }
          })
        } else {
          console.log(error)
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
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && formik.errors.name}
                helperText={formik.errors.name}
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
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
                label="Email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.errors.password}
                variant="outlined"
                fullWidth
                id="password"
                label="Password"
                type="password"
              />
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
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
