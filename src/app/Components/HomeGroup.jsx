import React from 'react';

function HomeGroup({ icon, title, examples }) {
  return (
    <div>
      <div>
        <div className='flex flex-col items-center justify-center mb-5'>
          {icon}
          <h2>{title}</h2>
        </div>
        <div className='space-y-2'>
          {examples.map((example) => {
            return <p className='info-text'>{example}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export default HomeGroup;
