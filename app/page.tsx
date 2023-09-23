import React from 'react'
import Image from 'next/image';
const Page = () => {
  return (
    <div style={{
      width: '100%',
      height: '85vh',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
        <Image
        src="/cool-background.png" 
        alt="Tabler"
        width={1920}
        height={900}
      />
    </div>
);
};

export default Page