const Board = require('../../models/discussBoard/boardModel'); 

exports.getAllBoards = async (req, res) => {
    try {
        const boards = await Board.find()
            .populate('userId', 'name profile')
            .populate('tagId', 'tagName tagColor');

        if (boards.length === 0) {
            return res.status(404).json({ message: 'No boards found' });
        }

        res.status(200).json(boards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching boards' });
    }
};


exports.createBoard = async (req, res) => {
    try {
        const { userId, description, tagId } = req.body;

        const newBoard = new Board({
            userId,
            description,
            tagId,
        });

        const savedBoard = await newBoard.save();
        res.status(201).json(savedBoard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating board' });
    }
};


exports.deleteBoard = async (req, res) => {
    try {
        const { BoardId } = req.params;
        
        const deletedBoard = await Board.findByIdAndDelete(BoardId);
        
        if (!deletedBoard) {
            return res.status(404).json({ message: 'Board not found' });
        }

        res.status(200).json({ message: 'Board deleted successfully', deletedBoard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting board' });
    }
};