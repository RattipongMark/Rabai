import { useState } from 'react';
import axios from 'axios';

const useCreatePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const createPost = async (userId, description, tagId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post('http://localhost:3000/api/board/create', {  // แก้ไข URL ตามที่ API ของคุณใช้งาน
                userId,
                description,
                tagId,
            });

            if (response.status === 201) {
                setSuccess(true);  // เมื่อสร้างโพสต์สำเร็จ
                return response.data;  // ส่งคืนข้อมูลโพสต์ที่ถูกสร้าง
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Failed to create post');
        } finally {
            setLoading(false);  // เมื่อเสร็จสิ้นการดำเนินการ
        }
    };

    return { createPost, loading, error, success };
};

export default useCreatePost;
