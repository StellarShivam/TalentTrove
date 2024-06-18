import React, { useState } from "react";
import { Signup } from "../../components/sign-up-form/signup.component";
import SignIn from "../../components/sign-in/signin.component";
import "./authentication.css";
import { useParams } from "react-router-dom";

const SignAuthPreview = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const { role } = useParams();
  console.log(role);

  const toggleHasAccount = (e) => {
    e.preventDefault();
    setHasAccount(!hasAccount);
  };

  return (
    <>
      <div className="auth-container">
        {hasAccount ? (
          <SignIn toggleHasAccount={toggleHasAccount} />
        ) : (
          <Signup toggleHasAccount={toggleHasAccount} role={role} />
        )}
      </div>
    </>
  );
};

export default SignAuthPreview;
