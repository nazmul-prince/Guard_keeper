import React, { useState, useEffect, useContext } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions } from '@material-ui/core';

const GuardForm = props => {
    const{ guard, handleGuardSubmit, handleClose } = props;
    const[currentGuard, setCurrentGuard] = useState({
        name:'',
        address:'',
        alt_address:'',
        phone_no:'',
        alt_phone_no:''
    });

    useEffect(() => {
        setCurrentGuard(guard || currentGuard);
    }, []);

    const{ name, address, alt_address, phone_no, alt_phone_no } = currentGuard;

    const valueChange = async e => {
        await setCurrentGuard({ ...currentGuard, [e.target.id]: e.target.value });
    }

    const onDialogClose = () => {
        handleClose();
    }

    const submitGuardInfoChange = () => {
        console.log("handleGuardSubmit: " + currentGuard.name);
        handleGuardSubmit(currentGuard);
    }
    return (
        <div>
            
            <form >
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    value={name}
                    fullWidth
                    InputLabelProps={{
                    shrink: true,
                    }}
                    variant="outlined"
                    margin="normal"
                    onChange={valueChange}
                >
                </TextField>
                <TextField
                    autoFocus
                    margin="dense"
                    id="address"
                    label="Address"
                    value={address}
                    fullWidth
                    InputLabelProps={{
                    shrink: true,
                    }}
                    variant="outlined"
                    margin="normal"
                    onChange={valueChange}
                >
                </TextField>
                <TextField
                    autoFocus
                    margin="dense"
                    id="alt_address"
                    label="Alt Address"
                    value={alt_address}
                    fullWidth
                    InputLabelProps={{
                    shrink: true,
                    }}
                    variant="outlined"
                    margin="normal"
                    onChange={valueChange}
                >
                </TextField>
                <TextField
                    autoFocus
                    margin="dense"
                    id="phone_no"
                    label="Phone"
                    value={phone_no}
                    fullWidth
                    InputLabelProps={{
                    shrink: true,
                    }}
                    variant="outlined"
                    margin="normal"
                    onChange={valueChange}
                >
                </TextField>
                <TextField
                    autoFocus
                    margin="dense"
                    id="alt_phone_no"
                    label="Alt Phone"
                    value={alt_phone_no}
                    fullWidth
                    InputLabelProps={{
                    shrink: true,
                    }}
                    variant="outlined"
                    margin="normal"
                    onChange={valueChange}
                >
                </TextField>
                <Button onClick={onDialogClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={submitGuardInfoChange} color="primary">
                    Save
                </Button>
            </form>
        </div>
    )
};
export default GuardForm;
