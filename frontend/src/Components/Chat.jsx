import React, { useState } from 'react'
import { BASE_URL } from '../../utils/Constants'
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatContainer from './ChatContainer';
import RightSidebar from './RightSidebar';

const Chat = () => {
    // const [selectedUser, setSelectedUser] = useState(true);

    // const fetchData = async () => {
    //     const data = await fetch(BASE_URL + '/api/chat');
    //     const json = await data.json();
    //     console.log(json)
    // }

    // useEffect(() => {
    //     fetchData();
    // }, []);

    return (
        <div className='h-screen w-full flex justify-center items-center'>
            {/* <div className = { `w-2/3 h-160 backdrop-blur-lg border border-gray-200 rounded-xl grid ${ selectedUser ? 'grid-cols-[1fr_2fr_1fr]' : 'grid-cols-2' }` }>
                <Sidebar />
                <ChatContainer />
                <RightSidebar />
            </div> */}
        </div>
    )
}

export default Chat
