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

// chrome.storage.local.remove(
//   ["gitlab"],
//   () => {}
// );

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getOpenAIApiKey") {
    // Retrieve the OpenAI API key from Chrome storage
    chrome.storage.sync.get("openAIKey", (result) => {
      sendResponse({ openAIKey: result.openAIKey });
    });
  } else if (request.action === "getGitLabApiKey") {
    // Retrieve the gitlab API key from Chrome storage
    chrome.storage.sync.get("gitlabToken", (result) => {
      sendResponse({ gitlabToken: result.gitlabToken });
    });
  } else if (request.action === "getGitLab") {
    // Retrieve the gitlab Web URL from Chrome storage
    chrome.storage.sync.get("gitlab", (result) => {
      sendResponse({ gitlab: result.gitlab });
    });
  } else if (request.action === "getThemeColor") {
    chrome.storage.sync.get("themeColor", (result) => {
      sendResponse({ themeColor: result.themeColor || "#000000" });
    });
  }
  return true; // This keeps the message channel open for the async response
});
