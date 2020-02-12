import React from 'react';
import './Footer.css';
import FBIcon from '../Image/fb-icon.png';
import YTIcon from '../Image/youtube-icon.png';
import INIcon from '../Image/instagram-icon.png';
import CPR from '../Image/Copyrights.png';

const Footer = () => {
    return (
        <div className="lon">

            <div className='line'>
                <div className="icon-img">
                    <img className='YT' src={YTIcon}/>
                </div>
                <div className="icon-img">
                    <img className='IN' src={INIcon}/>
                </div>
                <div className="icon-img">
                    <img className='FB' src={FBIcon}/>
                </div>
                    <div className="copy-rights">
                        <img src={CPR}/>
                     </div>
            </div>
            
         </div>
    );
}

export default Footer;