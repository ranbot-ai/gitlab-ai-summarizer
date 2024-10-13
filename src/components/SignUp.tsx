/* eslint-disable jsx-a11y/anchor-is-valid */

import logo from "../assets/icons/logo.png";
import { RanBOT } from "../utils/common";

import { AI_EXT_STATUS } from "../utils/constants";
import OrDivider from "./OrDivider";
import GoogleAuthentication from "./GoogleAuthentication";
import Footer from "../containers/app/Footer";
import { useState } from "react";
import { isEmail } from "../utils/tools";

const SignUp: React.FC<ScreenProps> = ({ setScreenName, setErrorText, setUserAccessToken }) => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>(undefined);

  const openPage = (screenName: string) => { setScreenName(screenName) }

  const handleSignUp = () => {
    let hasError = false;
    if (!hasError && email === undefined) {
      setErrorText('Please enter email');
      hasError = true;
    }
    if (!hasError && email && !isEmail(email)) {
      hasError = true;
      setErrorText('Invalid email address');
    }
    if (!hasError && password === undefined) {
      setErrorText('Please enter password');
      hasError = true
    }
    if (!hasError && confirmPassword === undefined) {
      setErrorText('Please enter confirm password');
      hasError = true;
    }
    if (!hasError && password !== confirmPassword) {
      setErrorText('Passwords do not match');
      hasError = true;
    }

    if (!hasError) {
      setUserAccessToken?.('userToken');
      setScreenName(AI_EXT_STATUS.summarizer.code);
    }
  }

  return (
    <section className="section" style={{ height: "100%" }}>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-one-third">
            <div className="box p-5 wrap-bg-color" style={{ borderRadius: "50px" }}>
              <div className="has-text-centered">
                <img src={logo} alt={RanBOT.name} style={{ borderRadius: "50%" }} />
              </div>
              <h1 className="title has-text-centered has-text-white mt-5">
                {AI_EXT_STATUS.signup.text} to {RanBOT.name}
              </h1>

              <>
                <div className="field">
                  <input
                    className="input is-rounded is-medium"
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value) }
                  />
                </div>

                <div className="field">
                  <input
                    className="input is-rounded is-medium"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value) }
                  />
                </div>

                <div className="field">
                  <input
                    className="input is-rounded is-medium"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value) }
                  />
                </div>

                <div className="field mt-5">
                  <div className="control">
                    <label className="checkbox has-text-white">
                      <input type="checkbox" id="terms" />
                      {' '} I agree to RanBOT's {' '}
                      <a href="#" className="link-color">Terms of Use, and Privacy Policy</a>.
                    </label>
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <button
                      className="button is-fullwidth has-text-white btn-bg-color"
                      onClick={() => handleSignUp() }
                    >
                      {AI_EXT_STATUS.signup.text}
                    </button>
                  </div>
                </div>

                <p className="has-text-centered has-text-white">
                  Already have an account
                  <a
                    onClick={() => openPage(AI_EXT_STATUS.signin.code) }
                    className="link-color"
                  >
                    {' '} {AI_EXT_STATUS.signin.text}
                  </a>
                </p>
              </>

              <OrDivider />

              <GoogleAuthentication
                text={`${AI_EXT_STATUS.signup.text} with Google`}
                setScreenName={setScreenName}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default SignUp;
