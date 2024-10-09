/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

import { calculateTicketAge, getCurrentTabURL, getGitLabApiKey, getOpenAIApiKey, getThemeColor } from "../../utils";
import {
  extractProjectPathAndIssueId,
  fetchIssueDetails,
  fetchIssueDiscussions,
  getProjectIdFromPath
} from "../../utils/gitlab";
import { fetchLLMResponse } from "../../utils/llm";
import { RanBOT } from "../../utils/common";

const gitLabApiKey = await getGitLabApiKey();
const openAIApiKey = await getOpenAIApiKey();
const themeColor = await getThemeColor();
const currentTabURL = await getCurrentTabURL();

const GitLab = (props: {setIsCopy: any, iisRef: any}) => {
  const { setIsCopy, iisRef } = props;

  const [startGitLabAPI, setStartGitLabAPI] = useState<boolean>(true);
  const [progress, setProgress] = useState<string>('');

  const [projectId, setProjectId] = useState<string | undefined>(undefined);
  const [issueData, setIssueData] = useState<any>({});

  useEffect(() => {
    setProgress(RanBOT.name)
    const loadingExtensionSettings = async () => {
      if (gitLabApiKey === undefined) {
        setProgress(`GitLab access token was not found.`)
      } else if (openAIApiKey === undefined) {
        setProgress(`OpenAI key was not found.`)
      } else {
        setProgress(`Start AI Summarizing...`)
      }
    };

    loadingExtensionSettings()
  }, []);

  useEffect(() => {
    const loadingExtensionSettings = async () => {
      if (startGitLabAPI && currentTabURL && currentTabURL.startsWith('http')) {
        const { projectPath, issueId } = extractProjectPathAndIssueId(currentTabURL);
        if (projectPath === undefined && issueId === undefined) {
          setProgress(`This is not a GitLab URL.`);
        } else if (projectPath === undefined) {
          setProgress(`Project '${projectPath}' was not found.`);
        } else if (issueId === undefined) {
          setProgress(`This is not a GitLab issue/task URL.`);
        } else {
          const gitlabProjectID = await getProjectIdFromPath(currentTabURL)

          if (gitlabProjectID === undefined) {
            setProgress(`Project '${projectPath}' was not found.`);
          } else {
            setProjectId(gitlabProjectID);

            const projectIssueData = await fetchIssueDetails(gitlabProjectID, issueId)
            setIssueData(projectIssueData);

            // Fetch the issue discussions
            const discussions = await fetchIssueDiscussions(gitlabProjectID, issueId)

            // Call the LLM with the fetched GitLab data
            await fetchLLMResponse(iisRef, projectIssueData, discussions);
            setIsCopy(true);
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
    >
      {startGitLabAPI && <h2
        className="mb-2 has-text-centered"
        style={{ color: themeColor, fontSize: '1.2rem' }}
      >
        {progress}
      </h2>}

      {Object.keys(issueData).length > 0 && <>
        <div>
          {issueData.created_at && <p className="has-text-black">
            <b>Age:</b> {calculateTicketAge(issueData.created_at)} days. <em>{new Date(issueData.created_at).toLocaleDateString()}</em>
          </p>}
          {issueData.updated_at && <p className="has-text-black">
            <b>Last Updated:</b> {calculateTicketAge(issueData.updated_at)} days ago. <em>{new Date(issueData.updated_at).toLocaleDateString()}</em>
          </p>}
          {issueData.user_notes_count && <p className="has-text-black">
            <b>Comments:</b> {issueData.user_notes_count}
          </p>}
        </div>

        <div ref={iisRef}></div>
      </>}
    </div>
  );
}

export default GitLab;
