import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Auth/AuthProvider";
import webIcon from "../../../assets/icons/webIconSVG.svg";
import userIcon from "../../../assets/icons/userIcon.svg";
import passwordIcon from "../../../assets/icons/passwordIcon.svg";

const Loginpage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError(""); // Reset error

    try {
      const response = await fetch("https://localhost:7033/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, password }),
      });

      if (!response.ok) {
        setError("Fel användarnamn eller lösenord");
        return;
      }

      const token = await response.text();
      // localStorage.setItem("token", token);
      auth.login({ email: username, password, token }); // Update auth state if you're using context

      console.log("✅ Token stored in localStorage:", token);
      navigate("/"); // Redirect to homepage or dashboard
    } catch (error) {
      console.error("Login error:", error);
      setError("Något gick fel. Försök igen senare.");
    }
  };

  return (
    <section className="bg-linear-to-br from-0% from-[#E08B2C] to-100% to-[#FF5BB5] w-full h-screen flex items-center justify-center">
      <section className="bg-white h-1/2 w-[1200px] flex items-center shadow-2xl">
        {/* Left Side Design */}
        <div className="relative w-3/5 h-full overflow-hidden">
          <img src={webIcon} alt="" className="relative z-20 w-60 mt-5 ml-10" />
          <div className="w-[750px] h-[750px] bg-gradient-to-br from-[#EEB87D] to-[#FFAD53] rounded-full absolute right-10 bottom-1/3 shadow-2xl z-0 flex justify-center items-center">
            <div className="mt-20">
              <h1 className="relative right-1/6 text-5xl text-white font-thin">
                Välkommen
              </h1>
              <h1 className="relative left-1/6 text-5xl text-white font-semibold">
                Tillbaka
              </h1>
            </div>
          </div>
          <div className="w-[300px] h-[300px] bg-gradient-to-br from-[#88B5E8] to-[#F67F99] rounded-full absolute right-1/12 top-1/2 -translate-y-1/2 z-10"></div>
          <div className="w-[400px] h-[400px] bg-gradient-to-br from-[#EE6699] to-[#E69740] rounded-full absolute -left-1/12 -bottom-1/6 shadow-3xl"></div>
        </div>

        {/* Login Form */}
        <div className="w-2/5 flex justify-center">
          <article className="bg-gradient-to-b from-[#E08B2C] to-[#FFFFFF] w-[400px] h-[400px] rounded-full inset-shadow-black/40 inset-shadow-sm flex flex-col items-center justify-center">
            <form
              className="w-5/6 h-4/6 flex flex-col justify-center gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <h1 className="text-4xl text-center text-white">Admin Login</h1>

              <div>
                <label
                  htmlFor="username"
                  className="text-white text-xl font-semibold"
                >
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
                    className="px-6 border-b-1 border-[#E08B2C] text-white w-full h-full py-2 text-lg font-bold bg-transparent outline-none"
                    type="text"
                    id="username"
                  />
                </span>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-white text-xl font-semibold"
                >
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
                    className="px-6 border-b-1 border-[#E08B2C] text-[#E08B2C] w-full py-2 text-lg font-bold bg-transparent outline-none"
                    type="password"
                    id="password"
                  />
                </span>
                <h3 className="text-white text-sm mt-1 cursor-pointer hover:underline">
                  Glömt lösenord?
                </h3>
              </div>

              {error && (
                <p className="text-red-500 text-center text-sm mt-2">{error}</p>
              )}

              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-[#E08B2C] text-white font-bold text-lg px-4 py-1 w-fit mx-auto hover:bg-[#f69c34] cursor-pointer hover:rounded-2xl transition-all ease-in-out"
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
