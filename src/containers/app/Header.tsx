/* eslint-disable jsx-a11y/anchor-is-valid */
import { RanBOT } from "../../utils/common";
import logo from "../../assets/icons/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faGears, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { AI_EXT_STATUS } from "../../utils/constants";

const Header = (props: {
  setGoogleAccessToken: any,
  setScreenName: any,
  isCopy: boolean
}) => {
  const { setGoogleAccessToken, setScreenName, isCopy } = props;

  const openChromeSettingPage = (): void => {
    chrome.runtime.sendMessage({ action: "openSettingPage" })
  }

  const signOut = (): void => {
    chrome.storage.sync.remove(["GASGoogleAccessToken"], () => {
      setGoogleAccessToken(undefined);
      setScreenName(AI_EXT_STATUS.signin);
    });
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand is-pulled-left">
        <a
          className="navbar-item is-size-5"
          href="https://ranbot.online"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt={RanBOT.name} style={{ borderRadius: "50%" }} />
          <strong>{RanBOT?.name}</strong>
        </a>
      </div>

      <div className="is-pulled-right">
        {isCopy && <a
          style={{ marginTop: '5px' }}
          className="navbar-item is-size-5 is-pulled-left"
        >
          <FontAwesomeIcon icon={faCopy} fontSize={'25px'} />
        </a>}

        <a
          style={{ marginTop: '5px' }}
          className="navbar-item is-size-5 is-pulled-left"
          onClick={() => openChromeSettingPage() }
        >
          <FontAwesomeIcon icon={faGears} fontSize={'25px'} />
        </a>

        <a
          style={{ marginTop: '5px' }}
          className="navbar-item is-size-5 is-pulled-left"
          onClick={() => signOut() }
        >
          <FontAwesomeIcon icon={faSignOut} fontSize={'25px'} />
        </a>
      </div>
    </nav>
  );
}

export default Header;
