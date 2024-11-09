import { useState, useEffect } from "react";
import axios from "axios";

const useTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tag/tags"); // URL ของ API สำหรับดึง tags
        setTags(response.data);
      } catch (err) {
        setError("Failed to fetch tags");
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return { tags, loading, error };
};

export default useTags;
