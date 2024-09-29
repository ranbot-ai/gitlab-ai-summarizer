import { getStorage } from './../../utils';
import { useEffect, useState } from 'react';

import SignIn from '../../components/SignIn';
import AiSummarizer from './AiSummarizer';

// import { RanBOT } from "../../utils/common";
import SignUp from '../../components/SignUp';

function AppIndex() {
  const [gasUserName, setGasUserName] = useState('');
  const [screenName, setScreenName] = useState('signin');

  useEffect(() => {
    getStorage(["gasUserName"], result => {
      result.gasUserName && setGasUserName(result.gasUserName);
    });
  }, []);

  return (
    <>
      {screenName === 'signin' &&
        <section className="hero is-info is-fullheight">

          <SignIn setScreenName={setScreenName}/>
        </section>
      }
      {screenName === 'signup' &&
        <section className="hero is-info is-fullheight">

          <SignUp setScreenName={setScreenName}/>
        </section>
      }
      {screenName === 'summarizer' &&
        <section className="hero is-info is-fullheight">
          <AiSummarizer gasUserName={gasUserName} />
        </section>
      }
    </>
  );
}

export default AppIndex;
