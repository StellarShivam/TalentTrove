import React, { useState } from "react";
import { Signup } from "../../components/sign-up-form/signup.component";
import SignIn from "../../components/sign-in/signin.component";
import "./authentication.css";

const Authentication = ({ role }) => {
  const [hasAccount, setHasAccount] = useState(false);

  const toggleHasAccount = (e) => {
    e.preventDefault();
    setHasAccount(!hasAccount);
  };
  console.log(role);
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

export default Authentication;
