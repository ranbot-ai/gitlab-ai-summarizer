/* eslint-disable jsx-a11y/anchor-is-valid */
import { RanBOT } from "../../utils/common";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faGears, faSignOut } from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/icons/logo.png";

const Header = (props: {
  signOut: any,
  isCopy: boolean,
  iisRef: any
}) => {
  const { signOut, isCopy, iisRef } = props;

  const openChromeSettingPage = (): void => {
    chrome.runtime.sendMessage({ action: "openSettingPage" })
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand is-pulled-left">
        <a
          className="navbar-item ml-2"
          href="https://ranbot.online"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt={RanBOT.name} style={{ borderRadius: "50%" }} />
        </a>
      </div>

      <div className="is-pulled-right">
        {isCopy && <a
          style={{ marginTop: '5px' }}
          className="navbar-item is-size-5 is-pulled-left"
          onClick={() => navigator.clipboard.writeText(iisRef.innerText) }
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
