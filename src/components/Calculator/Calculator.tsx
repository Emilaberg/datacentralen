import React, { useState } from 'react'
import { useAlgorithm } from '../../Services/AlgorithmProvider';
import { iterationSpeedTypes } from '../../Types/types';
import Numpad from './Numpad';
import CalculatorScreen from './CalculatorScreen';

const Calculator = () => {
    const AlgorithmProvider = useAlgorithm();

    const [activeSpeed,setActiveSpeed] = useState<string>("b1");

    const trigger = (value: string | number) => {
        console.log(value);
    }

    const changeSpeed =  (speed:iterationSpeedTypes,btn: "1x" | "2x" | "3x" | '4x') => {
        setActiveSpeed(btn)
        AlgorithmProvider.setIterationSpeed(speed)
    }
  return (
    
    <section className='flex flex-col items-center my-2 gap-5'>
        <section className='w-full xl:w-[500px] px-10'>
            <div className='flex justify-end gap-2 '>
                <h2 className='text-[#777777]'>hastighet:</h2>
                <button onClick={() => changeSpeed(1000,'1x')} type='button' className={`hover:underline active:text-black cursor-pointer ${activeSpeed === '1x' ? 'text-black font-medium': 'text-[#777777] font-thin'} text-lg `}>1x</button>
                <button onClick={() => changeSpeed(500,'2x')} type='button' className={`hover:underline active:text-black cursor-pointer ${activeSpeed === '2x' ? 'text-black font-medium': 'text-[#777777] font-thin'} text-lg  `}>2x</button>
                <button onClick={() => changeSpeed(250,'3x')} type='button' className={`hover:underline active:text-black cursor-pointer ${activeSpeed === '3x' ? 'text-black font-medium': 'text-[#777777] font-thin'} text-lg  `}>3x</button>
                <button onClick={() => changeSpeed(100,'4x')} type='button' className={`hover:underline active:text-black cursor-pointer ${activeSpeed === '4x' ? 'text-black font-medium': 'text-[#777777] font-thin'} text-lg  `}>4x</button>
            </div>
            {/* screen */}
            <CalculatorScreen/>
        </section>
        {/* numpad */}
       <Numpad/>
    </section>
  )
}

export default Calculator