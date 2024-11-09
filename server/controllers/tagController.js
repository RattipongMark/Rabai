const Tag = require('../models/tagModel'); // import the Tag model

// Create Tag
const createTag = async (req, res) => {
    try {
        const { tagName } = req.body;
        const tag = new Tag({ tagName });
        console.log(tag)
        // Save the tag to the database
        await tag.save();
        res.status(201).json({ message: 'Tag created successfully', tag });
    } catch (err) {
        res.status(500).json({ message: 'Error creating tag', error: err.message });
    }
};

// Get all Tags
const getTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving tags', error: err.message });
    }
};

module.exports = { createTag, getTags };


// Get Tag by ID
const getTagById = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the URL parameters
        const tag = await Tag.findById(id); // Find the tag by its ID

        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        res.status(200).json(tag); // Send the tag as the response
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving tag', error: err.message });
    }
};

module.exports = { createTag, getTags, getTagById };
