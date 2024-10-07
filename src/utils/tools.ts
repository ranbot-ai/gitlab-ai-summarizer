const hexToRGB = (
  hex: string | undefined,
  opacity: number | undefined
): string => {
  if (hex !== undefined) {
    // Remove the leading hash if it's there
    hex = hex.replace(/^#/, "");

    // Parse the 6-digit hex value
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    if (opacity === undefined) opacity = 1;
    // Return the RGB value
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  } else {
    return "";
  }
};

export { hexToRGB };
