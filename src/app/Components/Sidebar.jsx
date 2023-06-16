'use client';

import React from 'react';
import NewChat from './NewChat';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className='p-4 flex flex-col h-screen bg-[#111010] max-w-xs overflow-y-auto md:min-w-[20rem] justify-between'>
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
        {/* Map through the chat rows */}
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
