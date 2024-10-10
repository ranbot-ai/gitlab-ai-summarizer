import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { launchGoogleAuthentication } from "../utils";

const GoogleAuthentication = (props: { text: string }) => {
  const { text } = props;

  return (
    <div className="field mb-5">
      <div className="control">
        <button
          className="button is-light is-fullwidth"
          onClick={() => launchGoogleAuthentication()}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faGoogle} />
          </span>
          <span>{text}</span>
        </button>
      </div>
    </div>
  );
}

export default GoogleAuthentication;
