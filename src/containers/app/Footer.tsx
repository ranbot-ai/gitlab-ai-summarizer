import { getThemeColor } from "../../utils";
import { RanBOT } from "../../utils/common";

const themeColor = await getThemeColor();

const Footer = () => {
  return (
    <footer
      style={{
        position: 'fixed',
        fontSize: '1rem',
        lineHeight: '25px',
        width: '100%',
        bottom: 0,
        backgroundColor: themeColor,
      }}
      className="has-text-centered"
    >
      <div className="p-4">
        <p className="has-text-white">
          <strong className="has-text-white">{RanBOT.name}</strong> v{RanBOT?.version}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
