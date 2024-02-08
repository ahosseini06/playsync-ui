// flow
import React, { useEffect, useState } from "react";
import { register,isUsernameAvailable, isEmailAvailable } from "../services/AuthReq";


//styles
import styles from "./styles/Login.module.css";
import './styles/interactive.css'
import './styles/Login.css'

//components
import { PiEyeClosedBold } from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import bracket from './assets/bracket.png'
import Logo from "./assets/logo-text.svg";
import { Spinner } from '@chakra-ui/react'

const SignUp = () => {
  // interaction state variables
    // mouse interaction - position of glow
  const [position, setPosition] = useState({ right: 0, top: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });
    // number between 1 and 50
    // used to determine and set width of progress bars
  const [progress, setProgress] = useState(0);

  // form state variables
  const [errors, setErrors] = useState({name: "", username: "", email: "", password: "", passwordMatch: "", missing: ""});
  const [showPassword, setShowPassword] = useState(false);
  // from input field state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  // loading state variables
  const [loading, setLoading] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  
  const [accountExists, setAccountExists] = useState(false);

  //ui functions
    // mouse interaction - translate x,y values to css positon (object {top, left}) values.
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
    setProgress((password.length + email.length + name.length + username.length + confirmPassword.length)*0.4);
  }
    // toggles password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // form validation functions
  function isUsernameValid() {
    // Define a regular expression pattern for username validation.
    // no spaces or special characters
    const pattern = /^[a-zA-Z0-9]+$/;
    return pattern.test(username);
  }
  function isUsernameStringValid(username) {
    // Define a regular expression pattern for username validation.
    // no spaces or special characters
    const pattern = /^[a-zA-Z0-9]+$/;
    return pattern.test(username);
  }


  function isValidEmail() {
    // Define a regular expression pattern for email validation.
    // at least one character before @, at least one character between @ and .,
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
  function isValidPassword() {
    // Define a regular expression pattern for password validation.
    // at least one letter, at least one number, at least 8 characters
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return pattern.test(password);
  }
  function doPasswordsMatch(){
    // Define a regular expression pattern for password validation.
    // at least one letter, at least one number, at least 8 characters
    return password === confirmPassword;
  }

  async function usernameAvailable(){
    if(username.length > 0){
      setCheckingUsername(true);
      const res = await isUsernameAvailable(username);
      console.log('username availibility : ',res)
      setCheckingUsername(false);
      return res;
    }
    return true;
  }
  async function usernameStringAvailable(un){
    if(un.length > 0){
      setCheckingUsername(true);
      const res = await isUsernameAvailable(un);
      console.log('username availibility : ',res)
      setCheckingUsername(false);
      return res;
    }
    return true;
  }

  async function emailAvailable(){
    if(email.length > 0){;
      const res = await isEmailAvailable(email);
      console.log('email availibility : ',res)
      setCheckingUsername(false);
      return res;
    }
    return true;
  }



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
  }, [email, password, name, username, confirmPassword]);
  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        onSubmit();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);
  
  //backend functions
    // login function
  const onSubmit = async () => {

    setLoading(true);
    // check validity of all input fields
    if(await emailAvailable()===false){
      setLoading(false);
      setAccountExists(true);
    } else if(!username || !password || !email || !confirmPassword || !name){
      updateProgress();
      setErrors({email:"", password:"", username:"", passwordMatch:"", missing: "Please fill out all fields"});
      setLoading(false);
    } else if(isValidEmail() && isValidPassword() && isUsernameValid() && doPasswordsMatch() && await usernameAvailable()){
      // send request to backend
      console.log("all is valid")
      console.log(isValidEmail(), isValidPassword(), isUsernameValid(), doPasswordsMatch())
      const userToken = await register(username, email, password);
      localStorage.setItem("user", userToken);
      window.location.href = "/dashboard";
    }else{

    let newErrors = {...errors, missing: ""}; // create a copy of the current errors
      
      if(!isValidEmail()){
        newErrors.email = "Please enter a valid email";
      } else if(newErrors.email){
        newErrors.email = "";
        updateProgress();
      }

      if(!isValidPassword()){
        newErrors.password = "Password must be at least 8 characters long and contain at least one letter and one number";
      } else if(newErrors.password){
        newErrors.password = "";
        updateProgress();
      }

      if(!isUsernameValid()){
        newErrors.username = "Username must contain only letters and numbers";
      } else if(await usernameAvailable()===false){
        newErrors.username = "Username is already taken";
      }else if(newErrors.username){
        newErrors.username = "";
        updateProgress();
      }

      if(!doPasswordsMatch()){
        newErrors.passwordMatch = "Passwords do not match";
      } else if(newErrors.passwordMatch){
        newErrors.passwordMatch = "";
        updateProgress();
      }

      setLoading(false);
      setErrors(newErrors); // update the state once with the new errors
    } 
  };



  return (
  <>
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
      <div className={styles[`container-wide`]}>
        {/*container header*/}
        <div className={styles.header}>Administrator Registration</div>
        {accountExists? 
        <div className={styles[`bottom-link-container`]}>
          Looks like you already have an account!<strong><a style={{textDecoration:"underline"}} href="/login" onClick={()=> localStorage.setItem("email", email)}>Login?</a></strong> or <strong><a style={{textDecoration:"underline"}} href="/signup" onClick={()=> localStorage.removeItem('email')}>Sign up</a></strong>with a different email.
        </div>
        :
        <>
        {/*brand logo*/}
        <img style={{width: "150px", marginTop: "1rem"}}src={Logo} alt="logo"></img>
        
        {/*login form*/}
        <div className={styles[`signup-form`]}>
          {/*login error message, conditionally rendered based on variable loginFailed*/}
          
          {/*input fields*/}
          <div className={styles[`failed-login`]}>{errors.missing? errors.missing : ""}</div>
          <div className="row" style={{display: "flex", flexDirection:"row", gap: "1rem", width: "100%"}}>
            <div className={styles.wrapper}>
            <div>‎</div>
              <div className={styles[`input-wrapper`]}>
                <input
                  autoComplete="new-password"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    updateProgress();
                  }}
                />
              </div>
            </div>
            <div className={styles.wrapper}>
            <div className={styles[`failed-login`]}>{errors.email? errors.email : "‎ "}</div>
              <div className={styles[`input-wrapper`]}>
                <input
                  autoComplete="new-password"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    updateProgress();
                  }}
                />
              </div>
            </div>
          </div>

          <div className="row" style={{display: "flex", flexDirection:"row", gap: "1rem"}}>
            <div className={styles.wrapper}>
              <div className={styles[`input-wrapper`]}>
                <input
                  autoComplete="new-password"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={async(e) => {
                    setUsername(e.target.value);
                    updateProgress();
                    if(e.target.value.length > 0){
                      if(! (await usernameStringAvailable(e.target.value))){
                        setErrors({...errors, username: "Username is already taken"})
                      } else {
                        setErrors({...errors, username: ""})
                      }
                    }
                  }}
                />
              </div>
              {checkingUsername? 
              <Spinner style={{marginTop:"8px", alignSelf:"start"}} size="xs" color="white"/>
              :<div className={styles[`failed-login`]}>{errors.username? errors.username : "‎ "}</div>}
            </div>
          <div className={styles.wrapper}>
          
            <div className={styles[`input-wrapper`]}>
              <input
              autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
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
            <div className={styles[`failed-login`]}>{errors.password? errors.password : "‎ "}</div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles[`input-wrapper`]}>
                <input
                autoComplete="new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    updateProgress();
                  }}
                />
              </div>
              <div className={styles[`failed-login`]}>{errors.passwordMatch? errors.passwordMatch : "‎ "}</div>
            </div>
          </div>

          {/*login button*/}
          {/*onSubmit function called on click*/}
          {loading?
            <button className={styles[`signup-btn`]} ><Spinner/></button>
          :  <button className={styles[`signup-btn`]} onClick={onSubmit} onMouseEnter={() => setProgress(50)} onMouseLeave={()=> updateProgress()}>Create Account!</button>}
          {/*bottom link - login*/}
          <div className={styles[`bottom-link-container`]}>Already have an account?<strong><a style={{textDecoration:"underline"}} href="/login">Login</a></strong></div>
        
        </div>
        </>
        }
        
      </div>   
    </div>
          
  </>
  );
};

export default SignUp;
