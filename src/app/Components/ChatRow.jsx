'use client';

import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { collection, deleteDoc, doc, orderBy, query, limit } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../../firebase';

function ChatRow({ id }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  const [firstChatMessage] = useCollection(
    query(collection(db, 'users', session?.user?.email, 'chats', id, 'messages'), orderBy('createdAt', 'desc'))
  );

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, 'users', session?.user.email, 'chats', id));
    router.replace('/');
  };
  return (
    <div>
      <Link href={`/chat/${id}`}>
        <div
          className={`p-4 mr-3 py-[17px] bg-[#ffffff05] rounded-lg text-sm cursor-pointer hover:bg-[#ffffff10] transition duration-200 ease-in-out flex items-center justify-between ${
            active && 'bg-[#ffffff13] hover:bg-[#ffffff13]'
          }`}
        >
          <div className='flex items-center gap-3 overflow-hidden w-[100%]'>
            <ChatBubbleLeftIcon className='h-3 w-3 opacity-20' />
            <div className='truncate w-[80%]'>
              {firstChatMessage?.docs[firstChatMessage?.docs.length - 1]?.data().text || 'New Chat'}
            </div>
          </div>

          <TrashIcon
            onClick={removeChat}
            className='h-4 w-4 opacity-40 hover:text-[#ff6d6d] hover:opacity-100 duration-150 ease-in-out transition'
          />
        </div>
      </Link>
    </div>
  );
}

export default ChatRow;
