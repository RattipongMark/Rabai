import { useState, useEffect } from 'react';
import axios from 'axios';

const useActivies = () => {
    const [activities, setActivities] = useState([]);  
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await axios.get('https://rabai-server.onrender.com/api/activity/');  
                console.log("activ",response.data);  
                setActivities(response.data.reverse());  
                setLoading(false);  
            } catch (err) {
                setError('Error fetching boards'); 
                setLoading(false);
            }
        };

        fetchBoards();  
    }, []); 

    return { activities, loading, error };  
};

export default useActivies;