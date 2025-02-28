import React from 'react'

const teachingCard = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='h-[290px] w-[530px] bg-[linear-gradient(343deg,_#F9B66B_20%,_#F7E6D3_92%)] rounded-3xl rounded-tl-none p-5'>
         <div className='w-48 h-6 bg-white rounded-xl flex items-center justify-center'>
            <p className='text-sm text-[#F9B66B]'>Sorterings algortim</p>
         </div>
         <div className='mt-3.5'>
           <h1 className='text-6xl font-mono'>QuickSort</h1> 
         </div>
         <div className='mt-5 w-3/5'>
            <p className='font-roboto text-[#837868] text-xl'>Dela upp listan vid en pivot och sortera delarna rekursivt</p>
         </div>
         <div className='flex items-center gap-8 mt-10'>
            <h1 className='hover:underline hover:cursor-pointer text-xl'>Läs Mer</h1>
            <img src="src\assets\icons\arrow-right.svg" alt="arrow-right" className='w-8'/>
         </div>
      </div>
    </div>
  )
}

export default teachingCard
