'use client';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { addDoc, serverTimestamp, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { db } from '../../../firebase';

function ChatInput({ chatId }) {
  const [message, setMessage] = useState('');
  const { data: session } = useSession();
  const [textAreaHeight, setTextAreaHeight] = useState('26px');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;

    const input = message.trim();
    setMessage('');

    const messageDoc = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email,
        name: session?.user?.name,
        avatar: session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(collection(db, 'users', session?.user?.email, 'chats', chatId, 'messages'), messageDoc);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Submit the form here
      sendMessage(e);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      setTextAreaHeight('auto');
      setTextAreaHeight(e.target.scrollHeight + 'px');
    }
  };

  return (
    <div className='relative bg-[#141414]'>
      <div className='w-full h-6 bg-gradient-to-t from-[#141414] to-[transparent] absolute -top-6'></div>
      <form
        onSubmit={sendMessage}
        className='m-6 w-90% bg-[#ffffff05]  p-5 space-x-3 flex outline-none rounded-lg text-base pb-4'
      >
        <textarea
          value={message}
          onKeyDown={(e) => handleKeyDown(e)}
          onKeyUp={(e) => handleKeyUp(e)}
          onChange={(e) => setMessage(e.target.value)}
          type='text'
          placeholder='Type your message here....'
          className={`grow bg-transparent resize-y placeholder:opacity-60 min-h-[26px] h-[${textAreaHeight}] max-h-[200px] overflow-y-auto`}
        />
        <button type='submit'>
          <PaperAirplaneIcon className='h-4 w-5 ml-5 -rotate-45' />
        </button>
      </form>
      {/* Model Selection */}
    </div>
  );
}

export default ChatInput;
