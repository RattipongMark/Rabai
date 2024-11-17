const Board = require('../../models/discussBoard/boardModel');
const Comment = require('../../models/discussBoard/commentModel'); 
const NotiBoard = require('../../models/discussBoard/notiBoardModel');
const User = require('../../models/userModel');
const sendNotification = require('../../index');

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();

        if (comments.length === 0) {
            return res.status(404).json({ message: 'No comments found' });
        }

        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching comments' });
    }
};

exports.getCommentByBoardId = async (req, res) => {
    try {
        const { boardId } = req.params; // รับ boardId จากพารามิเตอร์

        // ค้นหาความคิดเห็นที่ตรงกับ boardId ที่ระบุ
        const comments = await Comment.find({ boardId }).populate('userId') // populate userId เพื่อดึงข้อมูล username ของผู้ใช้

        if (comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this board' });
        }

        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching comments by boardId' });
    }
};


exports.createComment = async (req, res) => {
    try {
        const { userId, boardId, content } = req.body;

        const newComment = new Comment({
            userId,
            boardId,
            content,
        });

        const savedComment = await newComment.save();

        const board = await Board.findById(boardId);
        const boardOwnerId = board.userId;

        if(boardOwnerId.toString() !== userId){
            await NotiBoard.create({
                userId: boardOwnerId,
                boardId,
                commentId: savedComment._id,
            });
        }


        res.status(201).json(savedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating comment' });
    }
};


exports.deleteComment = async (req, res) => {
    try {
        const { CommentId } = req.params;

        const deletedComment = await Comment.findByIdAndDelete(CommentId);

        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully', deletedComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting comment' });
    }
};