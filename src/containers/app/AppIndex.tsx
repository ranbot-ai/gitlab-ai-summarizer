import { getStorage } from './../../utils';
import { useEffect, useState } from 'react';

import AppLogin from '../../components/login/Index';
import AiSummarizer from './AiSummarizer';

function AppIndex() {
  const [gasUserName, setGasUserName] = useState('');

  useEffect(() => {
    getStorage(["gasUserName"], result => {
      result.gasUserName && setGasUserName(result.gasUserName);
    });
  }, []);

  return (
    <section
      className="hero is-info is-fullheight"
    >
      {gasUserName ?
        <AiSummarizer gasUserName={gasUserName} /> : <AppLogin />
      }
    </section>
  );
}

export default AppIndex;
