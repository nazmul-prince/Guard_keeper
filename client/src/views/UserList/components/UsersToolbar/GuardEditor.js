import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import GuardContext from '../../../../context/guard_context/guardContext';
import GuardForm from './GuardForm';

const GuardEditor = (props) => {

    const{ guard, isEditMode } = props;
    const{ addGuard, updateGuard } = useContext(GuardContext);

    const[open, setOpen] = useState(false);



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const onSubmit = (guard) => {
        console.log("onSubmit currentGuard " + guard.name + " _id: " + guard._id);
        // console.log(currentGuard);
        if(guard._id) {
            //it means updating guard's info
            updateGuard(guard);
        } else {
            //It means adding new guard's info
            addGuard(guard);
        }
        setOpen(false);
    };

    return (
        <Fragment>
                <div>
                    {!isEditMode ?
                        (
                            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                Add Guard
                            </Button>
                        ) :
                        (
                            <IconButton aria-label="Edit" onClick={handleClickOpen}>
                              <EditIcon />
                            </IconButton>
                        )
                    }
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">
                            Add Guard
                        </DialogTitle>
                        <DialogContent>
                            <GuardForm guard={guard} handleGuardSubmit={onSubmit} handleClose={handleClose}/>
                        </DialogContent>
                    </Dialog>
                </div>
        </Fragment>
    )
}

export default GuardEditor;
