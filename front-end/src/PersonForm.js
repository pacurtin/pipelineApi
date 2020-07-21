import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    '@media (min-width:780px)':{
      flexDirection: 'row',
    },
    '& > *': {
      alignSelf:'center',
      '@media (min-width:780px)':{
        alignSelf:'baseline',
      },
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function PersonForm(props) {
  const {
    onSubmit,
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone
  } = props;
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name,email,phone);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        required
        label="Name"
        helperText="Required"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <TextField
        label="Email"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <TextField
        label="Phone"
        value={phone}
        onChange={event => setPhone(event.target.value)}
      />
      <Button disabled={!name} type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}

export default PersonForm;
