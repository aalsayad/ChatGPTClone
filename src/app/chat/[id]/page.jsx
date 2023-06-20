import React from 'react';
import Chat from '@/app/Components/Chat';
import ChatInput from '@/app/Components/ChatInput';

function page(props) {
  //!This is a dynamic route so we can get the id from the route using props instead of converting to client component and then using router
  const idFromURL = props.params.id; //@The reason why its ID is because the page is being rendered using [id] tag in folder structure
  return (
    <div className='overflow-hidden h-screen w-full flex flex-col justify-between'>
      <Chat chatId={idFromURL} />
      <ChatInput chatId={idFromURL} />
    </div>
  );
}

export default page;
