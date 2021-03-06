import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const AUTH_USER = gql`
  mutation authUser($input: AuthInput) {
    authUser(input: $input) {
      token
    }
  }
`;

const useStyles = makeStyles((theme) => ({
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const classes = useStyles();
  const router = useRouter();
  const [msg, setMsg] = useState(null);
  const [authUser] = useMutation(AUTH_USER);
  const showMsg = () => {
    return <Alert severity='error'>{msg}</Alert>;
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El name no puede estar vacio'),
      password: Yup.string().required('El password el obligatorio'),
    }),
    onSubmit: async (values) => {
      const { name, password } = values;
      try {
        const { data } = await authUser({
          variables: {
            input: {
              name,
              password,
            },
          },
        });
        setMsg('Autenticando');

        setTimeout(() => {
          const { token } = data.authUser;
          sessionStorage.setItem('token', token);
        }, 1000);
        // delete message
        setTimeout(() => {
          setMsg(null);
          window.location.pathname = '/';
        }, 2000);
      } catch (error) {
        // redirect to dashboard
        setMsg(error.message.replace('GraphQL error:', ''));
        setTimeout(() => {
          setMsg(null);
        }, 3000);
      }
    },
  });

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Iniciar Sesion
        </Typography>
        {msg && showMsg()}
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='name'
            label='Username'
            name='name'
            autoComplete='name'
            autoFocus
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Iniciar Sesion
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Login;
