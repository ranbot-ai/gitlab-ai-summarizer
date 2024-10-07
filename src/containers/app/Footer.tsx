import { useEffect, useState } from "react";
import { getThemeColor } from "../../utils";
import { RanBOT } from "../../utils/common";
import { hexToRGB } from "../../utils/tools";
import { THEMECOLORS } from "../../utils/constants";

const Footer = () => {
  const [themeColor, setThemeColor] = useState<string | undefined>(THEMECOLORS[0]);

  useEffect(() => {
    const fetchThemeColor = async () => {
      setThemeColor(await getThemeColor());
    };

    fetchThemeColor()
  }, []);

  return (
    <footer
      style={{
        position: 'fixed',
        fontSize: '1rem',
        lineHeight: '25px',
        width: '100%',
        bottom: 0,
      }}
      className="has-text-centered"
    >
      <div className="p-4" style={{ backgroundColor: hexToRGB(themeColor, 0.8) }}>
        <p className="has-text-white">
          <strong className="has-text-white">RanBOT</strong> v{RanBOT?.version}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
