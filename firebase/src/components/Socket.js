import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { io } from 'socket.io-client';

function Socket() {
    const { currentUser } = useContext(AuthContext);
    const [socket, setSocket] = useState(null);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [data, setData] = useState([]);
    const [receiver, setReceiver] = useState('');

    useEffect(() => {
        if (currentUser && currentUser.uid) {
            const newSocket = io('http://localhost:4001', { query: { id: currentUser.email } });
            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('Connected to socket server');
            });

            newSocket.on('disconnect', () => {
                console.log('Disconnected from socket server');
            });

            newSocket.on('online-users', (users) => {
                setUsers(users);
                console.log(`Online users: ${users}`);
            });

            newSocket.on('message', (message) => {
                setData(prev => [...prev, message]);
            });

            return () => {
                newSocket.disconnect();
            };
        }
    }, [currentUser]);

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        if (socket && receiver && message) {
            const messageData = {
                senderId: currentUser.email,
                receiverId: receiver,
                message
            };
            socket.emit('message', messageData);
            setData(prev => [...prev, messageData]);
            setMessage('');
        }
    };

    const getOnlineUsers = () => {
        if (socket) {
            socket.emit('online-users');
        }
    };

    return (
        <div>
            <button onClick={getOnlineUsers}>Get Users</button>
            <div>
                <h2>Online Users</h2>
                {users && users.length > 0 ? users.map((user, index) => (
                    <div key={index} style={{ display: 'flex', margin: '5px', border: '2px solid gold', width: '400px', height: '50px', position: 'relative' }} onClick={() => { setReceiver(user); }}>
                        {user} 
                        <div style={{ width: '12px', height: '12px', backgroundColor: 'green', borderRadius: '50%', position: 'absolute', left: '396px', top: '-1px' }}></div>
                    </div>
                )) : <h1>No Active Users</h1>}
            </div>
            <div>
                <input type="text" placeholder="Type a message..." value={message} onChange={handleChange} />
                <button onClick={sendMessage}>Send</button>
            </div>
            <div>
                <h1>Messages</h1>
                {data && data.length > 0 ? data.map((msg, index) => (
                    <div key={index}>{msg.senderId}: {msg.message}</div>
                )) : <h1>No Messages</h1>}
            </div>
        </div>
    );
}

export default Socket;
