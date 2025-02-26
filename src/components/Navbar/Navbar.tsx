import React from 'react'
import { Link } from 'react-router-dom'
import iconImage from "../../assets/icons/iconImage.svg"
import githubIcon from "../../assets/icons/Github.svg"
import arrowIcon from "../../assets/icons/arrowicon.svg"


const Navbar = () => {
  return (
    <nav className='flex justify-between h-24 items-center py-5 bg-blanchOrange'>
        <img className='ml-16' src={iconImage} alt="bild" />
        <div className='flex w-1/2 justify-evenly items-center capitalize'>
            <Link to="#" >startsida</Link>
            <div className='group relative flex border-2 border-footerBlue rounded-lg px-3 py-1'>
                <span>Testa algoritmen</span> <img className='ml-2' src={arrowIcon} alt="" />
                <div className='absolute w-full left-0 top-0 hidden group-hover:block'>
                    <ul className='w-full mt-10 hidden group-hover:block bg-white px-3 py-2 capitalize'>
                        <li><Link to="#">Testa algoritmen</Link></li>
                        <li><Link to="#">nånting</Link></li>
                        <li><Link to="#">nånting</Link></li>
                        <li><Link to="#">nånting</Link></li>
                    </ul>
                </div>
            </div>
            <Link to="#" >Läroportal</Link>
            <Link to="#" >Om projektet</Link>
        </div>
        <Link className="mr-32 bg-black text-white flex gap-2 py-2 px-4 rounded-[10px]" to={"https://github.com/"}><span className='underline'>Github</span><img src={githubIcon} alt="github icon" /></Link>
    </nav>
  )
}

export default Navbar