import React, { useState } from "react";
import webIcon from "../../../assets/icons/webIconSVG.svg";
import userIcon from "../../../assets/icons/userIcon.svg";
import passwordIcon from "../../../assets/icons/passwordIcon.svg";
import { useAuth } from "../../../Auth/AuthProvider";
const validNames = ["admin"];
const validpWord = ["admin123"];

const Loginpage = () => {
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    console.log(username + " " + password);
    

    if(validNames.includes(username) && validpWord.includes(password)) {
      console.log("first")
      auth.login({email: username, password: password})


    }

    
  };
  return (
    <section className="bg-linear-to-br from-0% from-[#E08B2C] to-100% to-[#FF5BB5] w-full h-screen flex items-center justify-center ">
      <section className="bg-white h-1/2 w-[1200px] flex items-center shadow-2xl">
        <div className="relative  w-3/5 h-full overflow-hidden">
          <img src={webIcon} alt="" className="relative z-20 w-60 mt-5 ml-10" />
          <div className="w-[750px] h-[750px] bg-linear-to-br from-0% from-[#EEB87D] to-70% to-[#FFAD53] rounded-full absolute right-10 bottom-1/3 shadow-2xl z-0 flex justify-center items-center">
            <div className=" mt-20">
              <h1 className="relative right-1/6 text-5xl text-white font-thin">
                Välkommen
              </h1>
              <h1 className="relative left-1/6 text-5xl text-white font-semibold">
                Tillbaka
              </h1>
            </div>
          </div>

          <div className="w-[300px] h-[300px] bg-linear-to-br from-20% from-[#88B5E8] to-80% to-[#F67F99] rounded-full inset-shadow-sm inset-shadow-black/40 absolute right-1/12 top-1/2 -translate-y-1/2 z-10"></div>

          <div className="w-[400px] h-[400px] bg-linear-to-br from-0% from-[#EE6699] to-100% to-[#E69740] rounded-full absolute -left-1/12 -bottom-1/6 shadow-3xl"></div>
        </div>

        {/* login */}
        <div className="w-2/5 flex justify-center">
          <article className="bg-linear-to-b from-0 from-[#E08B2C] to-100% to-[#FFFFFF] w-[400px] h-[400px]  rounded-full inset-shadow-black/40 inset-shadow-sm flex flex-col items-center justify-center">
            <form className="w-5/6 h-4/6 flex flex-col justify-center gap-3">
              <h1 className="text-4xl text-center text-white">Admin Login</h1>

              <div>
                <label htmlFor="" className="text-white text-xl font-semibold">
                  Användarnamn
                </label>
                <span className="relative flex items-center">
                  <img className="absolute w-4" src={userIcon} alt="" />
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    className="px-6 border-b-1 border-[#E08B2C] text-white w-full h-full py-2 text-lg font-bold"
                    type="text"
                    name=""
                    id="username"
                  />
                </span>
              </div>

              <div>
                <label htmlFor="" className="text-white text-xl font-semibold">
                  Lösenord
                </label>
                <span className="relative flex items-center">
                    <img className="absolute w-4" src={passwordIcon} alt="" />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-6 border-b-1 border-[#E08B2C] text-[#E08B2C] w-full py-2 text-lg font-bold"
                    type="password"
                    name=""
                    id="password"
                  />
                </span>
                <h3>Glömt lösenord</h3>
              </div>

              <button
                type="button"
                onClick={() => handleSubmit()}
                className="bg-[#E08B2C] text-white font-bold text-lg px-4 py-1 w-fit mx-auto hover:bg-[#f69c34] cursor-pointer hover:rounded-2xl transition-all ease-in-out"
                
              >
                logga in
              </button>
            </form>
          </article>
        </div>
      </section>
    </section>
  );
};

export default Loginpage;
