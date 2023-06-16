'use client';

import { PlusIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { db } from '../../../firebase';

function NewChat() {
  console.log(process.env.GOOGLE_ID);
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
    const doc = await addDoc(collection(db, 'users', session?.user?.email, 'chats'), {
      messages: [],
      userId: session?.user?.email,
      createdAt: serverTimestamp(),
    });
    console.log(doc);
    router.push(`/chat/${doc.id}`);
  };

  return (
    <div onClick={() => createNewChat()} className='button'>
      <p className='text-sm'>New Chat</p>
      <PlusIcon className='h-4 w-4' />
    </div>
  );
}

export default NewChat;
