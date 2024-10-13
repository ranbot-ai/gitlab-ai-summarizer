/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getGoogleAccount, getUserAccount } from "../../utils";
import GitLab from "./GitLab";

function AiSummarizer(porps: {
  googleToken: string | undefined,
  userAccessToken: string | undefined,
  setIsCopy: any,
  setScreenName: any,
  setErrorText: any,
  iisRef: any
}) {
  const { googleToken, userAccessToken, setIsCopy, setErrorText, iisRef } = porps;
  const [data, setData] = useState<AccountType | undefined>(undefined);

  useEffect(() => {
    if (googleToken !== undefined) {
      const fetchGoogleAccount = async () => {
        try {
          const result = await getGoogleAccount(googleToken);

          if (result.error) {
            setErrorText(result.error.message);
          } else {
            setData(result); // Update the state with the fetched data
          }
        } catch (err: any) {
          setErrorText(err.message); // Handle error
        }
      };

      fetchGoogleAccount()
    }

    if (userAccessToken !== undefined) {
      const fetchUserAccount = async () => {
        try {
          const result = await getUserAccount(userAccessToken);

          // if (result.error) {
          //   setErrorText(result.error.message);
          // } else {
          //   setData(result); // Update the state with the fetched data
          // }
          setData(result);
        } catch (err: any) {
          setErrorText(err.message); // Handle error
        }
      };

      fetchUserAccount()
    }
  }, [googleToken, userAccessToken]);

  return (
    <div
      className="container m-5 p-5"
      style={{
        height: "calc(100vh - 133px)",
        width: "90%",
        backgroundColor: 'white',
        overflowY: 'scroll'
      }}
    >
      {data && <GitLab setIsCopy={setIsCopy} iisRef={iisRef} />}
    </div>
  );
}

export default AiSummarizer;
