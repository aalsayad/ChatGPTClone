'use client';

import OpenAILogo from '../../../public/OpenAILogo';
import { signIn } from 'next-auth/react';
import React from 'react';
import { motion } from 'framer-motion';

function Login() {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
        className='-mt-10 mb-24 w-[150px] h-[150px]'
      >
        <OpenAILogo width='150px' />
      </motion.div>
      <h1 className='text-xs mb-7 opacity-60 uppercase tracking-wide'>Welcome to chatGPT's clone</h1>
      <button
        onClick={() => signIn('google')}
        className='border-[1px] border-[#ffffff10] rounded-lg flex items-center justify-center p-4 px-20 gap-2 hover:bg-[#ffffff10] cursor-pointer duration-200 transition'
      >
        <p className='text-base'>Sign in to use Chat GPT</p>
      </button>
    </div>
  );
}

export default Login;
