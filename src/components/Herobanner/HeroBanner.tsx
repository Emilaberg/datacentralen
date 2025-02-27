import React from 'react'



const HeroBanner = () => {
  return (
    <section className='h-screen flex flex-col gap-10 items-center mt-40'>
        
        <article className='relative w-2/3 xl:w-1/2'>
            {/* blur */}
            <div className='absolute w-60 h-60 bg-[#A0DABA] rounded-full  right-0 z-0 -bottom-10  blur-[100px] hover:blur-[50px] transition-all ease-in duration-100'></div>
            <div className='absolute w-72 h-72 bg-white rounded-full left-1/2 -translate-x-1/2 z-0 blur-[40px] hover:blur-[50px '></div>
            <div className='absolute w-60 h-60 bg-[#BB86FC] rounded-full  left-0 z-0 bottom-1/2 blur-[100px] hover:blur-[50px] transition-all ease-in duration-100'></div>
            <h1 className='relative text-7xl z-10'>En Läroplattform</h1>
            <h1 className='relative text-7xl mt-7 text-center z-10'>om Algoritmer</h1>
        </article>
        <article className='relative z-10 flex justify-between w-1/3 font-semibold'>
            <button className='py-2 px-3 hover:text-white hover:bg-[#A0DABA] rounded-xl hover:border hover:border-black transition-colors ease-in duration-100'>Testa en Algoritm</button>
            <button className='py-2 px-3 hover:text-white hover:bg-[#A0DABA] rounded-xl hover:border hover:border-black'>Läs mer</button>
        </article>
    </section>
  )
}

export default HeroBanner