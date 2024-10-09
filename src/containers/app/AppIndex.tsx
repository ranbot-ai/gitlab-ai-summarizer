/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { toast } from 'bulma-toast';

import { getGoogleAccessToken } from './../../utils';

import Header from './Header';
import Footer from './Footer';

import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import AiSummarizer from './AiSummarizer';

import { AI_EXT_STATUS } from '../../utils/constants';

import './../../assets/styles/inject.css';

const storageGoogleAccessToken = await getGoogleAccessToken();

function AppIndex() {
  const issueDetailsRef = useRef(null);
  const [isCopy, setIsCopy] = useState(false);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | undefined>(undefined);

  const [screenName, setScreenName] = useState(AI_EXT_STATUS.signin);
  const [errorText, setErrorText] = useState('');

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

  useEffect(() => {
    if (errorText !== '') {
      toast({
        message: errorText,
        type: 'is-danger',
        duration: 2000,
        position: 'top-left',
        pauseOnHover: true,
        animate: { in: 'fadeIn', out: 'fadeOut' },
      });

      signOut();
    }
  }, [errorText]);

  const signOut = (): void => {
    chrome.storage.sync.remove(["GASGoogleAccessToken"], () => {
      setGoogleAccessToken(undefined);
      setScreenName(AI_EXT_STATUS.signin);
    });
  }

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
          signOut={signOut}
          isCopy={isCopy}
          iisRef={issueDetailsRef}
        />

        <AiSummarizer
          token={googleAccessToken}
          setIsCopy={setIsCopy}
          setScreenName={setScreenName}
          setErrorText={setErrorText}
          iisRef={issueDetailsRef}
        />

        <Footer />
      </>}
    </>
  );
}

export default AppIndex;
