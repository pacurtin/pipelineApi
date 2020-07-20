import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    overflowX: 'hide',
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 4
  }
});

function PersonsTable(props) {
  const classes = useStyles();
  const {persons} = props;


  return (
    <TableContainer component={Paper}>
      {
        persons &&
        persons.length<1 &&
        <p>No persons found. Try refreshing the page or adding a new person.</p>
      }
      {
        persons &&
        Array.isArray(persons) &&
        persons.length>0 &&
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.email[0].value}</TableCell>
                <TableCell>{person.phone[0].value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    </TableContainer>
  );
}

export default PersonsTable;
