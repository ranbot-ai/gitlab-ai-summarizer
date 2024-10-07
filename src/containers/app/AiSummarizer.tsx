import { useEffect, useState } from "react";
import { getGoogleAccount, launchGoogleAuthentication } from "../../utils";
import GitLab from "./GitLab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function AiSummarizer(porps: {
  token: string | undefined,
  setIsCopy: any
}) {
  const { token } = porps;

  const [data, setData] = useState<GoogleAccountType | undefined>(undefined);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token !== undefined) {
      const fetchGoogleAccount = async () => {
        try {
          const result = await getGoogleAccount(token);

          if (result.error) {
            setError(result.error.message);
          } else {
            setData(result); // Update the state with the fetched data
          }
        } catch (err: any) {
          setError(err.message); // Handle error
        }
      };

      fetchGoogleAccount()
    } else {
      setError("The token was not found!");
    }
  }, [token]);

  return (
    <div
      className="container m-5 p-3"
      style={{
        height: "calc(100vh - 133px)",
        width: "90%",
        backgroundColor: 'white',
        overflowY: 'scroll'
      }}
    >
      {error && <h3 className="has-text-black" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
        {error}

        <br />

        <button
          className="button is-light is-fullwidth"
          id="googleSignIn"
          onClick={() => launchGoogleAuthentication()}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faGoogle} />
          </span>
          <span>Re-authenticate with Google</span>
        </button>
      </h3>}
      {!error && data &&  <GitLab />}
    </div>
  );
}

export default AiSummarizer;
