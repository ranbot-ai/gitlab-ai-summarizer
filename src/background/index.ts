export {};
// import { version as manifestVersion } from "../manifest.json";

// chrome.storage.onChanged.addListener((changes, namespace) => {
//   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//     console.log(
//       `Storage key "${key}" in namespace "${namespace}" changed.`,
//       `Old value was "${oldValue}", new value is "${newValue}".`
//     );
//   }
// });

// chrome.storage.local.remove(
//   ["pinBookmarks", "backgroundUrl", "gitlab", "enabledGitlab"],
//   () => {}
// );

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getOpenAIApiKey") {
    // Retrieve the OpenAI API key from Chrome storage
    chrome.storage.sync.get("openAIKey", (result) => {
      sendResponse({ openAIKey: result.openAIKey });
    });
    return true; // This keeps the message channel open for the async response
  } else if (request.action === "getGitLabApiKey") {
    // Retrieve the gitlab API key from Chrome storage
    chrome.storage.sync.get("gitlabToken", (result) => {
      sendResponse({ gitlabToken: result.gitlabToken });
    });
    return true; // This keeps the message channel open for the async response
  } else if (request.action === "getGitLab") {
    // Retrieve the gitlab Web URL from Chrome storage
    chrome.storage.sync.get("gitlab", (result) => {
      sendResponse({ gitlab: result.gitlab });
    });
    return true; // This keeps the message channel open for the async response
  }
});
