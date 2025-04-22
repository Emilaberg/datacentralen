import React from "react";
import { Link } from "react-router-dom";
import githubIcon from "../../assets/icons/Github.svg";
import arrowIcon from "../../assets/icons/arrowicon.svg";
import { useAuth } from "../../Auth/AuthProvider";
import webIcon from "../../assets/icons/webIconSVG.svg";
import Submenu from "./Submenu";
import LaroportalDropdown from "./LaroportalDropdown";

const Navbar = () => {
  const auth = useAuth();
  return (
    <nav className="relative z-50 font-roboto flex justify-between h-24 items-center py-5 ">
      <Link to="/">
        <img className="ml-16 max-w-56" src={webIcon} alt="bild" />
      </Link>
      <div className="flex w-1/2 justify-evenly items-center capitalize">
        <Link className="hover:underline" to="/" replace>
          startsida
        </Link>
        <div className="group relative flex border-2 border-footerBlue rounded-lg px-3 py-1 ">
          <Link to="testa-algoritm" className="flex z-10">
            Testa algoritmen <img className="ml-2" src={arrowIcon} alt="" />
          </Link>
          <Submenu />
        </div>
        <div className="group relative flex border-2 border-footerBlue rounded-lg px-3 py-1">
          <Link to="laroportal" className="flex z-10">
            Läroportal <img className="ml-2" src={arrowIcon} alt="dropdown" />
          </Link>
          <LaroportalDropdown />
        </div>
        <Link className="hover:underline" to="about-us">
          Om projektet
        </Link>
        {auth.token && <span>inloggad</span>}
      </div>
      <Link
        className="mr-32 bg-black text-white flex gap-2 py-2 px-4 rounded-[10px]"
        to={"https://github.com/Emilaberg/datacentralen"}
        target="_blank"
      >
        <span className="hover:underline">Github</span>
        <img src={githubIcon} alt="github icon" />
      </Link>
    </nav>
  );
};

export default Navbar;
