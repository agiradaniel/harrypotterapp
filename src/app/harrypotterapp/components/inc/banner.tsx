import React from 'react';
import Image from 'next/image';
import HarryBanner from '../images/harrybanner.png';

export default function Banner() {
  return (
    <>
        <div className="bg-gray-800">
            <Image src={HarryBanner} alt="Top Banner" className="w-full h-auto" height={250} style={{width:"100%"}}
        />
      </div>
    </>
  )
}
