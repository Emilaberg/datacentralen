import React from 'react'
import HeroBanner from '../../components/Herobanner/HeroBanner'
import TeachingCard from '../../components/TeachingCard/TeachingCard'

const Index = () => {
  return (
    <section className='bg-blanchOrange'>
      <HeroBanner/>
      <TeachingCard 
      algorithmType='Sorterings algoritm' 
      algorithmName='QuickSort' 
      algorithmDescription='Dela upp listan vid en pivot och sortera delarna rekursivt'
      gradientColor1='#F9B66B'
      gradientColor2='#F7E6D3'
      />
    </section>
  )
}

export default Index