/* eslint-disable import/first */
export {};

// chrome.storage.onChanged.addListener((changes, namespace) => {
//   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//     console.log(
//       `Storage key "${key}" in namespace "${namespace}" changed.`,
//       `Old value was "${oldValue}", new value is "${newValue}".`
//     );
//   }
// });

// Utility function to retrieve a value from Chrome storage
const getFromStorage = (
  key: string,
  sendResponse: (response: any) => void,
  defaultValue: any = null
) => {
  chrome.storage.sync.get(key, (result) => {
    sendResponse({ [key]: result[key] || defaultValue });
  });
};

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const actionsMap: { [key: string]: { key: string; defaultValue?: any } } = {
    getOpenAIApiKey: { key: "GASOpenAIKey" },
    getGitLabApiKey: { key: "GASGitLabAccessToken" },
    getGoogleAccessToken: { key: "GASGoogleAccessToken" },
    getCurrentTabURL: { key: "GASCurrentTabUrl" },
    getGitLab: { key: "GASGitLab" },
    getThemeType: { key: "GASThemeType", defaultValue: "theme-green" },
    getThemeColor: { key: "GASThemeColor", defaultValue: "#000000" },
    getAiProvider: { key: "GASAiProvider", defaultValue: "openai" },
    getOpenAIModel: { key: "GASOpenaiModel", defaultValue: "gpt-4o" },
    getOllamaURL: {
      key: "GASOllamaURL",
      defaultValue: "http://localhost:11434",
    },
    getOllamaModel: { key: "GASOllamaModel", defaultValue: "llama3.1" },
  };

  const action = actionsMap[request.action];

  if (action) {
    getFromStorage(action.key, sendResponse, action.defaultValue);
    return true; // This keeps the message channel open for the async response
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openSettingPage") {
    chrome.tabs.create({
      url:
        "chrome-extension://" +
        chrome.runtime.id +
        "/packs/static/settings.html",
    });
  }
});
