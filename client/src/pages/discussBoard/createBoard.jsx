import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Select from "react-select";
import useTags from "../../hooks/useTags";
import useCreatePost from "../../hooks/discussBoard/useCreat";
import { useNavigate } from "react-router-dom";

const CreateBoard = ({ closeModal }) => {
    const storedData = JSON.parse(localStorage.getItem("user_data"));
    const { tags, loading: tagsLoading, error: tagsError } = useTags();
    const { createPost, loading, error, success } = useCreatePost();
    const [selectedTag, setSelectedTag] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleTagChange = (selectedOption) => {
        setSelectedTag(selectedOption);
    };

    const tagOptions = tags.map((tag) => ({
        value: tag._id,
        label: tag.tagName,
    }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (description && selectedTag) {
            console.log("aaa");
            const result = await createPost(
                storedData.user._id, // userId
                description,         // description
                selectedTag.value    // tagId
            );

            if (result) {
                console.log("Post created successfully:", result);
                closeModal();
            }
        }
    };

    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          backgroundColor: "#404664", // พื้นหลังของ Select
          color: "white",
          borderColor: "#404664", // สีขอบ
        }),
        menu: (provided) => ({
          ...provided,
          backgroundColor: "#2d2f45", // พื้นหลังของเมนู dropdown
          color: "white",
        }),
        option: (provided, state) => ({
          ...provided,
        //   color: "white",
          color: state.isSelected ? "#FB923C" : "white",
          backgroundColor: state.isSelected
            ? "#FB923C" // สีพื้นหลังเมื่อเลือก
            : state.isFocused
            ? "#3e4a63" // สีพื้นหลังเมื่อ hover ตัวเลือก
            : "transparent", // สีพื้นหลังปกติ
          color: state.isSelected ? "white" : "white", // สีข้อความ
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#3e4a63", // สีพื้นหลังเมื่อ hover ตัวเลือก
          },
        }),

      };

    return (
        <div className="flex flex-col w-full h-full gap-4">
            <div className="flex justify-center text-xl font-bold text-orange-500">Create Board</div>
            <div className="flex pt-4 gap-6 items-center">
                <img
                    src={storedData.user.profile}
                    className="size-8 rounded-full lg:size-12"
                />
                <div className="text-white">{storedData.user.name}</div>
            </div>
            <div className="h-full w-full text-white pt-4">
                <textarea
                    className="bg-white/0 w-full h-full max-h-full p-2 focus:outline-none"
                    placeholder="What’s on your mind"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div className="text-white">
                <label htmlFor="tags" className="px-1">
                    Choose a Tag
                </label>
                {tagsLoading ? (
                    <span>Loading tags...</span>
                ) : (
                    <Select
                        options={tagOptions}
                        value={selectedTag}
                        onChange={handleTagChange}
                        placeholder="Pick your tag"
                        isClearable={true}
                        styles={customStyles} 
                        className="text-white pt-2"
                    />
                )}
            </div>
            <button
                onClick={handleSubmit}
                className="bg-orange-500 p-2 w-full rounded-md text-white font-bold"
                disabled={loading}
            >
                {loading ? "Creating Post..." : "Create Board"}
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {success && <div className="text-green-500 mt-2">Post created successfully!</div>}
        </div>
    );
};

export default CreateBoard;