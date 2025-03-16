import React from 'react'

const Navbar = () => {
  return (
    <nav className="w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 bg-orange-50 text-gray-900 shadow-md ">

        <div>
            <a href="#home" className="flex items-center">
                <img src="/Icon%20paw.png" alt="Paw" />
            </a>
        </div>


        <ul className={`flex items-center gap-24 rounded-full px-12 py-3 `}>
            <li><a href="#home">Home</a></li>
            <li><a href="#shelters">Shelters</a></li>
            <li><a href="#quiz">Quiz</a></li>
            <li><a href="#pets">Pets</a></li>
        </ul>

        <div className='flex items-center gap-4'>
            <a href="#contact" className="flex items-center gap-3 px-10 py-2.5 border border-orange-500 bg-orange-500 shadow-lg
                text-white rounded-full ml-4 font-Ovo hover:bg-orange-600 hover:border-orange-600 transition"> 
            Contact 
            </a>
        </div>
  </nav>
  )
}

export default Navbar
