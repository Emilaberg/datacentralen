import React from 'react'
import Calculator from '../Calculator/Calculator'

const AlgoritmTester = () => {
  return (
    <>
        <article className=''>
            <h2 className='text-lg text-[#777777] font-light'>vald algoritm</h2>
            <h1 className='text-5xl mt-4 mb-3'>Merge sort</h1>
            <h2 className='text-lg text-[#777777] font-light '>tidskomplexitet: O(1)</h2>
        </article>

        <section className='flex justify-between xl:justify-center'>
            <section className='w-1/2 xl:w-1/3'>
                <article className='flex flex-col bg-[#e1e1e1]/50 px-8 py-2 mt-14 w-5/6 rounded-xl'>
                    <h2 className='text-2xl'>metrics:</h2>
                    <hr className='my-2 border-gray-800'/>

                    <h3 className='flex text-lg font-light'>antal <br/> förflyttnigar: <span className='ml-auto mt-auto'> 10 steg</span></h3>
                    <hr className='my-2'/>

                    <h3 className='flex text-lg font-light'>tid: <span className='ml-auto mt-auto'>256 ms</span></h3>
                </article>
            </section>

            <section className='w-1/2 xl:w-1/3'>
                <Calculator/>
            </section>

        </section>


    </>
  )
}

export default AlgoritmTester