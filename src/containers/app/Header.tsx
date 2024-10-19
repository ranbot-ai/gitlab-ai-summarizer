/* eslint-disable jsx-a11y/anchor-is-valid */
import { RanBOT } from "../../utils/common";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faGears, faSignOut } from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/icons/icon48.png";
import { AI_EXT_STATUS } from "../../utils/constants";
import { openChromeSettingPage } from "../../utils";

const Header = (props: {
  signOut: any,
  isCopy: boolean,
  iisRef: any,
  setScreenName: any
}) => {
  const { signOut, isCopy, iisRef, setScreenName } = props;

  const handleSignOut = (): void => {
    signOut();

    setScreenName(AI_EXT_STATUS.signin.code);
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation" style={{background: 'transparent'}}>
      <div className="navbar-brand is-pulled-left">
        <a
          className="navbar-item ml-2"
          href="https://ranbot.online"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt={RanBOT.name} style={{ borderRadius: "50%", marginLeft: '10px', marginTop: '10px' }} />
        </a>
      </div>

      <div className="is-pulled-right">
        {isCopy && <a
          style={{ marginTop: '15px' }}
          className="navbar-item is-size-5 is-pulled-left has-tooltip-arrow has-tooltip-info has-tooltip-left"
          data-tooltip="Copy it"
          onClick={() => navigator.clipboard.writeText(iisRef.innerText) }
        >
          <FontAwesomeIcon icon={faCopy} fontSize={'25px'} color="white" />
        </a>}

        <a
          style={{ marginTop: '15px' }}
          className="navbar-item is-size-5 is-pulled-left has-tooltip-arrow has-tooltip-info has-tooltip-left"
          data-tooltip="Open Settings Page"
          onClick={() => openChromeSettingPage() }
        >
          <FontAwesomeIcon icon={faGears} fontSize={'25px'} color="white" />
        </a>

        <a
          style={{ marginTop: '15px', marginRight: '20px' }}
          className="navbar-item is-size-5 is-pulled-left has-tooltip-arrow has-tooltip-info has-tooltip-left"
          data-tooltip="Sign Out"
          onClick={() => handleSignOut() }
        >
          <FontAwesomeIcon icon={faSignOut} fontSize={'25px'} color="white" />
        </a>
      </div>
    </nav>
  );
}

export default Header;
