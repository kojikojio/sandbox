import React from "react";
import FirebaseAuth from "react-firebaseui/FirebaseAuth";
import firebase from "firebase";

const uiConfig = {
  signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID]
};

const Login = () => {
  return (
    <>
      <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />{" "}
    </>
  );
};
export default Login;
