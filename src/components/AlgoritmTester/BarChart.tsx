import React from 'react'
import { useAlgorithm } from '../../Services/AlgorithmProvider'

const BarChart = () => {
    const AlgorithmProvider = useAlgorithm()
  return (
    <article>
            <div className="flex gap-2 h-96 mt-7 items-end">
              {AlgorithmProvider.array.map((item, index) => (
                <div
                  key={index}
                  className={`relative w-4 bg-black`}
                  style={{
                    height: `${
                      (item / 10) * 100 > 100 ? 100 : (item / 10) * 100
                    }%`,
                  }}
                >
                  <span className="absolute top-full mt-2">{item}</span>
                </div>
              ))}
            </div>
          </article>
  )
}

export default BarChart