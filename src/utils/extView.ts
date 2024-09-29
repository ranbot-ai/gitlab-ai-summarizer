/* eslint-disable eqeqeq */
/* eslint-disable import/no-anonymous-default-export */
const defaultTitle = "GitLab AI Summarizer";
const defaultLogoURL = "https://ranbot.online/assets/img/icon48.png";

const createExtView = (uri: string) => {
  let root = document.createElement("div");
  root.id = "ranbotGitLabAiSummarizer";
  root.className = "logoOnly";

  const iframe = document.createElement("iframe");
  iframe.src = chrome.runtime.getURL(`/packs/static/index.html?url=${uri}`);

  const headerRanbotLogo = document.createElement("img");
  headerRanbotLogo.id = "gitlabAISummarizerHeaderRanbotLogo";
  headerRanbotLogo.src = defaultLogoURL;
  headerRanbotLogo.alt = defaultTitle;

  headerRanbotLogo.addEventListener("click", () => {
    toggleExtView();
  });

  document.body.appendChild(root);
  root.appendChild(headerRanbotLogo);
  root.appendChild(iframe);
};

const displayExtView = (entryURL: string) => {
  let root = document.querySelector<HTMLDivElement>(
    "#ranbotGitLabAiSummarizer"
  );
  if (root) {
    if (root.classList.contains("logoOnly")) {
      root.classList.toggle("logoOnly");
    }
  } else {
    createExtView(entryURL);
  }
};

const toggleExtView = () => {
  let root = document.querySelector<HTMLDivElement>(
    "#ranbotGitLabAiSummarizer"
  );
  let body = document.querySelector<HTMLBodyElement>("body");
  let webRoot = document.documentElement;

  if (body) {
    // CSS: Transform for body has bad influence on our extension,
    getComputedStyle(body)["transform"] != "none"
      ? (body.style.transform = "none")
      : body.style.removeProperty("transform");

    getComputedStyle(body)["maxWidth"] != "none"
      ? (body.style.maxWidth = "none")
      : body.style.removeProperty("maxWidth");

    getComputedStyle(body)["filter"] != "none"
      ? (body.style.filter = "none")
      : body.style.removeProperty("filter");

    getComputedStyle(body)["perspective"] != "none"
      ? (body.style.perspective = "none")
      : body.style.removeProperty("perspective");

    getComputedStyle(webRoot)["perspective"] != "none"
      ? (webRoot.style.perspective = "none")
      : webRoot.style.removeProperty("perspective");
  }

  if (root) {
    root.classList.toggle("logoOnly");
  } else {
    let url = window.location.href.split(/[?#]/)[0];

    createExtView(url);
  }
};

const destroyExtView = () => {
  let root = document.querySelector<HTMLDivElement>(
    "#ranbotGitLabAiSummarizer"
  );
  if (root) {
    root.remove();
  }
};

export default {
  displayExtView,
  toggleExtView,
  destroyExtView,
};
