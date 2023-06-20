'use client';

import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { db } from '../../../firebase';

function Chat({ chatId }) {
  const { data: session } = useSession();

  const messagesRef = session ? collection(db, 'users', session.user.email, 'chats', chatId, 'messages') : null;

  const messagesQuery = messagesRef ? query(messagesRef, orderBy('createdAt', 'asc')) : null;

  const [messages] = useCollection(messagesQuery);

  return (
    <div className='overflow-y-auto relative'>
      {messages &&
        messages.docs.map((doc) => {
          const message = doc.data();
          return (
            <div
              key={doc.id}
              className='flex w-full items-center justify-center py-12 bg-[#ffffff04] even:bg-[#ffffff00]'
            >
              <div className='w-[40%] flex gap-5'>
                <img src={message.user.avatar} alt='user avatar' className='rounded-full h-7' />
                <div>
                  <p className=''>{message.text}</p>
                  <span className='text-[11px] uppercase tracking-wider opacity-30 font-light mt-2 flex'>
                    {message.createdAt?.toDate().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Chat;
