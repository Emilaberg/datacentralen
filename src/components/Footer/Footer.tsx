import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import footerImage from "../../assets/icons/image.svg"
import fbIcon from "../../assets/icons/fb.svg"
import instaIcon from "../../assets/icons/insta.svg"
import xIcon from "../../assets/icons/X.svg"
import linkedinIcon from "../../assets/icons/linkedin.svg"
import { useAuth } from '../../Auth/AuthProvider'

const validNames = ["admin"];
const validpWord = ["admin123"];


const Footer = () => {

    
    // const auth = useAuth();
    // const [fName, setName] = useState("");
    // const [pWord, setpWord] = useState("");


    // const handleSubmit = (e: any) => {
    //     e.preventDefault();
    //     if(validNames.includes(fName) && validpWord.includes(pWord)) auth.login({email:fName, password: pWord})
    //     console.log(fName + " " + pWord);
    // }
  return (
    <footer className='flex justify-center items-center mt-auto h-56 bg-footerBlue w-full py-9 px-20'>
        <section className='flex w-1/2 justify-between h-full'>
            <img src={footerImage} alt="bild" />
            <ul className='mr-10 flex flex-col justify-evenly'>
                <li><Link to="#">Om oss</Link></li>
                <li><Link to="#">Nyhetsbrev</Link></li>
                <li><Link to="#">Hjälpcenter</Link></li>
                <li><Link to="#">Kontakt</Link></li>
            </ul>
            
        </section>
        
        <section className='flex w-1/2 h-full justify-center '>
            <article>
                <h1>Följ oss på:</h1>
                <ul className='flex gap-5 mt-2'>
                    <li><Link to="#"><img src={fbIcon} alt="facebook" /></Link></li>
                    <li><Link to="#"><img src={instaIcon} alt="insta" /></Link></li>
                    <li><Link to="#"><img src={xIcon} alt="X" /></Link></li>
                    <li><Link to="#"><img src={linkedinIcon} alt="linkedin" /></Link></li>
                </ul>
            </article>

        </section>

        {/* <section>
            {auth.token && (<div> du är inloggad <br /> token: {auth.token} <button onClick={auth.logout}>logout</button></div>)}
            {auth.token === "" && (
                <div>
                    <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col'>
                        <label htmlFor="" >admin name</label>
                        <input id="name" type="text" className='bg-white' onChange={(e) => setName(e.target.value)}/>
                        <label htmlFor="" >admin pswd</label>
                        <input id="password" type="password" className='bg-white' onChange={(e) => setpWord(e.target.value)}/>
                        <button type="submit" className='cursor-pointer'>login</button>    
                    </form>
                </div>
            )}
        </section> */}
        
        
    </footer>
  )
}

export default Footer