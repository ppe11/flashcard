import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Footer = () => {
  return (
    <footer className="bg-[#FDE7CB] py-8">
      <div className="container mx-auto px-6 h-auto">
        <div className="flex flex-col md:flex-row lg:mt-[-20px]">
          {/* Left - Paw Icon */}
          <div className="mb-4 md:mb-0 mt-10 mr-100">
            <a href="/landing" className="flex items-center">
              <Image src={assets.icon_paw} alt="Paw" width={40} height={40} />
            </a>
          </div>

          {/* Center - Company, Legal, and Social */}
          <div className="flex flex-col md:flex-row justify-center items-center md:space-x-45">
            {/* Company Section */}
            <div className="text-center md:text-left text-sm ">
              <h3 className="font-bold">Company</h3>
              <ul className="mt-2 space-y-1 text-gray-700">
                <li><a href="#" className="hover:underline">About us</a></li>
                <li><a href="#" className="hover:underline">FAQ</a></li>
                <li><a href="/contact" className="hover:underline">Contact</a></li>
              </ul>
            </div>

            {/* Legal Section */}
            <div className="text-center md:text-left text-sm">
              <h3 className="font-bold">Legal</h3>
              <ul className="mt-2 space-y-1 text-gray-700">
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                <li><a href="#" className="hover:underline">Cookie Policy</a></li>
              </ul>
            </div>

            {/* Social Section */}
            <div className="text-center md:text-left lg:mb-[10px]">
              <h3 className="font-bold">Social</h3>
              <div className="mt-[5px] flex space-x-4 justify-center md:justify-start mb-10">
                <Image src={assets.instagram} alt="Instagram" width={24} height={24} />
                <Image src={assets.twitter} alt="Twitter" width={24} height={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-black my-6 lg:mt-[-1px]"></div>

        {/* Copyright */}
        <div className="text-center text-black text-sm lg:mt-[-10px]">
          Copyright © LoveAtFirstPaw 2025
        </div>
      </div>
    </footer>
  );
};

export default Footer;
