// flow
import React, { useEffect, useState } from "react";
import { login } from "../services/AuthReq";

//styles
import styles from "./styles/Login.module.css";
import './styles/interactive.css'
import './styles/Login.css'

//components
import { PiEyeClosedBold } from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import bracket from './assets/bracket.png'
import Logo from "./assets/logo-text.svg";

const Login = () => {
  // interaction state variables
    // mouse interaction - position of glow
  const [position, setPosition] = useState({ right: 0, top: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });
    // number between 1 and 50
    // used to determine and set width of progress bars
  const [progress, setProgress] = useState(0);

  // form state variables
  const [loginFailed, setLoginFailed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState(localStorage.getItem("email")? localStorage.getItem("email") : "");
  const [pass, setPass] = useState("");

  //loading state variable
  const [loading, setLoading] = useState(false);
  

  //ui functions
    // mouse interaction - translate x,y values to css positon (top, left) values.
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
    // input form progress bar interaction.
    // updates progress bar based on length of username and password
  function updateProgress(){
    setProgress((identifier.length + pass.length)*0.8) ;
  }
    // toggles password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

    // useEffects
      // mouse interaction
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
      // input form progress bar interaction
  useEffect(() => {
    updateProgress();
  }, [identifier, pass]);
  
  //backend functions
    // login function
  const onSubmit = async () => { 
    setLoading(true); 
    localStorage.removeItem("email");
    localStorage.setItem("user", "");
    const userToken = await login(identifier, pass);
    if (identifier && pass && userToken) {
      localStorage.setItem("user", userToken);
      window.location.href = "/dashboard";
    } else {
      updateProgress();
      setLoginFailed(true);
      setPass("");
      setLoading(false);
    }
  };



  return (
  
    
    <div className={styles.login}>
      {/*mouse interaction glow*/}
      <div
        className="interactive"
        style={{
          position: 'absolute',
          left: position.right,
          top: position.top,
        }}
      />

      {/*input field progress bar interaction glow*/}
      <div className="fill" style={{transition: "all 0.6s ease-in-out", position: "absolute", display: "flex", height: "100%", color: "black", filter: "blur(10px)", width: `${progress}%`}}></div>
      <div className="fill" style={{transition: "all 0.6s ease-in-out", position: "absolute", display: "flex", height: "100%", color: "black", filter: "blur(10px)", width: `${progress}%`, alignSelf: "end"}}></div>
      <div className="fill" style={{transition: "all 0.6s ease-in-out", position: "absolute", display: "flex", height: "100%", color: "black", filter: "blur(10px)", width: `${progress}%`}}></div>
      <div className="fill" style={{transition: "all 0.6s ease-in-out", position: "absolute", display: "flex", height: "100%", color: "black", filter: "blur(10px)", width: `${progress}%`, alignSelf: "end"}}></div>
      
      {/*background image*/}
      <img className={styles.img} src={bracket} alt="failed to load background"></img>

      {/*login form, foreground container*/}
      <div className={styles.container}>
        {/*container header*/}
        <div className={styles.header}>Administrator Login</div>
        {/*brand logo*/}
        <img style={{width: "150px", margin: "1rem"}}src={Logo} alt="logo"></img>

        {/*login form*/}
        <div className={styles[`login-form`]}>
          {/*login error message, conditionally rendered based on variable loginFailed*/}
          {loginFailed && <div className={styles[`failed-login`]}>Wrong username or password!</div>}

          {/*input fields*/}
          {/*identifier and pass state variables get updated on change*/}
          <div className={styles[`input-wrapper`]}>
          <input
            autoComplete="new-password"
            type="text"
            placeholder="Username or email"
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
              placeholder="Password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                console.log(e.target.value)
                updateProgress();
              }}
            />
            {/*password visibility toggle*/}
            {showPassword ? (
              <FaEye onClick={toggleShowPassword} id="icon"/>
            ) : (
              <PiEyeClosedBold onClick={toggleShowPassword} id="icon"/>
            )}
          </div>
          {/*login button*/}
          {/*onSubmit function called on click*/}
          <button className={styles[`login-btn`]}onClick={onSubmit} onMouseEnter={() => setProgress(50)} onMouseLeave={()=> updateProgress()}>Login</button>
          {/*bottom link - signup*/}
          <div className={styles[`bottom-link-container`]}>Don't have an account?  <strong><a style={{textDecoration:"underline"}} href="/signup" onClick={()=>localStorage.removeItem("email")}>Sign Up</a></strong></div>
        </div>
      </div>
    </div>
  
  );
};

export default Login;
