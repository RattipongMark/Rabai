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

const updateProfile = async (req, res) => {
    try {
        const { id, name, email, profile } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, profile },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("Updated user successfully:", updatedUser);

        res.status(200).json({
            status: 'success',
            message: 'Profile updated successfully',
            updatedUser
        });
    } catch (error) {
        console.error("Error in updateProfile:", error.message); // Debug the error
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};



module.exports = {getProfilebyID,updateProfile};