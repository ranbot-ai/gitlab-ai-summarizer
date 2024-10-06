/* eslint-disable react-hooks/exhaustive-deps */
import { getGoogleAccessToken, getGoogleAccount } from './../../utils';
import { useEffect, useState } from 'react';

import SignIn from '../../components/SignIn';
import AiSummarizer from './AiSummarizer';

// import { RanBOT } from "../../utils/common";
import SignUp from '../../components/SignUp';

const googleAccessToken = await getGoogleAccessToken();

function AppIndex() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GoogleAccountType | null>(null);
  const [error, setError] = useState(undefined);

  const [screenName, setScreenName] = useState('signin');

  useEffect(() => {
    if (googleAccessToken) {
      const fetchData = async () => {
        try {
          setLoading(true); // Start loading
          setData(await getGoogleAccount(googleAccessToken)); // Update the state with the fetched data
          setScreenName('summarizer')
        } catch (err: any) {
          setError(err.message); // Handle error
        } finally {
          setLoading(false); // End loading
        }
      };

      fetchData()
    }
  }, [googleAccessToken]);

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
      {screenName === 'summarizer' && !loading &&
        <section className="hero is-info is-fullheight">
          <AiSummarizer data={data} err={error} />
        </section>
      }
    </>
  );
}

export default AppIndex;
