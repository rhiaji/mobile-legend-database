'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKhanda, faRightToBracket, faBars, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Heroes from '@/components/Heroes'
import Signin from '@/components/Signin'

export default function Home() {
    const [menu, setMenu] = useState(false)

    return (
        <main className="sm:flex">
            {/* Menu Toggle Button (Visible only on small screens) */}
            <FontAwesomeIcon
                icon={faBars}
                className={`text-white absolute top-3 left-3 text-2xl lg:hidden ${menu ? 'hidden' : 'block'} cursor-pointer`}
                onClick={() => setMenu(true)}
            />

            {/* Navigation Menu */}
            <nav className={`w-64 h-screen bg-white p-5 ${menu ? 'block' : 'hidden'} lg:block`}>
                <div className="flex justify-end text-xl">
                    {/* Close Menu Button (Visible only when the menu is open) */}
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        height={35}
                        width={35}
                        className="hover:text-gray-500 cursor-pointer lg:hidden"
                        onClick={() => setMenu(false)}
                    />
                </div>
                <ul className="flex flex-col gap-4">
                    <li className="flex gap-2 items-center text-xl font-semibold hover:text-gray-500 cursor-pointer">
                        <FontAwesomeIcon icon={faKhanda} height={25} width={25} />
                        Heroes
                    </li>
                    <a href="/">
                        <li className="flex gap-2 items-center text-xl font-semibold hover:text-gray-500 cursor-pointer">
                            <FontAwesomeIcon icon={faRightToBracket} height={25} width={25} />
                            Sign in
                        </li>
                    </a>
                </ul>
            </nav>
            <div className="w-full">
                <Heroes />
                <Signin />
            </div>
        </main>
    )
}
