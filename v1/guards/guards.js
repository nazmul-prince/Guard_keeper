const express = require('express');
const Guard = require('../../models/guard');

var router = express.Router();

const getAllGuards = async (req, res) => {
    //Here validation will be done (later on)
    try {
        const guards = await Guard.find({}, function(err, guards) {
            res.json(guards);
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
}

const createGuard = async (req, res) => {
    //Here validation will be done (later on)

    const { name, address, phone_no, alt_address, alt_phone_no } = req.body;
    try {
        let guard = await Guard.findOne({ name });

        if(guard) {
            return res.status(400).json({ msg: 'Gurd already exists' });
        }

        guard = new Guard({
            name,
            address,
            phone_no,
            alt_address,
            alt_phone_no
        });

        await guard.save();
        res.send(guard);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Server error' });
    }

};

const updateGuard = async (req, res) => {
    //Here validation will be done (later on)

    const { name, address, phone_no, alt_address, alt_phone_no } = req.body;
    console.log("name: " + name + " address: " + address + " phone_no: " + phone_no + " alt_address: " + alt_address + " alt_phone_no: " + alt_phone_no );
    const guardToSave = {};
    if(name) guardToSave.name = name;
    if(address) guardToSave.address = address;
    if(phone_no) guardToSave.phone_no = phone_no;
    if(alt_address) guardToSave.alt_address = alt_address;
    if(alt_phone_no) guardToSave.alt_phone_no = alt_phone_no;
    console.log(JSON.stringify(guardToSave));

    try {
        let guardToChange = await Guard.findById(req.params.id);

        if(!guardToChange) {
            return res.status(400).json({ msg: 'Gurd not found' });
        }

        guardToChange = await Guard.findByIdAndUpdate (req.params.id,
            {$set: guardToSave},
            {new: true});
        res.send(guardToChange);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Server error' });
    }

};



const deleteGuard = async (req, res) => {
    //Here validation will be done (later on)
    try {
        let guard = await Guard.findById(req.params.id);

        if(!guard) {
            return res.status(400).json({ msg: 'Gurd not found' });
        }

        await Guard.findByIdAndRemove(req.params.id);
        res.send({msg: 'Guard removed'});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Server error' });
    }

};

//@route GET api/guards
//@desc Get all guards' profile
//@access Private
router.get('/', getAllGuards);

//@route POST api/guards
//@desc Add a guard profile
//@access Private
router.post('/', createGuard);


//@route PUT api/guards/:id
//@desc Update a guard's profile
//@access Private
router.put('/:id', updateGuard);

//@route DELETE api/guards/:id
//@desc Delete a guard's profile
//@access Private
router.delete('/:id', deleteGuard);


//initial config
module.exports = router;