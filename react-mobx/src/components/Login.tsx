import React from "react";
import FirebaseAuth from "react-firebaseui/FirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";

const uiConfig = {
  signInFlow: "redirect",
  signInSuccessUrl: "/todos",
  signInOptions: [
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};

const Login = () => {
  return (
    <div>
      <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};
export default Login;
