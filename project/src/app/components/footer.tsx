'use client'
import Image from "../../../node_modules/next/image"
import { usePathname } from "../../../node_modules/next/navigation"
import logo from "../images/supreme.png"

export default function Footer() {
    const pathname = usePathname();

    if (pathname === '/') {
        return null
    }

    return (
        <footer className="h-40 w-full bg-[#F2F2F2] flex flex-col items-center px-5 pt-10 justify-evenly md:flex-row">
            <div className="relative w-20 h-8">
                <Image src={logo} alt={'logo'} fill />
            </div>
            <div className="text-xs text-center leading-6 md:flex">
                <span className="hidden md:block">&copy; 2023 Supreme, Inc.</span>
                Terms | Privacy | Legal | Security | Contact
                <br />
                <span className="md:hidden">&copy; 2023 Supreme, Inc.</span>
            </div>
        </footer>
    )
}