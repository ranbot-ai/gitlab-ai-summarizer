/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getGoogleAccount } from "../../utils";
import GitLab from "./GitLab";

function AiSummarizer(porps: {
  token: string | undefined,
  setIsCopy: any,
  setScreenName: any,
  setErrorText: any,
  iisRef: any
}) {
  const { token, setIsCopy, setErrorText, iisRef } = porps;
  const [data, setData] = useState<GoogleAccountType | undefined>(undefined);

  useEffect(() => {
    if (token !== undefined) {
      const fetchGoogleAccount = async () => {
        try {
          const result = await getGoogleAccount(token);

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
  }, [token]);

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
      {data &&  <GitLab setIsCopy={setIsCopy} iisRef={iisRef} />}
    </div>
  );
}

export default AiSummarizer;
