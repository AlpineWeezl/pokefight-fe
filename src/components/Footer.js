import React from 'react'

const Footer = () => {
    return ( 
        <div className='bg-mint m-0 p-0 w-full h-20 flex items-center justify-around'>
            <div className='text-center text-white'>
                    This website was created with React and TailwindCSS.
            </div>
            <div className='text-center flex'>
                <a href='#' className='w-10 h-10 rounded-full bg-lightyellow mx-1 inline-block pt-1'>h</a>
                <a href='#' className='w-10 h-10 rounded-full bg-lightyellow mx-1 inline-block pt-1'>h</a>
                <a href='#' className='w-10 h-10 rounded-full bg-lightyellow mx-1 inline-block pt-1'>h</a>
            </div>
        </div>
        
    )
}

export default Footer