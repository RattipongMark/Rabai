import React, { useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import useComments from '../../hooks/discussBoard/useComment'; // นำเข้า hook ที่สร้าง

const Comment = ({ closeModal, activePost }) => {
    const [newComment, setNewComment] = useState('');
    const storedData = JSON.parse(localStorage.getItem('user_data'));
    const timeAgo = formatDistanceToNow(parseISO(activePost.update_at), { addSuffix: true });
    const { comments, loading, error, createComment } = useComments(activePost._id);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value); // อัปเดตค่าคอมเมนต์ที่กรอก
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim()) { // ตรวจสอบว่าคอมเมนต์ไม่ว่าง
            await createComment(storedData.user._id, newComment); // ส่งคอมเมนต์ใหม่
            setNewComment(''); // เคลียร์ช่อง input หลังจากส่ง
        }
    };

    return (
        <div className="flex flex-col w-full h-full gap-4 pt-8 text-white">
            <div className="flex items-center h-fit">
                <img src={activePost.userId.profile} className="size-8 rounded-full mr-8 lg:size-12" />
                <div className='flex flex-col gap-1'>
                    <div className="font-semibold text-sm lg:text-lg">{activePost.userId.name}</div>
                    <div className="text-gray-400 text-xs ">{timeAgo}</div>
                </div>
                <div className="ml-auto">
                    <span
                        className="text-xs font-light text-white px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: activePost.tagId.tagColor}}
                    >
                        {activePost.tagId.tagName}
                    </span>
                </div>
            </div>

            <article className="text-sm leading-relaxed w-full break-words whitespace-pre-wrap max-h-1/2 h-fit min-h-32  overflow-y-auto scroller mt-4 lg:text-lg">
                {activePost?.description || "No description"}
            </article>

            <div className="opacity-20 h-4 "><hr /></div>

            {/* ส่วนแสดง comments */}
            <div className="comments-section space-y-4 max-h-1/2 h-full overflow-y-auto scroller">
                {loading ? (
                    <p>Loading comments...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : Array.isArray(comments) && comments.length > 0 ? (
                    comments.map((comment, index) => (
                        // <div key={index} className="comment-item bg-gray-700 p-3 rounded">
                        //     <p className="text-sm font-medium text-white">{comment.userId.name}</p>
                        //     <p className="text-sm text-gray-400">{comment.content}</p>
                        // </div>

                        <div className="chat chat-start">
                        <div className="chat-image avatar">
                          <div className="w-8 rounded-full lg:w-12">
                            <img
                              src={comment.userId.profile}/>
                            
                          </div>
                        </div>
                        <div className="chat-header">
                          {comment.userId.name}
                        </div>
                        <div className="ml-2 mt-2 chat-bubble bg-white/10">{comment.content}</div>
                      </div>

                    ))
                ) : (
                    <p className="text-gray-500">No comments yet.</p>
                )}
            </div>


            {/* ฟอร์มสำหรับเพิ่มคอมเมนต์ */}
            <div className="w-full flex items-center justify-between gap-4 bg-[#3D4362] px-4 py-2 rounded-xl">
                <div className="flex justify-center items-center w-fit ">
                    <div className="flex justify-center items-start pl-1 pt-1 w-8 h-8 bg-black/20 rounded-full overflow-hidden cursor-pointer ">
                        <img
                            alt="Avatar"
                            src={storedData.user.profile}
                            className="w-[80px] object-cover"
                        />
                    </div>
                </div>

                {/* input field สำหรับคอมเมนต์ */}
                <input
                    type="text"
                    placeholder="Type here"
                    className="input w-full bg-white/0 text-white"
                    value={newComment} // เชื่อมต่อค่า input กับ newComment
                    onChange={handleCommentChange} // อัปเดต newComment เมื่อมีการพิมพ์
                />

                <div className="w-8 hover:opacity-20 px-2 flex justify-center">
                    <button className="w-16" onClick={handleCommentSubmit}>
                        <img src="/paper-airplane.svg" alt="Send" className="w-full" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Comment;
