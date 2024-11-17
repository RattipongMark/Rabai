const User = require('../models/userModel'); // import the user model

const getProfilebyID = async (req,res) =>{
    try {
        const {id} = req.body;
        const profile = await User.findById(id);
        
        res.status(200).json(profile)
    } catch (error) {
        res.status(500).json({ message: 'Error getting profile information', error: err.message });
    }
}

const updateProfile = async (req,res)=> {
    try {
        const {id, name, email, role } = req.body;
        const changes = await User.findByIdAndUpdate(
            id,
            { name, email, role },
            { new: true, runValidators: true }
        )
        res.status(200).json({
            status: 'success',
            message: 'Profile updated successfully',
            updatedUser: changes
        })
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: err.message });

    }
}

module.exports = {getProfilebyID,updateProfile};