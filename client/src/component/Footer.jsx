import React from 'react'

import play_store from "../assets/play-store.png"
import app_store from "../assets/app-store.png"

import '../styles/footer.css'

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='left-footer'>

                <h1>DOWNLOAD OUR APP</h1>

                <h2>
                    Download App For Android And <br /> IOS Mobile Phone
                </h2>

                <img src={play_store} className='play-store-img' alt="" />
                <img src={app_store} className='app-store-img' alt="" />

            </div>

            <div className='middle-footer'>
                <h1>ECOMMERCE.</h1>

                <p>
                    High Quality Is Our First Priority
                    Copyrights 2021 ShivSawant@gmail.com
                </p>

            </div>

            <div className='right-footer'>
                <div>
                    <h1>Follow Us</h1>
                </div>
                <div className='links'>
                    <a href="https://www.instagram.com/shivsawant58/" target='_blank'><h4>Instagram</h4></a>
                    <a href="https://www.linkedin.com/in/shiv-sawant-3bbb26229/" target='_blank'> <h4>LinkedIn</h4></a>
                    <a href="https://www.facebook.com/shiv.sawant.946/" target='_blank'> <h4>Facebook</h4></a>

                </div>
            </div>

        </div>
    )
}

export default Footer