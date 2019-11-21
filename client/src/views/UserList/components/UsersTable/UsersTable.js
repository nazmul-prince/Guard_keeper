import React, { useState, useContext, useEffect, Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import GuardContext from '../../../../context/guard_context/guardContext';
import Spinner from '../../../../layouts/Spinner';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  IconButton
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { getInitials } from 'helpers';
import GuardEditor from '../UsersToolbar/GuardEditor';
import GuardDeletionDialog from '../UsersToolbar/GuardDeletionDialog';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const UsersTable = props => {
  const { className, users, ...rest } = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const { guards, getAllGuards, deleteGuard, loading } = useContext(GuardContext);

  useEffect(() => {
    getAllGuards();
    //eslint-disable-next-line
  }, []);

  const handleSelectAll = event => {
    // const { users } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = guards.map(guard => guard._id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const editGuardInfo = (guard) => {
    alert(guard.name)
  }

  return (
    <Fragment>
      {
        console.log("guards: " + guards + "\nrendering.... " + loading + " " + (guards != null) + " " + (guards.length > 0))
      }
    { guards !== null && guards.length > 0 && !loading ? 
      (
        <Card
        {...rest}
        className={clsx(classes.root, className)}
        >
          <CardContent className={classes.content}>
            <PerfectScrollbar>
              <div className={classes.inner}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedUsers.length === users.length}
                          color="primary"
                          indeterminate={
                            selectedUsers.length > 0 &&
                            selectedUsers.length < users.length
                          }
                          onChange={handleSelectAll}
                        />
                      </TableCell>
                      <TableCell>Edit</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Alt Address</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Alt Phone</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {guards.slice(0, rowsPerPage).map(guard => (
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={guard._id}
                        selected={selectedUsers.indexOf(guard._id) !== -1}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedUsers.indexOf(guard._id) !== -1}
                            color="primary"
                            onChange={event => handleSelectOne(event, guard._id)}
                            value="true"
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <GuardEditor guard={guard} isEditMode={true}/>
                            <GuardDeletionDialog id={guard._id} deleteGuard={deleteGuard}/>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={classes.nameContainer}>
                            <Avatar
                              className={classes.avatar}
                              src={guard.avatarUrl}
                            >
                              {getInitials(guard.name)}
                            </Avatar>
                            <Typography variant="body1">{guard.name}</Typography>
                          </div>
                        </TableCell>
                        <TableCell>{guard.address}</TableCell>
                        <TableCell>{guard.alt_address}</TableCell>
                        <TableCell>{guard.phone_no}</TableCell>
                        <TableCell>{guard.alt_phone_no}</TableCell>
                        {/* <TableCell>
                          {moment(user.createdAt).format('DD/MM/YYYY')}
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </PerfectScrollbar>
          </CardContent>
          <CardActions className={classes.actions}>
            <TablePagination
              component="div"
              count={users.length}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </CardActions>
        </Card>
      )
      : <Spinner />
    }
    </Fragment>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
