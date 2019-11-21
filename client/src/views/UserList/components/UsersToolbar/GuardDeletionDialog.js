import React, { Fragment } from 'react';
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const GuardDeletionDialog = props => {
    const{ id, deleteGuard } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    const handleGuardDeletion = () => {
        deleteGuard(id);
        setOpen(false);
    }

    return (
        <Fragment>
            <IconButton onClick={handleClickOpen}>
                <DeleteIcon color="action"/>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                        Are you sure, you want to delete this?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    No
                </Button>
                <Button onClick={handleGuardDeletion} color="primary" autoFocus>
                    Yes
                </Button>
            </DialogActions>
            </Dialog>
        </Fragment>
    )
};

export default GuardDeletionDialog;
