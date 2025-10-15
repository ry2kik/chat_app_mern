import React from 'react'
import { BASE_URL } from '../../utils/Constants'
import { useEffect } from 'react';

const Chat = () => {
    const fetchData = async () => {
        const data = await fetch(BASE_URL + '/api/chat');
        const json = await data.json();
        console.log(json)
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>

        </div>
    )
}

export default Chat
