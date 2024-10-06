/* eslint-disable jsx-a11y/anchor-is-valid */
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/icons/logo.png";
import { RanBOT } from "../utils/common";
import { launchGoogleAuthentication } from "../utils";

const SignIn: React.FC<ScreebProps> = ({ setScreenName }) => {

  const openSignUpPage = () => {
    setScreenName('signup')
  }

  const ranbotLogin = () => {
    setScreenName('summarizer')
  }

  return (
    <section className="section" style={{ height: "100%" }}>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-one-third">
            <div className="box p-5 has-background-grey">
              <div className="has-text-centered">
                <img src={logo} alt={RanBOT.name} style={{ borderRadius: "50%" }} />
              </div>
              <h1 className="title has-text-centered has-text-white mt-5">
                Log in to your account
              </h1>
              <p className="subtitle has-text-centered has-text-white mt-5">
                Please enter your details to proceed.
              </p>

              <form id="loginForm" onSubmit={() => ranbotLogin() }>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      placeholder="Your email address"
                      id="email"
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      placeholder="Your password"
                      id="password"
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <label className="checkbox" style={{ lineHeight: '1.5rem' }}>
                      <input type="checkbox" id="terms" />
                      {' '} By signing up, you agree to our
                      <a href="#"> Terms, Data Policy, and Cookies Policy</a>.
                    </label>
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <button
                      className="button is-black is-fullwidth is-link"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <button
                      className="button is-light is-fullwidth"
                      id="googleSignIn"
                      onClick={() => launchGoogleAuthentication() }
                    >
                      <span className="icon">
                        <FontAwesomeIcon icon={faGoogle} />
                      </span>
                      <span>Sign In with Google</span>
                    </button>
                  </div>
                </div>

                <p className="has-text-centered">
                  Don't have an account?
                  <a onClick={() => openSignUpPage() }>
                    {' '} Sign Up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
