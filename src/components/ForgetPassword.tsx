/* eslint-disable jsx-a11y/anchor-is-valid */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/icons/logo.png";
import { RanBOT } from "../utils/common";
import { AI_EXT_STATUS } from "../utils/constants";
import OrDivider from "./OrDivider";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const ForgetPassword: React.FC<ScreenProps> = ({ setScreenName }) => {

  const openPage = (screenName: string) => { setScreenName(screenName) }

  return (
    <section className="section" style={{ height: "100%" }}>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-one-third">
            <div className="box p-5 bg-2">
              <div className="has-text-centered">
                <img src={logo} alt={RanBOT.name} style={{ borderRadius: "50%" }} />
              </div>

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
                  <div className="control">
                    <button
                      className="button is-fullwidth btn-bg"
                      type="submit"
                    >
                      {AI_EXT_STATUS.reset_password.text}
                    </button>
                  </div>
                </div>
              </form>

              <OrDivider />

              <div className="field mb-5">
                <div className="control">
                  <button
                    className="button is-light is-fullwidth"
                    onClick={() => openPage(AI_EXT_STATUS.signin.code)}
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faBackward} />
                    </span>
                    <span>{AI_EXT_STATUS.signin.text}</span>
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

export default ForgetPassword;
