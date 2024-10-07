import { useEffect, useState } from "react";
import { getGoogleAccount } from "../../utils";

function AiSummarizer(porps: {
  token: string | undefined,
  setIsCopy: any
}) {
  const { token } = porps;

  const [data, setData] = useState<GoogleAccountType | undefined>(undefined);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token !== undefined) {
      const fetchGoogleAccount = async () => {
        try {
          const result = await getGoogleAccount(token);

          if (result.error) {
            setMessage(result.error.message);
          } else {
            setData(result); // Update the state with the fetched data
          }
        } catch (err: any) {
          setMessage(err.message); // Handle error
        }
        // finally {
        // }
      };

      fetchGoogleAccount()
    } else {
      setMessage("The token was not found!");
    }
  }, [token]);

  return (
    <div
      className="container m-5 p-3"
      style={{
        height: "calc(100vh - 54px)",
        width: "90%",
        backgroundColor: 'white'
      }}
    >
      {message && <h3>
        {message}
      </h3>}
      {!message && data && <>
        <h1 className="title has-text-centered mt-5">
          Hello! {data.name}
        </h1>
        <img
          src={data.picture}
          alt={data.name}
          style={{ borderRadius: "50%" }}
        />

        {JSON.stringify(data)}
      </>}
    </div>
  );
}

export default AiSummarizer;
