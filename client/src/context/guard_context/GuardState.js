import React , { useReducer } from 'react';
import axios from 'axios';
import GuardContext from './guardContext';
import guardReducer from './guardReducer';
import {
    GET_ALL_GUARDS,
    ADD_GUARD,
    UPDATE_GUARD,
    DELETE_GUARD,
    GUARD_ERROR
} from '../types';


const GuardState = props => {
    const initialState = {
        guards: [],
        error: null,
        loading: true
    };

    const [state, dispatch] = useReducer(guardReducer, initialState);

    //get all guards
    const getAllGuards = async () => {
        try {
            const res = await axios('/private/guards');
            console.log("payload");
            console.log(res.data);
            dispatch({
                type: GET_ALL_GUARDS,
                payload: res.data
            });
        } catch (err) {
            console.log(err);
            console.log(err);
            dispatch({
                type: GUARD_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Add guard
    const addGuard = async guard => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/private/guards', guard, config);
            dispatch({
                type: ADD_GUARD, 
                payload: res.data 
            });
        } catch (error) {
            dispatch({
                type: GUARD_ERROR,
                payload: error.response.msg
            });
        }
    };

    // Delete guard
    const deleteGuard = async _id => {

        try {
            const res = await axios.delete(`/private/guards/${_id}`);
            dispatch({
                type: DELETE_GUARD, 
                payload: _id 
            });
        } catch (error) {
            dispatch({
                type: GUARD_ERROR,
                payload: error.response.msg
            });
        }
    };

    // Update guard
    const updateGuard = async guard => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log("updateGuard currentGuard " + guard.name);

        try {
            const res = await axios.put(`/private/guards/${guard._id}`, guard, config);
            
            dispatch({
                type: UPDATE_GUARD, 
                payload: res.data 
            });
        } catch (error) {
            dispatch({
                type: GUARD_ERROR,
                payload: error.response
            });
        }
    };

    return (
        <GuardContext.Provider 
            value={{
                guards: state.guards,
                error: state.error,
                loading: state.loading,
                getAllGuards,
                addGuard,
                updateGuard,
                deleteGuard
            }}
        >
            { props.children }
        </GuardContext.Provider>
    );
};

export default GuardState;

