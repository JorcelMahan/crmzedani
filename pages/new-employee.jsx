import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const NEW_EMPLOYEE = gql`
  mutation addEmployee($input: EmployeeInput) {
    addEmployee(input: $input)
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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function NewEmployee() {
  //router
  const router = useRouter();
  // mutation
  const [addEmployee, { loading, error }] = useMutation(NEW_EMPLOYEE);

  const classes = useStyles();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee({
        variables: {
          input: {
            name,
            lastName,
          },
        },
      });
      setName('');
      setLastName('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Registrar Empleado
        </Typography>
        {loading && 'loading'}
        {error && `${error.message}`}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name='name'
                variant='outlined'
                required
                fullWidth
                id='name'
                label='Nombre'
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Apellido'
                name='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            {/*<Grid item xs={12} sm={6}>*/}
            {/*  <TextField*/}
            {/*    variant="outlined"*/}
            {/*    required*/}
            {/*    fullWidth*/}
            {/*    id="rol"*/}
            {/*    label="Rol"*/}
            {/*    name="rol"*/}
            {/*    autoComplete="lname"*/}
            {/*    value={values.rol}*/}
            {/*    onChange={handleChange}*/}
            {/*  />*/}
            {/*</Grid>*/}
          </Grid>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Guardar
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default NewEmployee;
