/* eslint-disable no-script-url */
import {
  calculateTicketAge,
  getGitLabApiKey,
  getOpenAIApiKey,
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
issueDetails.style.borderRadius = "10px";
issueDetails.style.maxHeight = "90vh";
issueDetails.style.overflowY = "scroll";

let headerRanbotLogo = document.createElement("img");
headerRanbotLogo.src = defaultLogoURL;
headerRanbotLogo.alt = defaultTitle;
headerRanbotLogo.style.float = "left";

let headerCloseIcon = document.createElement("span");
headerCloseIcon.style.position = "absolute";
headerCloseIcon.style.top = "10px";
headerCloseIcon.style.right = "15px";
headerCloseIcon.style.textTransform = "uppercase";
headerCloseIcon.style.textDecoration = "underline";
headerCloseIcon.innerText = " X ";

let headerCopyIcon = document.createElement("span");
headerCopyIcon.style.height = "30px";
headerCopyIcon.style.width = "30px";
headerCopyIcon.style.display = "inline-block";
headerCopyIcon.style.cursor = "point";
headerCopyIcon.style.position = "absolute";
headerCopyIcon.style.top = "20px";
headerCopyIcon.style.right = "50px";
headerCopyIcon.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=linear"> <g id="copy"> <path id="rec" d="M17.8333 18C20.1345 18 22 16.0972 22 13.75V5.25C22 2.90279 20.1345 1 17.8333 1H11.1667C8.86548 1 7 2.90279 7 5.25" stroke="#00ecfd" stroke-width="1.5" stroke-linecap="round"></path> <path id="rec_2" d="M2 10.25C2 7.90279 3.86548 6 6.16667 6H12.8333C15.1345 6 17 7.90279 17 10.25V18.75C17 21.0972 15.1345 23 12.8333 23H6.16667C3.86548 23 2 21.0972 2 18.75V10.25Z" stroke="#00ecfd" stroke-width="1.5"></path> </g> </g> </g></svg>`;

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

  // Reset texts
  progressInfo.innerText = "";
  headerCopyIcon.innerHTML = "";
  headerCloseIcon.style.display = "none";
  progressInfo.style.display = "none";

  headerRanbotLogo.removeEventListener("click", aiSummarizerEvent, false);
  headerCloseIcon.removeEventListener("click", closeEvent, false);

  document.getElementById(issueDetails.id)?.remove();
  setupRanBOT();
};

const copyIconEvent = () => {
  navigator.clipboard.writeText(issueDetails.innerText);
  headerCopyIcon.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.43200000000000005"></g><g id="SVGRepo_iconCarrier"> <path d="M17.0998 2H12.8998C9.81668 2 8.37074 3.09409 8.06951 5.73901C8.00649 6.29235 8.46476 6.75 9.02167 6.75H11.0998C15.2998 6.75 17.2498 8.7 17.2498 12.9V14.9781C17.2498 15.535 17.7074 15.9933 18.2608 15.9303C20.9057 15.629 21.9998 14.1831 21.9998 11.1V6.9C21.9998 3.4 20.5998 2 17.0998 2Z" fill="#00ecfd"></path> <path d="M11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1V12.9C16 9.4 14.6 8 11.1 8ZM12.29 13.65L8.58 17.36C8.44 17.5 8.26 17.57 8.07 17.57C7.88 17.57 7.7 17.5 7.56 17.36L5.7 15.5C5.42 15.22 5.42 14.77 5.7 14.49C5.98 14.21 6.43 14.21 6.71 14.49L8.06 15.84L11.27 12.63C11.55 12.35 12 12.35 12.28 12.63C12.56 12.91 12.57 13.37 12.29 13.65Z" fill="#00ecfd"></path> </g></svg>`;
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
    progressInfo.innerText = `GitLab AI Summarizer`;

    headerCopyIcon.addEventListener("click", copyIconEvent, false);
    header.appendChild(headerCopyIcon);
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
