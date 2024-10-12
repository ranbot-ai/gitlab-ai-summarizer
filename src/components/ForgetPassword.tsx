/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from "../assets/icons/logo.png";
import { RanBOT } from "../utils/common";
import { AI_EXT_STATUS } from "../utils/constants";
import OrDivider from "./OrDivider";
import { useState } from "react";
import Footer from "../containers/app/Footer";
import { isEmail } from "../utils/tools";

const ForgetPassword: React.FC<ScreenProps> = ({ setScreenName, setErrorText, setMessageText }) => {
  const [email, setEmail] = useState<string | undefined>(undefined);

  const openPage = (screenName: string) => { setScreenName(screenName) }

  const handleForgetPassword = () => {
    let hasError = false;
    if (!hasError && email === undefined) {
      setErrorText('Please enter email');
      hasError = true
    }
    if (!hasError && email && !isEmail(email)) {
      hasError = true;
      setErrorText('Invalid email address');
    }

    if (!hasError) {
      setScreenName(AI_EXT_STATUS.signin.code);
      setMessageText?.('Please check your email to reset password');
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
                Forgot your Password?
              </h1>
              <p className="subtitle has-text-left has-text-white mt-5">
                We’ll email you a secure link to reset your password
              </p>

              <>
                <div className="field" style={{marginTop: '2rem'}}>
                  <input
                    className="input is-rounded is-medium"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value) }
                  />
                </div>

                <div className="field" style={{marginTop: '4rem'}}>
                  <div className="control">
                    <button
                      className="button is-fullwidth has-text-white btn-bg-color"
                      onClick={() => handleForgetPassword() }
                    >
                      {AI_EXT_STATUS.reset_password.text}
                    </button>
                  </div>
                </div>
              </>

              <OrDivider />

              <div className="field mt-5 mb-5">
                <div className="control">
                  <button
                    className="button is-light is-fullwidth"
                    onClick={() => openPage(AI_EXT_STATUS.signin.code)}
                  >
                    <span>{AI_EXT_STATUS.signin.text}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default ForgetPassword;
