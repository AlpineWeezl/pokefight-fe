import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub,faLinkedin, faPinterest, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";

import React from 'react'

const Footer = () => {
    return ( 
        <div className='bg-mint m-0 p-0 w-full h-20 flex items-center justify-around'>
            <div className='text-center text-white'>
                    This website was created with React and TailwindCSS.
            </div>
            <div className='text-center flex'>
                <a href='#' className='w-10 h-10 rounded-full bg-lightyellow text-mint mx-1 inline-block pt-2'><FontAwesomeIcon icon={faGithub}/></a>
                <a href='#' className='w-10 h-10 rounded-full bg-lightyellow text-mint mx-1 inline-block pt-2'><FontAwesomeIcon icon={faLinkedin}/></a>
            </div>
        </div>
        
    )
}

export default Footer