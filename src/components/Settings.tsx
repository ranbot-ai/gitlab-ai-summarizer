/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="chrome"/>
/* eslint-disable jsx-a11y/anchor-is-valid */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGitlab } from "@fortawesome/free-brands-svg-icons";
import { useFormContext } from "../contexts/FormContext";
import { setStorage } from "../utils";
import { useEffect, useState } from "react";


function Settings() {
  const { formData, handleChange } = useFormContext();
  const themeColors = [
    '#000000',
    '#d99530',
    '#1f75cb',
    '#ff362c',
    '#647e0e',
    '#155635',
    '#0e4328',
    '#0e4d8d',
    '#0b2640',
    '#41419f',
    '#222261',
    '#ececef',
    '#28272d',
    '#a02e1c'
  ]
  const [pickedThemeColor, setPickedThemeColor] = useState(themeColors[0]);

  useEffect(() => {
    setPickedThemeColor(formData.themeColor)
  }, [])

  useEffect(() => {
    setStorage({ themeColor: pickedThemeColor }, () => {
      formData.themeColor = pickedThemeColor;
    });
  }, [pickedThemeColor])

  const eyeDropper = async (event: any): Promise<void> => {
    setTimeout(async () => {
      try {
        const eyeDropper = new (window as any).EyeDropper();
        const { sRGBHex }: { sRGBHex: string } = await eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex);

        if (event.target && event.target.style) {
          event.target.style.backgroundColor = sRGBHex;
          const inputBox = event.target
            .closest(".ai-theme-color")
            .querySelector("input");
          inputBox.value = sRGBHex;
        }
      } catch (error) {
        console.log("Error! Color code is not picked");
      }
    }, 10);
  };

  const updateThemeColor = (event: any) => {
    if (event) {
      const themeColor = event.target.style.backgroundColor;

      setPickedThemeColor(themeColor)
    }
  };

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
                <label className="label has-text-white"> AI Provider </label>
              </div>
              <div className="field-body">
                <div className="field is-expanded">
                  <div className="field has-addons">
                    <p className="control">
                      <a className="button is-static">
                        OpenAI / Ollama
                      </a>
                    </p>
                    <div className="select is-expanded">
                      <select onChange={handleChange} style={{ minWidth: '200px' }} defaultValue={formData.aiProvider}>
                        <option value={'openai'}>OpenAI</option>
                        <option value={'ollama'}>Ollama</option>
                      </select>
                    </div>
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
                        OpenAI Key
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

            <div className="field is-horizontal">
              <div className="field-label">
                <label className="label has-text-white"> Ollama URL </label>
              </div>
              <div className="field-body">
                <div className="field is-expanded">
                  <div className="field has-addons">
                    <p className="control">
                      <a className="button is-static">
                        Ollama URL
                      </a>
                    </p>
                    <p className="control is-expanded">
                      <input
                        className="input" type="text" autoComplete="off" name="ollamaURL" placeholder="URL of the Ollama server (e.g. http://localhost:11434)"
                        onChange={handleChange} value={formData.ollamaURL}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label">
                <label className="label has-text-white"> Theme Color </label>
              </div>
              <div className="field-body">
                <div className="field is-expanded">
                  <div className="field has-addons ai-theme-color">
                    <p className="control">
                      <span
                        className="button"
                        style={{
                          backgroundColor: pickedThemeColor,
                          display: 'inline-block',
                          height: '40px',
                          width: '40px',
                          cursor: 'pointer',
                          borderRadius: '5px'
                        }}
                        onClick={(event) => eyeDropper(event)}
                      />
                    </p>
                    <p className="is-expanded">
                      <input
                        className="input" type="text" autoComplete="off" name="themeColor" style={{ width: '250px' }}
                        onChange={handleChange} value={pickedThemeColor}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label">
                <label className="label has-text-white"> </label>
              </div>
              <div className="field-body">
                <div className="field is-expanded">
                  <div className="field has-addons">
                    <div>
                      <div>
                        {themeColors.map((color, index) => (
                          <span
                            key={`color-${index}`}
                            className="button"
                            style={{
                              backgroundColor: color,
                              display: 'inline-block',
                              height: '40px',
                              width: '40px',
                              cursor: 'pointer',
                              marginRight: '5px',
                              borderRadius: '5px'
                            }}
                            onClick={(event) => updateThemeColor(event)}
                          />
                        ))}
                      </div>
                    </div>
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
