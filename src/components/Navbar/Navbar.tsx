import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/AuthProvider";
import webIcon from "../../assets/icons/webIconSVG.svg";
import Submenu from "./Submenu";
import { CaretDown } from "@phosphor-icons/react";

const Navbar = () => {
  const auth = useAuth();

  return (
    <nav className="relative z-50 font-roboto flex items-center h-24 px-16 ">
      <div className="">
        <Link to="/">
          <img className=" max-w-56" src={webIcon} alt="bild" />
        </Link>
      </div>
      <div className="flex-grow flex justify-center pr-60 ">
        <div className="flex gap-12 items-center capitalize">
          <Link className="hover:underline" to="/" replace>
            Startsida
          </Link>
          <div className="group relative rounded-lg px-3 py-1 ">
            <Link
              to="testa-algoritm"
              className="flex z-10 items-center justify-center"
            >
              Testa algoritmen{" "}
              <CaretDown
                size={16}
                className="ml-2 transition-transform duration-100 ease-in group-hover:rotate-[180deg]"
              />
            </Link>
            <Submenu />
          </div>
          <Link className="hover:underline" to="laroportal">
            Läroportal
          </Link>
          <Link className="hover:underline" to="about-us">
            Om projektet
          </Link>
          {auth.token && <span>inloggad</span>}
        </div>
        <div></div>
      </div>
      {/* <Link
        className="mr-32 bg-black text-white flex gap-2 py-2 px-4 rounded-[10px]"
        to={"https://github.com/Emilaberg/datacentralen"}
        target="_blank"
      >
        <span className="hover:underline">Github</span>
        <img src={githubIcon} alt="github icon" />
      </Link> */}
    </nav>
  );
};

export default Navbar;
