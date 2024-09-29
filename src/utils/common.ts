import manifest from "./../resources/manifest.json";

export const RanBOT = {
  name: manifest.name,
  version: manifest.version,
  author: manifest.author,
};

Object.assign(window, { RanBOT });
