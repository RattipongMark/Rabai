import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userData, setuserData] = useState(null);
    const storedData = JSON.parse(localStorage.getItem('user_data'));

    useEffect(() => {
        if (storedData){
            const { userToken, user } = storedData;
            setToken(userToken);
            setuserData(user);
            
        }
    }, []);

    const login = (newToken, newData) => {
        localStorage.setItem(
            'user_data',
            JSON.stringify({ token: newToken, user: newData }),
        );
        console.log(newData);
        setToken(newToken);
        setuserData(newData);
        window.location.reload();
    };

    const logout = () => {
        localStorage.removeItem('user_data');
        setToken(null);
        setuserData(null);
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ token,login, logout, userData }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
