import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { replies } from './assets/replies';

export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Welcome to the chat! Im here to answer random replies from the list.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot',
          avatar: require('./assets/roBot.png'),
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    let newMessage = {
      _id: new Date().valueOf(),
      text: replies[Math.floor(Math.random() * replies.length)],
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Bot',
        avatar: require('./assets/roBot.png'),
      },
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]));
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
        name: 'User',
      }}
    />
  );
}