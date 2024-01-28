import React, { useEffect, useState } from "react";
import { login } from "../services/AuthReq";
import { PiEyeClosedBold } from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import styles from "./styles/Login.module.css";
import './styles/interactive.css'
import './styles/Login.css'
import Bracket from "./Bracket";
import bracket from './bracket.png'

const Login = () => {
  function getCssPosition(x, y, offsetXPercent, offsetYPercent) {
    // Convert percentage offsets to pixel values
    const offsetX = (offsetXPercent / 100) * window.innerWidth;
    const offsetY = (offsetYPercent / 100) * window.innerHeight;
  
    // Calculate CSS values
    const topValue = y - offsetY + 'px';
    const rightValue = x - offsetX + 'px';
  
    // Return an object with the calculated values
    return { right: rightValue, top: topValue };
  }
  
  const [position, setPosition] = useState({ right: 0, top: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });
  // number between 1 and 50
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const move = () => {
     requestAnimationFrame(move);
   };

    window.addEventListener('mousemove', event => {
      setPosition(getCssPosition(event.clientX, event.clientY, 60, 110));
    });

   move();

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, [target]);
  

  const [loginFailed, setLoginFailed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [pass, setPass] = useState("");

  
  const updateProgress = () => {
    setProgress(identifier.length + pass.length) ;
  }

  useEffect(() => {
    updateProgress();
  }, [identifier, pass]);
  
  const onSubmit = async () => {
    console.log("identifier", identifier)
    console.log("pass", pass)
    localStorage.setItem("user", "");
    const userToken = await login(identifier, pass);
    if (identifier && pass && userToken) {
      localStorage.setItem("user", userToken);
      window.location.href = "/dashboard";
    } else {
      setLoginFailed(true);
      setPass("");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    
    <div className={styles.login}>
    <div
      className="interactive"
      style={{
        position: 'absolute',
        left: position.right,
        top: position.top,
      }}
    />
    <div className="fill" style={{transition: "all 0.6s ease-in-out", position: "absolute", display: "flex", height: "100%", color: "black", filter: "blur(10px)", width: `${progress}%`}}></div>
    <div className="fill" style={{transition: "all 0.6s ease-in-out", position: "absolute", display: "flex", height: "100%", color: "black", filter: "blur(10px)", width: `${progress}%`, alignSelf: "end"}}></div>
    <img className={styles.img} src={bracket} alt="failed to load"></img>
    <div className={styles.container}>
      <div className={styles.header}>Administrator Login</div>
      <div className={styles[`login-form`]}>
      {loginFailed && <div className={styles[`failed-login`]}>Wrong username or password!</div>}
      <div className={styles[`input-wrapper`]}>
      <input
        autoComplete="new-password"
        type="text"
        placeholder="username or email"
        value={identifier}
        onChange={(e) => {
          setIdentifier(e.target.value);
          console.log(e.target.value)
          updateProgress();
        }}
      />
      </div>
      <div className={styles[`input-wrapper`]}>
        <input
        autoComplete="new-password"
          type={showPassword ? "text" : "password"}
          placeholder="password"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
            console.log(e.target.value)
            updateProgress();
          }}
        />
        {showPassword ? (
          <FaEye onClick={toggleShowPassword} id="icon"/>
        ) : (
          <PiEyeClosedBold onClick={toggleShowPassword} id="icon"/>
        )}
      </div>
      <button className={styles[`login-btn`]}onClick={onSubmit} onMouseEnter={() => setProgress(50)} onMouseLeave={()=> updateProgress()}>Login</button>
      </div>
      </div>
    </div>
    </>
  );
};

export default Login;
