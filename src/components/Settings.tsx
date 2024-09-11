/// <reference types="chrome"/>
/* eslint-disable jsx-a11y/anchor-is-valid */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGitlab } from "@fortawesome/free-brands-svg-icons";
import { useFormContext } from "../contexts/FormContext";
import { faCode } from "@fortawesome/free-solid-svg-icons";

function Settings() {
  const { formData, handleChange } = useFormContext();

  return (
    <>
      <div className="hero-body" style={{ alignItems: 'baseline' }}>
        <div className="container has-text-centered">
          <p className="title"> Settings </p>
          <hr />
          <br />

          <div>
            <div className="field is-horizontal">
              <div className="field-label">
                <label className="label has-text-white"> GitLab </label>
              </div>
              <div className="field-body">
                <div className="field is-expanded">
                  <div className="field has-addons">
                    <p className="control">
                      <a className="button is-static">
                        <FontAwesomeIcon icon={faGitlab} fontSize="24" />
                      </a>
                    </p>
                    <p className="control">
                      <a className="button is-static">
                        Web URL
                      </a>
                    </p>
                    <p className="control is-expanded">
                      <input
                        className="input" type="text" name="gitlab" placeholder="Your GitLab Web URL"
                        onChange={handleChange} value={formData.gitlab}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label"></div>
              <div className="field-body">
                <div className="field is-expanded">
                  <div className="field has-addons">
                    <p className="control">
                      <a className="button is-static">
                        <FontAwesomeIcon icon={faGitlab} fontSize="24" />
                      </a>
                    </p>
                    <p className="control">
                      <a className="button is-static">
                        API Version
                      </a>
                    </p>
                    <p className="control is-expanded">
                      <input
                        className="input" type="text" autoComplete="off" name="gitlabAPIVersion" placeholder="api/v4"
                        readOnly
                        onChange={handleChange} value={formData.gitlabAPIVersion}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label"></div>
              <div className="field-body">
                <div className="field is-expanded">
                  <div className="field has-addons">
                    <p className="control">
                      <a className="button is-static">
                        <FontAwesomeIcon icon={faGitlab} fontSize="24" />
                      </a>
                    </p>
                    <p className="control">
                      <a className="button is-static">
                        Access Token
                      </a>
                    </p>
                    <p className="control is-expanded">
                      <input
                        className="input" type="text" autoComplete="off" name="gitlabToken" placeholder="Personal Access Token (glpat-xxx)"
                        onChange={handleChange} value={formData.gitlabToken}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label">
                <label className="label has-text-white"> OpenAI Key (Paid) </label>
              </div>
              <div className="field-body">
                <div className="field is-expanded">
                  <div className="field has-addons">
                    <p className="control">
                      <a className="button is-static">
                        <FontAwesomeIcon icon={faCode} fontSize="24" />
                      </a>
                    </p>
                    <p className="control">
                      <a className="button is-static">
                        OpenAI API Key
                      </a>
                    </p>
                    <p className="control is-expanded">
                      <input
                        className="input" type="text" autoComplete="off" name="openAIKey" placeholder="OpenAI Access Token"
                        onChange={handleChange} value={formData.openAIKey}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <article className="message has-text-centered has-background-white has-text-black" style={{ marginBottom: '0px' }}>
        <div className="message-body has-background-white">
          <p>
            <strong>GitLab AI Summarizer</strong> by <a href="https://icmoc.com">Encore Shao</a>.

            If you have a idea? Please contact me (encore.shao[at]gmail.com).
          </p>
        </div>
      </article>
    </>
  );
}

export default Settings;
