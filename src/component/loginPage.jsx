import React from "react";
import styles from "../CSS/Landing.module.css"
import googleLogoImg from "../asset/googleLogo.png"

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}&response_type=code&scope=email profile`;
  };

  return (
    <div>
      <div className={styles.loginButton} alt="" onClick={handleGoogleLogin}>
        <img className={styles.googleLogo} src={googleLogoImg}/>
      로그인
      </div>
      
    </div>
  );
};

export default GoogleLogin;