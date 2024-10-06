import manifest from "./../resources/manifest.json";

export const RanBOT = {
  name: manifest.name,
  version: manifest.version,
  author: manifest.author,
  appId: "gdfggopejkhjakbcmkejbpnhlfickdlc",
  googleAppClientId: manifest.oauth2.client_id,
  googleAppScopes: manifest.oauth2.scopes,
};

Object.assign(window, { RanBOT });
