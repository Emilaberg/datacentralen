import React, { useState } from "react";
import { useAuth } from "../../../Auth/AuthProvider";
import webIcon from "../../../assets/icons/webIconSVG.svg";
import userIcon from "../../../assets/icons/user-solid.svg";
import passwordIcon from "../../../assets/icons/lock-solid.svg";
import { Link } from "react-router-dom";

const Loginpage = () => {
  const auth = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    try {
      auth.authenticate(username,password);
    } catch (error) {
      console.error("Login error:", error);
      setError("Fel användarnamn eller lösenord");
    }
  };

  return (
    <section className="bg-linear-to-br from-0% from-[#E08B2C] to-100% to-[#FF5BB5] w-full h-screen flex items-center justify-center ">
      <section className="relative bg-white h-1/2 w-[1200px] flex items-center shadow-2xl">
        <div className="relative w-1/2 h-full overflow-hidden">
          <img src={webIcon} alt="" className="relative z-20 w-60 mt-5 ml-10" />
          <div className="w-[750px] h-[750px] bg-linear-to-br from-0% from-[#EEB87D] to-70% to-[#FFAD53] rounded-full absolute right-10 bottom-1/3 shadow-2xl z-0 flex justify-center items-center">
            
          </div>
          
          <div className="w-[300px] h-[300px] bg-linear-to-br from-20% from-[#88B5E8] to-80% to-[#F67F99] rounded-full inset-shadow-sm inset-shadow-black/40 absolute right-1/12 top-1/2 -translate-y-1/2 z-10"></div>

          <div className="w-[400px] h-[400px] bg-linear-to-br from-0% from-[#EE6699] to-100% to-[#E69740] rounded-full absolute -left-1/12 -bottom-1/6 shadow-3xl"></div>
        </div>
        <div className="absolute left-1/6 top-1/5 z-100">
              <h1 className="relative right-1/6 text-5xl text-white font-bold">
                Välkommen
              </h1>
              <h1 className="relative left-1/6 text-5xl text-white font-normal">
                Tillbaka
              </h1>
            </div>
        {/* login */}
        <div className="w-1/2 flex justify-center">
          <article className="bg-linear-to-br from-10% from-[#E69740] to-100% to-[#EE6699] w-[500px] h-[500px]  rounded-full inset-shadow-black/40 inset-shadow-sm flex flex-col items-center justify-center">
            <form className="w-5/6 h-4/6 flex flex-col justify-center gap-3">
              <h1 className="text-4xl text-center text-white">Admin Login</h1>

              <div>
                <label htmlFor="" className="text-white text-xl font-normal">
                  Användarnamn
                </label>
                <span className="relative flex items-center">
                  <img
                    className="absolute w-4"
                    src={userIcon}
                    alt="User Icon"
                  />
                  <input
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className="px-6 border-b-2 border-white  text-white w-full h-full py-2 text-lg font-bold"
                    type="text"
                    id="username"
                  />
                  
                </span>
              </div>

              <div>
                <label htmlFor="" className="text-white text-xl font-normal">
                  Lösenord
                </label>
                <span className="relative flex items-center">
                  <img
                    className="absolute w-4"
                    src={passwordIcon}
                    alt="Password Icon"
                  />
                  <input
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-6 border-b-2 border-white text-[#E08B2C] w-full py-2 text-lg font-bold"
                    type="password"
                    id="password"
                  />
                </span>
                <div className="flex justify-end">
                  <Link to="password-reset" className="text-white font-semibold text-sm text-end hover:underline cursor-pointer">Glömt lösenord</Link>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-center text-sm mt-2">{error}</p>
              )}

              <button
                type="button"
                onClick={() => handleSubmit()}
                className="border-2 rounded-lg text-white font-bold text-lg px-6 py-1 w-fit mx-auto hover:bg-white/20 cursor-pointer hover:rounded-2xl transition-all ease-in-out"
                
              >
                Logga in
              </button>
            </form>
          </article>
        </div>
      </section>
    </section>
  );
};

export default Loginpage;
