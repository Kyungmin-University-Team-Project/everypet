import React, { useEffect, useState } from 'react';
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";

const Chat = () => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        // 웹소켓 연결 설정
        const socket = new SockJS('/ws'); // 서버의 웹소켓 엔드포인트
        const client = Stomp.over(socket);

        client.connect({}, (frame :any) => {
            console.log('Connected: ' + frame);

            // 메시지 구독 (모든 사용자에게 브로드캐스트되는 메시지)
            client.subscribe('/topic/messages', (message) => {
                showMessage(JSON.parse(message.body));
            });
        });


        // client가 존재 할시
        if (!client){
            setStompClient(client);
        }

        // 컴포넌트 언마운트 시 웹소켓 연결 해제
        return () => {
            // if (stompClient !== null) stompClient.disconnect();
        };
    }, []);

    const showMessage = (message : any) => {
        // setMessages((prevMessages : any) => [...prevMessages, message]);
    };

    const sendMessage = () => {
        // 서버로 메시지 전송
        if (stompClient && inputMessage) {
            // stompClient.send('/app/application', {}, JSON.stringify({ text: inputMessage }));
            // setInputMessage('');
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Send a message"
                />
                <button onClick={sendMessage}>Send</button>
            </div>

            <div>
                <h2>Messages:</h2>
                {/*{messages.map((msg, index) => (*/}
                {/*    <p key={index}>{msg.text}</p>*/}
                {/*))}*/}
            </div>
        </div>
    );
};

export default Chat;
