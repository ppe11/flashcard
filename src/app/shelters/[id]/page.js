import React from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';

export default function ShelterDetail() {
  return (
    <div className="max-w-6xl mx-auto p-8 pt-28 space-y-10">
      {/* Info Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 w-full">
        {/* Left Side: Logo + Details */}
        <div className="flex items-start gap-6 w-full md:w-2/3">
          {/* Logo */}
          <div className="min-w-[96px] min-h-[96px] bg-white border border-gray-300 rounded-full flex items-center justify-center">
            <Image src={assets.icon_paw} alt="shelter logo" width={48} height={48} />
          </div>

          {/* Text Details */}
          <div className="flex flex-col space-y-3">
            <h1 className="text-3xl font-bold text-gray-800">Surrey Animal Resource Centre</h1>
            <hr className="border-t border-gray-300" />
            <div className="flex gap-6 items-start pt-4">
              <Image src={assets.location} alt="location" width={40} />
              <div className="text-lg text-gray-700">
                <p>17944 Colebrook Rd</p>
                <p>Surrey, BC V3Z 1C1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact & Button */}
        <div className="flex flex-col items-center gap-3 w-full md:w-1/3">
          <button className="px-6 py-2 border-2 text-orange-500 border-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition duration-300">
            VIEW OUR SHELTER
          </button>
          <div className="w-full border-t border-gray-200" />
          <div className="flex gap-6 items-center self-start">
            <Image src={assets.email} alt="email" width={30}  />
            <a href="mailto:adoption@surrey.ca" className="text-lg text-orange-500">adoption@surrey.ca</a>
          </div>
          <div className="w-full border-t border-gray-200" />
          <div className="flex gap-6 items-center self-start">
            <Image src={assets.phone} alt="phone" width={30} />
            <a href="tel:+16045746622" className="text-lg text-orange-500">(604) 574-6622</a>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-300" />

      {/* Full Width Map Section */}
      <div className="w-full h-96 rounded-lg overflow-hidden shadow">
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg">
          Loading map...
        </div>
      </div>
    </div>
  );
}
