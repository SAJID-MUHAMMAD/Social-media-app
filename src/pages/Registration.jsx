import React from "react";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="form-container">
        <p className=" text-lg text-center font-bold pb-3 ">
          Get started with easily register
        </p>
        <p className="font-normal text-xs text-center pb-12">
          Free register and you can enjoy it
        </p>
        <form className="form">
          <input type="email" className="input" placeholder="Email" />
          <input type="text" className="input" placeholder="Full Name" />
          <input type="password" className="input" placeholder="Password" />

          <button className="form-btn">Registration</button>
        </form>
        <p className="sign-up-label">
          Already have an account?
          <Link to="/login" className="sign-up-link pl-2">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Registration;
