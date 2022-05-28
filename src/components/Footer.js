import React from 'react'

const Footer = () => {
    return (
        <div className='w-full bg-gray-900 text-gray-500 px-10'>
            <div className='max-w-7xl flex flex-col sm: flex-row py-4 mx-auto justify-between items-center'>
            <div className='text-center'>
                <div>
                    Copyright <strong><span>company</span></strong>. All Rights Reserved
                </div>
                <div>
                    Designed by TailwindCSS
                </div>
            </div>
            <div className='text-center text-xl text-white mb-2'>
                <a href='#' className='w-10 h-10 rounded-full bg-yellow-500 hover:bg-yellow-600 mx-1 inline-block pt-1'></a>
                <a href='#' className='w-10 h-10 rounded-full bg-yellow-500 hover:bg-yellow-600 mx-1 inline-block pt-1'><i className='fa fa-instagram'></i></a>
                <a href='#' className='w-10 h-10 rounded-full bg-yellow-500 hover:bg-yellow-600 mx-1 inline-block pt-1'><i className='fa fa-facebook'></i></a>
                <a href='#' className='w-10 h-10 rounded-full bg-yellow-500 hover:bg-yellow-600 mx-1 inline-block pt-1'><i className='fa fa-skype'></i></a>
                <a href='#' className='w-10 h-10 rounded-full bg-yellow-500 hover:bg-yellow-600 mx-1 inline-block pt-1'><i className='fa fa-linkedin'></i></a>
            </div>
            </div>
        </div>
        
    )
}

export default Footer