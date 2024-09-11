import { isGitLabIssuesPage } from "../utils";

export {};

let personalOpenAIApiKey: string | undefined = undefined;
let personalGitLabApiKey: string | undefined = undefined;

// Send a message to the background script to retrieve the API key
chrome.runtime.sendMessage({ action: "getOpenAIApiKey" }, function (response) {
  if (response && response.openAIKey) {
    personalOpenAIApiKey = response.openAIKey;
  } else {
    console.log("No OpenAI API key found");
  }
});

chrome.runtime.sendMessage({ action: "getGitLabApiKey" }, function (response) {
  if (response && response.gitlabToken) {
    personalGitLabApiKey = response.gitlabToken;
  } else {
    console.log("No GitLab API key found");
  }
});

const defaultTitle = "GitLab AI Summarizer";
const defaultLogoURL = "https://ranbot.online/assets/img/icon48.png";

// Create a new div element
let aiSummarizer = document.createElement("div");
// Add styles to make it look like an icon
aiSummarizer.id = "gitlab-ai-summarizer";
aiSummarizer.style.position = "fixed";
aiSummarizer.style.top = "40%";
aiSummarizer.style.right = "20px";
aiSummarizer.style.zIndex = "10000";
aiSummarizer.style.cursor = "pointer";

let ranbotLogo = document.createElement("img");
ranbotLogo.src = defaultLogoURL;
ranbotLogo.alt = defaultTitle;
ranbotLogo.style.float = "left";

let closeIcon = document.createElement("span");
closeIcon.style.position = "absolute";
closeIcon.style.top = "10px";
closeIcon.style.right = "15px";
closeIcon.style.textTransform = "uppercase";
closeIcon.style.textDecoration = "underline";
closeIcon.innerText = " X ";

let progressInfo = document.createElement("span");
progressInfo.style.fontSize = "1.2rem";
progressInfo.style.lineHeight = "50px";
progressInfo.style.marginLeft = "10px";
progressInfo.innerText = "";

const closeEvent = () => {
  aiSummarizer.style.position = "fixed";
  aiSummarizer.style.top = "40%";
  aiSummarizer.style.right = "20px";
  aiSummarizer.style.width = "auto";
  aiSummarizer.style.backgroundColor = "transparent";
  aiSummarizer.style.padding = "none";
  aiSummarizer.style.borderRadius = "none";
  aiSummarizer.style.color = "none";

  // Reset progress message
  progressInfo.innerText = "";
  closeIcon.style.display = "none";
  progressInfo.style.display = "none";

  ranbotLogo.removeEventListener("click", aiSummarizerEvent, false);
  closeIcon.removeEventListener("click", closeEvent, false);

  document.getElementById(aiSummarizer.id)?.remove();
  setupRanBOT();
};

// Add a click event to do something when the icon is clicked
const aiSummarizerEvent = () => {
  aiSummarizer.style.top = "20px";
  aiSummarizer.style.width = "400px";
  aiSummarizer.style.backgroundColor = "rgb(128 128 128 / 80%)";
  aiSummarizer.style.padding = "10px";
  aiSummarizer.style.borderRadius = "10px";
  aiSummarizer.style.color = "white";
  aiSummarizer.style.fontWeight = "bold";

  if (personalOpenAIApiKey === undefined) {
    progressInfo.innerText = "OpenAI API not found. Please check your API key";
    progressInfo.style.fontSize = "0.75rem";
  } else if (personalGitLabApiKey === undefined) {
    progressInfo.innerText = "GitLab API not found. Please check your API key";
    progressInfo.style.fontSize = "0.75rem";
  } else {
    progressInfo.innerText = "Starting AI Summarizing...";
    progressInfo.style.fontSize = "1.2rem";
  }

  ranbotLogo.removeEventListener("click", aiSummarizerEvent, false);
  closeIcon.addEventListener("click", closeEvent, false);

  closeIcon.style.display = "inline-block";
  progressInfo.style.display = "inline-block";

  aiSummarizer.appendChild(progressInfo);
  aiSummarizer.appendChild(closeIcon);
};

const setupRanBOT = () => {
  ranbotLogo.addEventListener("click", aiSummarizerEvent, false);

  aiSummarizer.appendChild(ranbotLogo);
  document.body.appendChild(aiSummarizer);
};

if (isGitLabIssuesPage(document.URL)) {
  setupRanBOT();
}
