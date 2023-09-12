import React from 'react'
import { ReactNavbar } from 'overlay-navbar'
import logo from "../assets/logo1.png"

const Header = () => {
    return (
        <div style={{ zIndex: "12" }}>
            <ReactNavbar
                burgerColorHover="#eb4034"
                burgerColor="black"
                
                style={{
                    zIndex: "12"
                }}
                logo={logo}
                logoWidth="20vmax"
                link1Text="Home"
                link2Text="Product"
                link3Text="Contact"
                link4Text="About"
                linkText="new"
                link1Url="/"
                link2Url="/products"
                link3Url="/contact"
                link4Url="/about"
                link1Size="1.3vmax"
                link1Color="rgba(35,35,35,0.8)"
                navColor1="rgba(0,0,0,0.4)"
                nav1justifyContent="flex-end"
                nav2justifyContent="flex-end"
                nav3justifyContent="flex-start"
                nav4justifyContent="flex-start"
                link1ColorHover="#eb4034"
                link1Margin="1vmax"
                profileIconColour="rgba(35,35,35,0.8)"
                searchIconColour="rgba(35,35,35,0.8)"
                cartIconColour="rgba(35,35,35,0.8)"
                profileIconColorHover="#eb4034"
                searchIconColorHover="#eb4034"
                cartIconColorHover="#eb4034"
                cartIconMargin="1vmax"
            />
        </div>
    )
}

export default Header