import { useState, useEffect } from 'react';
import axios from 'axios';

const useActivies = () => {
    const [activites, setActivites] = useState([]);  
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/');  
                console.log("activ",response.data);  
                setActivites(response.data.reverse());  
                setLoading(false);  
            } catch (err) {
                setError('Error fetching boards'); 
                setLoading(false);
            }
        };

        fetchBoards();  
    }, []); 

    return { activites, loading, error };  
};

export default useActivies;