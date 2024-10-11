/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from "../assets/icons/logo.png";
import { RanBOT } from "../utils/common";
import { AI_EXT_STATUS } from "../utils/constants";
import OrDivider from "./OrDivider";
import GoogleAuthentication from "./GoogleAuthentication";

const SignIn: React.FC<ScreenProps> = ({ setScreenName }) => {

  const openPage = (screenName: string) => { setScreenName(screenName) }

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

              <form
                id="loginForm"
                onSubmit={() => openPage(AI_EXT_STATUS.summarizer.code) }
                className="mt-5"
              >
                <div className="field">
                  <input
                    className="input is-rounded is-medium"
                    type="email"
                    placeholder="Email"
                    id="email"
                    required
                  />
                </div>

                <div className="field">
                  <input
                    className="input is-rounded is-medium"
                    type="password"
                    placeholder="Password"
                    id="password"
                    required
                  />
                </div>

                <div className="field mt-5">
                  <div className="control">
                    <label className="checkbox has-text-white">
                      <input type="checkbox" id="terms" />
                      {' '} I agree to RanBOT's {' '}
                      <a href="#" className="is-link">Terms of Use, and Privacy Policy</a>.
                    </label>
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <button
                      className="button is-fullwidth btn-bg-color"
                      type="submit"
                    >
                      {AI_EXT_STATUS.signin.text}
                    </button>
                  </div>
                </div>

                <p className="has-text-centered has-text-white">
                  Don't have an account?
                  <a onClick={() => openPage(AI_EXT_STATUS.signup.code) }>
                    {' '} {AI_EXT_STATUS.signup.text}
                  </a>
                </p>
              </form>

              <OrDivider />

              <GoogleAuthentication
                text={`${AI_EXT_STATUS.signin.text} with Google`}
                setScreenName={setScreenName}
              />

              <p className="has-text-centered has-text-white">
                <a onClick={() => openPage(AI_EXT_STATUS.forget_password.code) }>
                  {AI_EXT_STATUS.forget_password.text}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
