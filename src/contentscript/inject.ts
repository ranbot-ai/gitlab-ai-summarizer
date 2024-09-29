import { isGitLabIssuesPage } from "../utils";
import extView from "../utils/extView";
import "../assets/styles/inject.css";

export {};

if (isGitLabIssuesPage(document.URL)) {
  extView.displayExtView(document.URL);
}
