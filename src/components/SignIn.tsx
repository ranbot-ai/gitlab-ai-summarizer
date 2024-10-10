/* eslint-disable jsx-a11y/anchor-is-valid */
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/icons/logo.png";
import { RanBOT } from "../utils/common";
import { launchGoogleAuthentication } from "../utils";
import { AI_EXT_STATUS } from "../utils/constants";

const SignIn: React.FC<ScreenProps> = ({ setScreenName }) => {

  const openPage = (screenName: string) => { setScreenName(screenName) }

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
                Welcome to GitLab AI Summarizer
              </h1>

              <form
                id="loginForm"
                onSubmit={() => openPage(AI_EXT_STATUS.summarizer) }
                className="mt-5"
              >
                <div className="field">
                  <input
                    className="input is-rounded"
                    type="email"
                    placeholder="Email"
                    id="email"
                    required
                  />
                </div>

                <div className="field">
                  <input
                    className="input is-rounded"
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
                      className="button is-black is-fullwidth is-link"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </div>

                <p className="has-text-centered has-text-white">
                  Don't have an account?
                  <a onClick={() => openPage(AI_EXT_STATUS.signup) }>
                    {' '} Sign Up
                  </a>
                </p>
              </form>

              <div style={{display: 'flex', alignItems: 'center', margin: '20px 0'}}>
                  <div style={{flex: '1', height: '1px', backgroundColor: '#d9d9d9'}}></div>
                  <span className='has-text-white' style={{margin: '0 5px', fontSize: '1rem'}}> Or </span>
                  <div style={{flex: '1', height: '1px', backgroundColor: '#d9d9d9'}}></div>
              </div>

              <div className="field mb-5">
                <div className="control">
                  <button
                    className="button is-light is-fullwidth"
                    onClick={() => launchGoogleAuthentication()}
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faGoogle} />
                    </span>
                    <span>Sign In with Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
