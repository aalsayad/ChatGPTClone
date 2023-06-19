'use client';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase';
import ChatRow from './ChatRow';
import NewChat from './NewChat';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';

function Sidebar() {
  const { data: session } = useSession();

  //@Using useCollection from react-firebase-hooks to read our documents
  const [chats, loading, error] = useCollection(
    session && query(collection(db, 'users', session.user?.email, 'chats'), orderBy('createdAt', 'desc'))
  );

  return (
    <div className='p-4 flex flex-col h-screen bg-[#111010] max-w-xs  md:min-w-[20rem] justify-between'>
      <div>
        {/* New Chat */}
        <NewChat />
        <div className='mt-8'>
          {/* Select Your Model */}
          <div className='label-text'>Select version</div>
        </div>
        <div className='mt-8'>
          <div className='label-text'>Previous Chats</div>
        </div>
        <div className='relative'></div>
          {/* Map through the chat rows */}
          <div className='pb-10 relative overflow-y-auto overflow-x-hidden max-h-[75dvh] mt-5 flex flex-col gap-3'>
            <AnimatePresence initial='false'>
              {chats?.docs?.map((chat) => {
                return (
                  <motion.div
                    key={chat.id}
                    initial={{ x: -170, opacity: 0.4 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.5, ease: cubicBezier(0.76, 0, 0.24, 1) }}
                  >
                    <ChatRow id={chat.id} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className='w-full h-6 bg-gradient-to-t from-[#111010] to-[transparent] absolute bottom-0'></div>
        </div>
      </div>

      {/*User Details*/}
      {session && (
        <div onClick={() => signOut()} className='group button justify-between rounded-lg'>
          <div className='flex gap-5'>
            <img src={session.user?.image} className='rounded-full w-11' />
            <div>
              <p className='label-text'>Welcome back,</p>
              <p className='text-base'>{session.user?.name}</p>
            </div>
          </div>
          <ArrowRightOnRectangleIcon className='h-6 w-6 opacity-25 group-hover:opacity-70 transition duration-300 ease-in-out' />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
