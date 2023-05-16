import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { logo, mainlogo } from './assets';
import { Home, CreatePost } from './pages';


const App = () => {
  
  return (
    <BrowserRouter>
      <header className=' w-full flex justify-between text-white items-center bg-[#0D2329] sm:px-8 py-4 '>
        <Link to="/">
          <div className='flex items-stretch'>
          <img src={mainlogo} className='w-10 inline-block' alt="" />
          <h1 className='font-bold text-xl font-mono inline-block text-[#FFFFE8]'>ImageAI</h1>
          </div>
        </Link>
        <Link to='/create-post' className='font-inter border  font-medium bg-[#032933]
        text-white px-4 py-2 rounded-md'>
          Generate
        </Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#07272f] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/create-post' element={<CreatePost/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
