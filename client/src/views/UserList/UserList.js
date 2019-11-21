import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import mockData from './data';
import GuardState from '../../context/guard_context/GuardState';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <GuardState>
      <div className={classes.root}>
        <UsersToolbar />
        <div className={classes.content}>
          <UsersTable users={users} />
        </div>
      </div>
    </GuardState>
  );
};

export default UserList;
