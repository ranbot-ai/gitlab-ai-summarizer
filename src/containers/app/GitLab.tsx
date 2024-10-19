/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { calculateTicketAge, getCurrentTabURL, getOpenAIApiKey, getThemeColor, openChromeSettingPage } from "../../utils";
import {
  extractProjectPathAndIssueId,
  fetchIssueDetails,
  fetchIssueDiscussions,
  getProjectIdFromPath
} from "../../utils/gitlab";
import { fetchLLMResponse } from "../../utils/llm";
import { RanBOT } from "../../utils/common";
import { MESSAGES } from "../../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const openAIApiKey = await getOpenAIApiKey();
const themeColor = await getThemeColor();
const currentTabURL = await getCurrentTabURL();

const GitLab = (props: {setIsCopy: any, iisRef: any}) => {
  const { setIsCopy, iisRef } = props;

  const [hasOpenaiKey, setHasOpenaiKey] = useState<boolean>(true);
  const [startGitLabAPI, setStartGitLabAPI] = useState<boolean>(false);
  const [progress, setProgress] = useState<string>('');

  const [projectId, setProjectId] = useState<string | undefined>(undefined);
  const [issueData, setIssueData] = useState<any>({});

  useEffect(() => {
    setProgress(RanBOT.name)

    const loadingExtensionSettings = async () => {
      if (openAIApiKey === undefined) {
        setProgress(MESSAGES.missing_openaikey)
        setHasOpenaiKey(false);
      } else {
        setProgress(MESSAGES.start_ai_summarizing)
        setStartGitLabAPI(true);
      }
    };

    loadingExtensionSettings()
  }, []);

  useEffect(() => {
    const loadingExtensionSettings = async () => {
      if (startGitLabAPI && currentTabURL && currentTabURL.startsWith('http')) {
        const { projectPath, issueId } = extractProjectPathAndIssueId(currentTabURL);
        if (projectPath === undefined && issueId === undefined) {
          setProgress(MESSAGES.not_gitlab_url);
        } else if (projectPath === undefined) {
          setProgress(`Project '${projectPath}' was not found.`);
        } else if (issueId === undefined) {
          setProgress(MESSAGES.not_task_url);
        } else {
          const gitlabProjectID = await getProjectIdFromPath(currentTabURL)

          if (gitlabProjectID === undefined) {
            setProgress(`Project '${projectPath}' was not found.`);
          } else {
            setProjectId(gitlabProjectID);

            const projectIssueData = await fetchIssueDetails(gitlabProjectID, issueId)
            setIssueData(projectIssueData);

            if (hasOpenaiKey) {
              // Fetch the issue discussions
              const discussions = await fetchIssueDiscussions(gitlabProjectID, issueId)

              // Call the LLM with the fetched GitLab data
              await fetchLLMResponse(iisRef, projectIssueData, discussions);
              // setIsCopy(true);
              setProgress('');
            }
          }

          setStartGitLabAPI(false);
        }
      }
    };

    loadingExtensionSettings()
  }, [startGitLabAPI]);

  return (
    <div
      className="container"
      id="gitlabAISummarizerDetails"
    >
      {<h2
        className="mb-2 has-text-centered"
        style={{ color: themeColor, fontSize: '1.2rem' }}
      >
        {progress}
      </h2>}

      {Object.keys(issueData).length > 0 && <>
        <div>
          {issueData.author && <p className="has-text-black">
            <b>Author:</b> <a href={issueData.author?.web_url} target="_blank">{issueData.author?.name}</a>
          </p>}
          {issueData.assignee && <p className="has-text-black">
            <b>Assignee:</b> <a href={issueData.assignee?.web_url} target="_blank">{issueData.assignee?.name}</a>
          </p>}
          {issueData.created_at && <p className="has-text-black">
            <b>Age:</b> {calculateTicketAge(issueData.created_at)} days. <em>{new Date(issueData.created_at).toLocaleDateString()}</em>
          </p>}
          {issueData.updated_at && <p className="has-text-black">
            <b>Last Updated:</b> {calculateTicketAge(issueData.updated_at)} days ago. <em>{new Date(issueData.updated_at).toLocaleDateString()}</em>
          </p>}
          {<p className="has-text-black">
            <b>Comments:</b> {issueData.user_notes_count}
          </p>}
        </div>

        <hr style={{marginBlockStart: '0.5em', marginBlockEnd: '0.5em'}}/>
        <div ref={iisRef}></div>
      </>}

      {!hasOpenaiKey && <div className="field" style={{marginTop: '4rem'}}>
        <div className="control has-text-centered">
          <p>
            <FontAwesomeIcon icon={faTriangleExclamation} fontSize={'5rem'}/>
          </p>

          <button
            className="button is-fullwidth has-text-white btn-bg-color"
            onClick={() => openChromeSettingPage() }
          >
            {MESSAGES.setup_openaikey}
          </button>
        </div>
      </div>}
    </div>
  );
}

export default GitLab;
