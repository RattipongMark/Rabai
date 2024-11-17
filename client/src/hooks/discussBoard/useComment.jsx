import { useState, useEffect } from 'react';
import axios from 'axios';

const useComments = (boardId) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ดึงข้อมูลคอมเมนต์จาก API
    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/api/comments/${boardId}`);
                setComments(response.data);
            } catch (err) {
                if (err.response) {
                    // ใช้ข้อความจาก back-end ถ้ามี
                    setError(err.response.data.message || 'Error fetching comments');
                } else if (err.request) {
                    // ถ้าไม่มีการตอบกลับจาก server
                    setError('No response from server');
                } else {
                    // ถ้าเกิด error อื่นๆ
                    setError('Error fetching comments');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [boardId]); // เมื่อ boardId เปลี่ยน, จะดึงคอมเมนต์ใหม่

    // ฟังก์ชั่นสำหรับสร้างคอมเมนต์ใหม่
    const createComment = async (userId, content) => {
        try {
            const newComment = { userId, boardId, content };
            const response = await axios.post('http://localhost:3000/api/comments/', newComment);
            setComments([...comments, response.data]); // อัปเดตคอมเมนต์ใหม่ลงใน state
        } catch (err) {
            setError('Error creating comment');
        }
    };

    return {
        comments,
        loading,
        error,
        createComment,
    };
};

export default useComments;
