import { useState, useEffect } from 'react';
import axios from 'axios';

const useBoard = () => {
    const [boards, setBoards] = useState([]);  
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await axios.get('https://rabai-server.onrender.com/api/board');  
                console.log(response.data);  
                setBoards(response.data.reverse());  
                setLoading(false);  
            } catch (err) {
                setError('Error fetching boards'); 
                setLoading(false);
            }
        };

        fetchBoards();  
    }, []); 

    return { boards, loading, error };  
};

export default useBoard;