import React from 'react'

export default function Header({name}) {
  return (
    <div id='header-container' className='bg-background'>
      <div className='max-w-1182px mx-auto font-semibold text-28px px-17px sm:px-60px py-30px'>
        {name}
      </div>
    </div>
  )
}
