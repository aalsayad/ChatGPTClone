import { SunIcon, BoltIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import HomeGroup from './Components/HomeGroup';

const homepageData = [
  {
    id: 1,
    title: 'Examples',
    icon: <SunIcon className='h-6 w-6' />,
    examples: [
      '"Explain quantum computing in simple terms" →',
      '"Got any creative ideas for a 10 year old’s birthday?" →',
      '"How do I make an HTTP request in Javascript?" →',
    ],
  },
  {
    id: 2,
    title: 'Capabilities',
    icon: <BoltIcon className='h-6 w-6' />,
    examples: [
      'Remembers what user said earlier in the conversation',
      'Allows user to provide follow-up corrections',
      'Trained to decline any inappropriate requests',
    ],
  },
  {
    id: 3,
    title: 'Limitations',
    icon: <ExclamationTriangleIcon className='h-6 w-6' />,
    examples: [
      'May occasionally generate incorrect information',
      'May occasionally produce harmful instructions or biased content',
      'Limited knowledge of world and events after 2021',
    ],
  },
];

export default function Home() {
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen px-2'>
        <h1 className='text-5xl font-bold mb-20'>ChatGPT</h1>
        <div className='flex space-x-3 text-center bg'>
          {homepageData.map((group) => {
            return <HomeGroup key={group.id} title={group.title} icon={group.icon} examples={group.examples} />;
          })}
        </div>
      </div>
    </>
  );
}
