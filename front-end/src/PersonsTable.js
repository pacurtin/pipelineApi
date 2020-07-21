import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";

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
  const {persons, openEditModal, loading} = props;


  return (
    <TableContainer component={Paper}>
      {
        loading &&
        <p>Loading...</p>
      }
      {
        !loading &&
        persons &&
        persons.length<1 &&
        <p>No persons found. Wait a moment and then try refreshing the page or adding a new person.</p>
      }
      {
        !loading &&
        persons &&
        Array.isArray(persons) &&
        persons.length>0 &&
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.email[0].value}</TableCell>
                <TableCell>{person.phone[0].value}</TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={
                      ()=> openEditModal(
                        person.id,
                        person.name,
                        person.email[0].value,
                        person.phone[0].value
                      )
                    }
                    >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    </TableContainer>
  );
}

export default PersonsTable;
