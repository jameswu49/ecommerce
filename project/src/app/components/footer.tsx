'use client'
import Image from "../../../node_modules/next/image"
import logo from "../images/supreme.png"

export default function Footer() {
    return (
        <footer className="h-auto w-full bg-[#F2F2F2] flex flex-col items-center px-5 pt-5 justify-evenly md:h-[20vh]">
            <div className="relative w-20 h-8 hidden md:block">
                <Image src={logo} alt={'logo'} fill />
            </div>
            <div className="text-xs text-center leading-6">
                Disclaimer: This site is not affiliated with or endorsed by Supreme. All products offered on this website are inspired by Supreme but are not genuine Supreme products. The use of the Supreme logo, trademarks, and trade names on this site is for descriptive purposes only. The products sold on this site are not genuine Supreme items, and any reference to Supreme is for comparison purposes only.
            </div>
        </footer>
    )
}