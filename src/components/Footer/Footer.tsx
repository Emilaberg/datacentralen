import githubIcon from "../../assets/icons/Github.svg";
import { Link } from "react-router-dom";
import { CaretDown } from "@phosphor-icons/react";
import { useState, useRef, useEffect } from "react";

const Footer = () => {
  const [gitHubToggle, setGitHubToggle] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(target)
      ) {
        setGitHubToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropDown = () => {
    setGitHubToggle((prev) => !prev);
  };

  return (
    <footer className="flex justify-center items-center  min-h-52 bg-backgroundWhite w-full px-20 mb-10">
      <section className="w-4/5 h-4/5 flex border-t-1 border-black  justify-center ">
        <article className="flex mt-8 justify-around w-full">
          <article className="flex items-center justify-center">
            <p className="text-sm font-extrabold text-footerTextColor opacity-50">
              Läroportalen - 2025. All rights reserved.
            </p>
          </article>
          <article className="ml-20">
            <ul className="flex items-center gap-8 text-footerTextColor ">
              <a href="/testa-algoritm">
                <li className="hover:underline hover:cursor-pointer ">
                  Testa algoritm
                </li>
              </a>
              -
              <a href="/laroportal">
                <li className="hover:underline hover:cursor-pointer">
                  Läroportal
                </li>
              </a>
              -
              <a href="/about-us">
                <li className="hover:underline hover:cursor-pointer">
                  Om projektet
                </li>
              </a>
              -
              <div
                ref={toggleButtonRef}
                onClick={handleDropDown}
                className="select-none bg-black text-white flex items-center gap-2 py-2 px-4 rounded-[10px] relative hover:cursor-pointer"
              >
                <span>Github</span>
                <img src={githubIcon} alt="github icon" />
                <CaretDown
                  size={18}
                  style={{
                    transform: gitHubToggle ? "" : "rotate(-180deg)",
                    transition: "all 0.2s ease-in",
                  }}
                />
                {gitHubToggle && (
                  <div
                    ref={dropdownRef}
                    className="bg-black w-full top-full left-0 py-2 px-4 text-white font-bold flex flex-col items-center gap-2 mt-1 absolute rounded-[8px]"
                  >
                    <Link
                      className="hover:underline decoration-2"
                      to="https://github.com/Emilaberg/datacentralen"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Frontend
                    </Link>
                    <Link
                      className="hover:underline"
                      to="https://github.com/MaxTarn/DataCentralen-Api"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Backend
                    </Link>
                  </div>
                )}
              </div>
            </ul>
          </article>
        </article>
      </section>
    </footer>
  );
};

export default Footer;
