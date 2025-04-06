import React, { useState } from 'react'
import { useAlgorithm } from '../../Services/AlgorithmProvider';
import { iterationSpeedTypes } from '../../Types/types';
import Numpad from './Numpad';
import CalculatorScreen from './CalculatorScreen';

const Calculator = () => {
    const AlgorithmProvider = useAlgorithm();

    const [activeSpeed,setActiveSpeed] = useState<iterationSpeedTypes>(iterationSpeedTypes.STANDARD);

    const trigger = (value: string | number) => {
        console.log(value);
    }

    const changeSpeed =  (speed:iterationSpeedTypes) => {
        setActiveSpeed(speed)
        AlgorithmProvider.setIterationSpeed(speed)
    }
  return (
    
    <section className='flex flex-col items-center my-2 gap-5'>
        <section className='w-full xl:w-[500px] px-10'>
            <div className='flex justify-end gap-2 '>
                <h2 className='text-[#777777]'>hastighet:</h2>
                <button onClick={() => changeSpeed(iterationSpeedTypes.SlOWEST)} type='button' className={`hover:underline active:text-black cursor-pointer ${AlgorithmProvider.iterationSpeed === iterationSpeedTypes.SlOWEST ? 'text-black font-medium': 'text-[#777777] font-thin'} text-lg `}>1x</button>
                <button onClick={() => changeSpeed(iterationSpeedTypes.SLOWER)} type='button' className={`hover:underline active:text-black cursor-pointer ${AlgorithmProvider.iterationSpeed === iterationSpeedTypes.SLOWER ? 'text-black font-medium': 'text-[#777777] font-thin'} text-lg  `}>2x</button>
                <button onClick={() => changeSpeed(iterationSpeedTypes.STANDARD)} type='button' className={`hover:underline active:text-black cursor-pointer ${AlgorithmProvider.iterationSpeed === iterationSpeedTypes.STANDARD ? 'text-black font-medium': 'text-[#777777] font-thin'} text-lg  `}>3x</button>
                <button onClick={() => changeSpeed(iterationSpeedTypes.FASTER)} type='button' className={`hover:underline active:text-black cursor-pointer ${AlgorithmProvider.iterationSpeed === iterationSpeedTypes.FASTER ? 'text-black font-medium': 'text-[#777777] font-thin'} text-lg  `}>4x</button>
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