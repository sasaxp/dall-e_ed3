import React from 'react'
import { download } from '../assets'
import {downloadImage} from '../utils'
const Card = ({_id, name, prompt, photo, onDelete}) => {
  return (
    <div className='rounded-xl group relative shadow-card
                  hover:shadow-cardhover card'>
        
         {/* DELETE Button */}
         <div className='absolute top-0 right-0 mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                <button
                    type='button'
                    onClick={() => {onDelete(_id)}}
                    className='text-white bg-red-700 font-medium rounded-md text-sm px-5 py-2.5 button-clicked'
                >
                    DELETE
                </button>
        </div>   
        <img className='w-full h-auto object-cover rounded-xl'
              src={photo}
              alt={prompt}
        />
        <div className='group-hover:flex flex-col max-h-[94.5%]
        hidden absolute bottom-0 left-0 right-0 bg-[#10131f]
        m-1 p-4 rounded-md'>
          <p className='text-white text-sm overflow-y-auto prompt'>{prompt}</p>
          <div className='mt-1 flex justify-between items-center gap-2'>
            <div className='flex items-center gap-2'>
              <div className='w-7 h-7 rounded-full object-cover
              bg-green-700 flex justify-center items-center
              text-white text-xs font-bold'>
                {name[0]}
              </div>
              <p className='text-white text-sm'>{name}</p>
            </div>
            <button type='button' onClick={()=>downloadImage(_id, photo)}
            className='outline-none bg-transparent border-none'>
              <img src={download} alt='download' className='w-6 h6 
              object-contain invert' />
            </button>
          </div>
        </div>
               
  </div>
  )
}

export default Card