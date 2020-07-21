import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function PersonForm(props) {
  const {onSubmit} = props;
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

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
