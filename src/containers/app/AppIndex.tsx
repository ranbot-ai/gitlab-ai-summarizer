/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { getGoogleAccessToken } from './../../utils';

import SignIn from '../../components/SignIn';
import AiSummarizer from './AiSummarizer';

import SignUp from '../../components/SignUp';

import { AI_EXT_STATUS } from '../../utils/constants';
import Header from './Header';
import Footer from './Footer';

import './../../assets/styles/inject.css';

const storageGoogleAccessToken = await getGoogleAccessToken();

function AppIndex() {
  const [isCopy, setIsCopy] = useState(false);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | undefined>(undefined);

  const [screenName, setScreenName] = useState(AI_EXT_STATUS.signin);

  useEffect(() => {
    if (googleAccessToken === undefined && storageGoogleAccessToken !== undefined) {
      setGoogleAccessToken(storageGoogleAccessToken);
    }
  }, []);

  useEffect(() => {
    if (googleAccessToken === undefined) {
      setScreenName(AI_EXT_STATUS.signin);
    } else {
      setScreenName(AI_EXT_STATUS.summarizer);
    }
  }, [googleAccessToken]);

  return (
    <>
      {screenName === AI_EXT_STATUS.signin &&
        <section className="hero is-info is-fullheight">

          <SignIn setScreenName={setScreenName}/>
        </section>
      }
      {screenName === AI_EXT_STATUS.signup &&
        <section className="hero is-info is-fullheight">

          <SignUp setScreenName={setScreenName}/>
        </section>
      }
      {screenName === AI_EXT_STATUS.summarizer && <>
        <Header
          setGoogleAccessToken={setGoogleAccessToken}
          setScreenName={setScreenName}
          isCopy={isCopy}
        />

        <AiSummarizer
          token={googleAccessToken}
          setIsCopy={setIsCopy}
        />

        <Footer />
      </>}
    </>
  );
}

export default AppIndex;
