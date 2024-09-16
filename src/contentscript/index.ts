/* eslint-disable no-script-url */
import {
  calculateTicketAge,
  getGitLabApiKey,
  getOpenAIApiKey,
  getThemeColor,
  isGitLabIssuesPage,
} from "../utils";
import {
  extractProjectPathAndIssueId,
  fetchIssueDetails,
  fetchIssueDiscussions,
  fetchLastMergeDetails,
  fetchLatestCommentURL,
  getProjectIdFromPath,
} from "../utils/gitlab";
import { fetchLLMResponse } from "../utils/llm";

export {};

const personalGitLabApiKey = await getGitLabApiKey();
const personalOpenAIApiKey = await getOpenAIApiKey();
const themeColor = await getThemeColor();
let startGitLabAPI: boolean = false;

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

let header = document.createElement("div");
header.style.width = "100%";
header.id = "gitlab-ai-summarizer_header";

let issueDetails = document.createElement("div");
issueDetails.id = "gitlab-ai-summarizer_details";
issueDetails.style.width = "100%";
issueDetails.style.backgroundColor = "rgb(255 255 255 / 80%)";
issueDetails.style.padding = "10px";
issueDetails.style.marginTop = "10px";
issueDetails.style.paddingBottom = "30px";
issueDetails.style.borderRadius = "10px";
issueDetails.style.maxHeight = "85vh";
issueDetails.style.overflowY = "scroll";

let headerRanbotLogo = document.createElement("img");
headerRanbotLogo.src = defaultLogoURL;
headerRanbotLogo.alt = defaultTitle;
headerRanbotLogo.style.float = "left";

let headerCloseIcon = document.createElement("span");
headerCloseIcon.style.position = "absolute";
headerCloseIcon.style.height = "40px";
headerCloseIcon.style.width = "40px";
headerCloseIcon.style.display = "inline-block";
headerCloseIcon.style.cursor = "point";
headerCloseIcon.style.top = "-15px";
headerCloseIcon.style.right = "-20px";
headerCloseIcon.innerHTML = `<svg width="30px" height="30px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#335475" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#335475CCCCCC" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#335475" stroke-width="1.5"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#335475" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>`;

let headerSettingIcon = document.createElement("span");
headerSettingIcon.style.position = "absolute";
headerSettingIcon.style.height = "30px";
headerSettingIcon.style.width = "30px";
headerSettingIcon.style.display = "inline-block";
headerSettingIcon.style.cursor = "point";
headerSettingIcon.style.top = "15px";
headerSettingIcon.style.right = "20px";
headerSettingIcon.innerHTML = `<svg width="40px" height="40px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2788 2.15224C13.9085 2 13.439 2 12.5 2C11.561 2 11.0915 2 10.7212 2.15224C10.2274 2.35523 9.83509 2.74458 9.63056 3.23463C9.53719 3.45834 9.50065 3.7185 9.48635 4.09799C9.46534 4.65568 9.17716 5.17189 8.69017 5.45093C8.20318 5.72996 7.60864 5.71954 7.11149 5.45876C6.77318 5.2813 6.52789 5.18262 6.28599 5.15102C5.75609 5.08178 5.22018 5.22429 4.79616 5.5472C4.47814 5.78938 4.24339 6.1929 3.7739 6.99993C3.30441 7.80697 3.06967 8.21048 3.01735 8.60491C2.94758 9.1308 3.09118 9.66266 3.41655 10.0835C3.56506 10.2756 3.77377 10.437 4.0977 10.639C4.57391 10.936 4.88032 11.4419 4.88029 12C4.88026 12.5581 4.57386 13.0639 4.0977 13.3608C3.77372 13.5629 3.56497 13.7244 3.41645 13.9165C3.09108 14.3373 2.94749 14.8691 3.01725 15.395C3.06957 15.7894 3.30432 16.193 3.7738 17C4.24329 17.807 4.47804 18.2106 4.79606 18.4527C5.22008 18.7756 5.75599 18.9181 6.28589 18.8489C6.52778 18.8173 6.77305 18.7186 7.11133 18.5412C7.60852 18.2804 8.2031 18.27 8.69012 18.549C9.17714 18.8281 9.46533 19.3443 9.48635 19.9021C9.50065 20.2815 9.53719 20.5417 9.63056 20.7654C9.83509 21.2554 10.2274 21.6448 10.7212 21.8478C11.0915 22 11.561 22 12.5 22C13.439 22 13.9085 22 14.2788 21.8478C14.7726 21.6448 15.1649 21.2554 15.3694 20.7654C15.4628 20.5417 15.4994 20.2815 15.5137 19.902C15.5347 19.3443 15.8228 18.8281 16.3098 18.549C16.7968 18.2699 17.3914 18.2804 17.8886 18.5412C18.2269 18.7186 18.4721 18.8172 18.714 18.8488C19.2439 18.9181 19.7798 18.7756 20.2038 18.4527C20.5219 18.2105 20.7566 17.807 21.2261 16.9999C21.6956 16.1929 21.9303 15.7894 21.9827 15.395C22.0524 14.8691 21.9088 14.3372 21.5835 13.9164C21.4349 13.7243 21.2262 13.5628 20.9022 13.3608C20.4261 13.0639 20.1197 12.558 20.1197 11.9999C20.1197 11.4418 20.4261 10.9361 20.9022 10.6392C21.2263 10.4371 21.435 10.2757 21.5836 10.0835C21.9089 9.66273 22.0525 9.13087 21.9828 8.60497C21.9304 8.21055 21.6957 7.80703 21.2262 7C20.7567 6.19297 20.522 5.78945 20.2039 5.54727C19.7799 5.22436 19.244 5.08185 18.7141 5.15109C18.4722 5.18269 18.2269 5.28136 17.8887 5.4588C17.3915 5.71959 16.7969 5.73002 16.3099 5.45096C15.8229 5.17191 15.5347 4.65566 15.5136 4.09794C15.4993 3.71848 15.4628 3.45833 15.3694 3.23463C15.1649 2.74458 14.7726 2.35523 14.2788 2.15224ZM12.5 15C14.1695 15 15.5228 13.6569 15.5228 12C15.5228 10.3431 14.1695 9 12.5 9C10.8305 9 9.47716 10.3431 9.47716 12C9.47716 13.6569 10.8305 15 12.5 15Z" fill="#fcfcfc"></path> </g></svg>`;

let headerCopyIcon = document.createElement("span");
headerCopyIcon.style.position = "absolute";
headerCopyIcon.style.height = "30px";
headerCopyIcon.style.width = "30px";
headerCopyIcon.style.display = "inline-block";
headerCopyIcon.style.cursor = "point";
headerCopyIcon.style.top = "20px";
headerCopyIcon.style.right = "60px";
headerCopyIcon.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=linear"> <g id="copy"> <path id="rec" d="M17.8333 18C20.1345 18 22 16.0972 22 13.75V5.25C22 2.90279 20.1345 1 17.8333 1H11.1667C8.86548 1 7 2.90279 7 5.25" stroke="#00ecfd" stroke-width="1.5" stroke-linecap="round"></path> <path id="rec_2" d="M2 10.25C2 7.90279 3.86548 6 6.16667 6H12.8333C15.1345 6 17 7.90279 17 10.25V18.75C17 21.0972 15.1345 23 12.8333 23H6.16667C3.86548 23 2 21.0972 2 18.75V10.25Z" stroke="#00ecfd" stroke-width="1.5"></path> </g> </g> </g></svg>`;

let progressInfo = document.createElement("span");
progressInfo.style.fontSize = "1.2rem";
progressInfo.style.lineHeight = "50px";
progressInfo.style.marginLeft = "10px";
progressInfo.innerText = "";

let versionNumber = document.createElement("div");
versionNumber.style.fontSize = "1rem";
versionNumber.style.lineHeight = "25px";
versionNumber.style.textAlign = "center";
versionNumber.innerText = `v0.0.2`;

const closeEvent = () => {
  aiSummarizer.style.position = "fixed";
  aiSummarizer.style.top = "40%";
  aiSummarizer.style.right = "20px";
  aiSummarizer.style.width = "auto";
  aiSummarizer.style.backgroundColor = "transparent";
  aiSummarizer.style.padding = "none";
  aiSummarizer.style.borderRadius = "none";
  aiSummarizer.style.color = "none";

  // Reset texts
  progressInfo.innerText = "";
  headerCopyIcon.innerHTML = "";
  headerCloseIcon.style.display = "none";
  progressInfo.style.display = "none";

  headerRanbotLogo.removeEventListener("click", aiSummarizerEvent, false);
  headerCloseIcon.removeEventListener("click", closeEvent, false);
  headerCopyIcon.removeEventListener("click", copyIconEvent, false);
  headerSettingIcon.removeEventListener("click", openSettingPageEvent, false);

  document.getElementById(issueDetails.id)?.remove();
  setupRanBOT();
};

const copyIconEvent = () => {
  navigator.clipboard.writeText(issueDetails.innerText);
  headerCopyIcon.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.43200000000000005"></g><g id="SVGRepo_iconCarrier"> <path d="M17.0998 2H12.8998C9.81668 2 8.37074 3.09409 8.06951 5.73901C8.00649 6.29235 8.46476 6.75 9.02167 6.75H11.0998C15.2998 6.75 17.2498 8.7 17.2498 12.9V14.9781C17.2498 15.535 17.7074 15.9933 18.2608 15.9303C20.9057 15.629 21.9998 14.1831 21.9998 11.1V6.9C21.9998 3.4 20.5998 2 17.0998 2Z" fill="#00ecfd"></path> <path d="M11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1V12.9C16 9.4 14.6 8 11.1 8ZM12.29 13.65L8.58 17.36C8.44 17.5 8.26 17.57 8.07 17.57C7.88 17.57 7.7 17.5 7.56 17.36L5.7 15.5C5.42 15.22 5.42 14.77 5.7 14.49C5.98 14.21 6.43 14.21 6.71 14.49L8.06 15.84L11.27 12.63C11.55 12.35 12 12.35 12.28 12.63C12.56 12.91 12.57 13.37 12.29 13.65Z" fill="#00ecfd"></path> </g></svg>`;
};

const openSettingPageEvent = () => {
  chrome.runtime.sendMessage({ action: "openSettingPage" });
};

const setupBlockStyle = (htmlSection: any) => {
  htmlSection.style.color = "black";
  htmlSection.style.paddingBottom = "0px";
  htmlSection.style.marginBottom = "5px";
  htmlSection.style.fontWeight = "normal";
};

// Add a click event to do something when the icon is clicked
const aiSummarizerEvent = async () => {
  aiSummarizer.style.top = "20px";
  aiSummarizer.style.width = "400px";
  aiSummarizer.style.backgroundColor = `${themeColor}`;
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
    progressInfo.innerText = `Start AI Summarizing...`;
    progressInfo.style.fontSize = "1.2rem";
    startGitLabAPI = true;
  }

  headerRanbotLogo.removeEventListener("click", aiSummarizerEvent, false);
  headerCloseIcon.addEventListener("click", closeEvent, false);

  headerCloseIcon.style.display = "inline-block";
  progressInfo.style.display = "inline-block";

  header.appendChild(progressInfo);
  header.appendChild(headerCloseIcon);

  if (startGitLabAPI) {
    const { projectPath, issueId } = extractProjectPathAndIssueId(document.URL);
    if (projectPath === undefined && issueId === undefined) {
      progressInfo.innerText = `This is not a GitLab URL.`;
      progressInfo.style.fontSize = "1.2rem";
    } else if (projectPath === undefined) {
      progressInfo.innerText = `Project '${projectPath}' not found.`;
      progressInfo.style.fontSize = "1.1rem";
    } else if (issueId === undefined) {
      progressInfo.innerText = `This is not a GitLab issue/task URL.`;
      progressInfo.style.fontSize = "1rem";
    } else {
      const projectId = await getProjectIdFromPath(document.URL);
      const issueData = await fetchIssueDetails(projectId, issueId);

      const ticketAge = calculateTicketAge(issueData.created_at);
      const lastUpdateDate = issueData.updated_at;
      const lastUpdateAge = calculateTicketAge(lastUpdateDate);
      const latestCommentUrl = await fetchLatestCommentURL(
        projectPath,
        projectId,
        issueId
      );
      const createdAt = new Date(issueData.created_at).toLocaleDateString();
      const lastUpdatedAt = new Date(lastUpdateDate).toLocaleString();

      // Display the issue age details
      let age = document.createElement("p");
      age.innerHTML = `<b>Age:</b> ${ticketAge} days. <em>${createdAt}</em>`;
      setupBlockStyle(age);
      issueDetails.appendChild(age);

      let lastUpdated = document.createElement("p");
      if (latestCommentUrl === undefined) {
        lastUpdated.innerHTML = `<b>Last Updated:</b> ${lastUpdateAge} days ago. <em>${lastUpdatedAt}</em>`;
      } else {
        lastUpdated.innerHTML = `<b>Last Updated:</b> <a href="${latestCommentUrl}" target="_blank">${lastUpdateAge} days ago</a>. <em>${lastUpdatedAt}</em>`;
      }
      setupBlockStyle(lastUpdated);
      issueDetails.appendChild(lastUpdated);

      let comments = document.createElement("p");
      comments.innerHTML = `<b>Comments:</b> ${issueData.user_notes_count}`;
      setupBlockStyle(comments);
      issueDetails.appendChild(comments);

      // Fetch the last commit details and display the branch name
      const lastMergeDetails = await fetchLastMergeDetails(projectId, issueId);
      let lastBranch = document.createElement("p");
      setupBlockStyle(lastBranch);
      if (lastMergeDetails) {
        lastBranch.innerHTML = `<b>Branch:</b> <a href="${lastMergeDetails.web_url}" target="_blank">${lastMergeDetails.target_branch}</a>`;
      } else {
        lastBranch.innerHTML = "<b>Last Commit:</b> N/A";
      }
      issueDetails.appendChild(lastBranch);
      aiSummarizer.appendChild(issueDetails);

      // Fetch the issue discussions
      const discussions = await fetchIssueDiscussions(projectId, issueId);

      // Call the LLM with the fetched GitLab data
      await fetchLLMResponse(issueDetails, issueData, discussions);

      headerCopyIcon.addEventListener("click", copyIconEvent, false);
      headerSettingIcon.addEventListener("click", openSettingPageEvent, false);

      header.appendChild(headerCopyIcon);
      header.appendChild(headerSettingIcon);

      progressInfo.innerText = `GitLab AI Summarizer`;
    }
  }
};

const setupRanBOT = () => {
  headerRanbotLogo.addEventListener("click", aiSummarizerEvent, false);

  header.appendChild(headerRanbotLogo);

  aiSummarizer.appendChild(header);
  document.body.appendChild(aiSummarizer);
};

if (isGitLabIssuesPage(document.URL)) {
  setupRanBOT();
}
