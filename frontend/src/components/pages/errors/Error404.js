import {Box, makeStyles, Typography} from '@material-ui/core'

const useStyles = makeStyles({
  box: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
})

export default function Error404() {
  const classes = useStyles()
  return (
    <Box my={20} className={classes.box}>
      <Typography variant="h1">404</Typography>
      <Typography variant="h6">Page not found</Typography>
    </Box>
  )
}
