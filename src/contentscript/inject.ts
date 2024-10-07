/* eslint-disable @typescript-eslint/no-use-before-define */
import { isGitLabIssuesPage, setStorage } from "../utils";
import extView from "../utils/extView";
import "../assets/styles/inject.css";

export {};

const currentTabUrl = window.document.URL;

console.log(`currentTabUrl: ${currentTabUrl}`);

if (isGitLabIssuesPage(currentTabUrl)) {
  extView.displayExtView();

  setStorage({ GASCurrentTabUrl: currentTabUrl }, () => {
    console.log("Current Tab URL:", currentTabUrl);
  });
}
