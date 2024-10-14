/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from "../assets/icons/logo.png";
import { RanBOT } from "../utils/common";
import { AI_EXT_STATUS, MESSAGES } from "../utils/constants";
import OrDivider from "./OrDivider";
import GoogleAuthentication from "./GoogleAuthentication";
import Footer from "../containers/app/Footer";
import { useState } from "react";
import { isEmail } from "../utils/tools";
import { setStorage } from "../utils";

const SignIn: React.FC<ScreenProps> = ({ setScreenName, setErrorText, setUserAccessToken }) => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const openPage = (screenName: string) => { setScreenName(screenName) }

  const handleSignIn = () => {
    let hasError = false;
    if (!hasError && email === undefined) {
      hasError = true;
      setErrorText(MESSAGES.missing_email);
    }
    if (!hasError && email && !isEmail(email)) {
      hasError = true;
      setErrorText(MESSAGES.invalid_email);
    }
    if (!hasError && password === undefined) {
      hasError = true;
      setErrorText(MESSAGES.missing_password);
    }

    if (!hasError) {
      const newUserToken = 'userToken';

      setStorage({ GASUserAccessToken: newUserToken }, () => {
        setUserAccessToken?.(newUserToken);
      });
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
                Welcome to {RanBOT.name}
              </h1>

              <>
                <div className="field">
                  <input
                    className="input is-rounded is-medium"
                    type="email"
                    placeholder="Email"
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
                      onClick={() => handleSignIn() }
                    >
                      {AI_EXT_STATUS.signin.text}
                    </button>
                  </div>
                </div>

                <p className="has-text-centered has-text-white">
                  Don't have an account?
                  <a
                    onClick={() => openPage(AI_EXT_STATUS.signup.code) }
                    className="link-color"
                  >
                    {' '} {AI_EXT_STATUS.signup.text}
                  </a>
                </p>
              </>

              <OrDivider />

              <GoogleAuthentication
                text={`${AI_EXT_STATUS.signin.text} with Google`}
                setScreenName={setScreenName}
              />

              <p className="has-text-centered has-text-white">
                <a
                  onClick={() => openPage(AI_EXT_STATUS.forget_password.code) }
                  className="link-color"
                >
                  {AI_EXT_STATUS.forget_password.text}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default SignIn;
