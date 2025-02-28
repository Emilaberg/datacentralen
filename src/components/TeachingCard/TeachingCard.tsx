import React from 'react'
import { useNavigate } from 'react-router-dom';



// Todos
// 1. Gör dynamisk, ta emot typ av algoritms-typ, algoritms-namn, algoritms-beskrivning och länk till mer information
// 2. Dynamisk styling, ta emot färgkod för bakgrund, 2 färger för gradient. 

type CardComponentProps = {
   algorithmType: string,
   algorithmName: string,
   algorithmDescription: string,
   link?: string,
   gradientColor1: string,
   gradientColor2: string
};


// bg-[linear-gradient(343deg,_${gradientColor1}_20%,_${gradientColor2}_92%)]
const teachingCard: React.FC<CardComponentProps> = ({ algorithmType, algorithmName, algorithmDescription, link, gradientColor1, gradientColor2 }) => {

    const navigate = useNavigate();
    const RouteToText = (link: string | undefined) => {
        if(link === undefined) {
            return
        }
        navigate(link)
    }
    
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className="h-72 w-[530px] rounded-3xl rounded-tl-none p-5" style={{background: `linear-gradient(343deg, ${gradientColor1} 20%, ${gradientColor2} 92%)`}}>
         <div className='w-48 h-6 bg-white rounded-xl flex items-center justify-center'>
            <p className='text-sm text-[#F9B66B]'>{algorithmType}</p>
         </div>
         <div className='mt-3.5'>
           <h1 className='text-6xl font-mono'>{algorithmName}</h1> 
         </div>
         <div className='mt-5 w-4/5'>
            <p className='font-sans font-medium text-[#837868] text-xl tracking-tight'>{algorithmDescription}</p>
         </div>
         <div className='flex items-center gap-8 mt-10'>
            <h1 className='hover:underline hover:cursor-pointer text-xl' onClick={() => RouteToText(link)}>Läs Mer</h1>
            <img src="src\assets\icons\arrow-right.svg" alt="arrow-right" className='w-8'/>
         </div>
      </div>
    </div>
  )
}

export default teachingCard
