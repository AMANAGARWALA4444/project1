import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { Backend } from '../.config';

function handleInputErrors(userName, password)
{
    if(!userName || !password)
    {
        toast.error('Please fill in all the fields');
        return false;
    }
    return true;
}

const useLogin = () => 
{
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async(userName, password) =>
    {
        try
        {
            const success = handleInputErrors(userName, password);

            if(!success)
            {
                return;
            }

            setLoading(true);

            const res = await fetch(`${Backend}/api/auth/login`,
            {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({userName, password}),
            })

            const data = await res.json();

            if(data.error)
            {
                throw new Error(data.error);
            }

            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data)
        }
        catch(error)
        {
            toast.error(error.message);
        }
        finally
        {
            setLoading(false);
        }
    }
    return {loading, login};
}

export default useLogin