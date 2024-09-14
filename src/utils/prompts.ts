import { getAIPolicyAndValues } from "./policies";

export {};

function getPrompt(issueData: any, discussions: any) {
  // Get policies and values
  const { preTaskPolicy, postTaskPolicy } = getAIPolicyAndValues();

  // Task definition
  const task = `
    Please respond in English.

    You are an AI assistant helping professionals in an AI/ML services company to analyze and summarize issue statuses.
    Your role is to provide clear, concise, and actionable information based on the given issue data and discussions.

    First, determine the issue status:
    - If issue.state === "closed", consider it a closed issue and use past tense in your response.
    - Otherwise, consider it an open issue and use present tense.

    Based on the most current information in the issue and discussions,
    provide the following information in an easy to read HTML format:

    <h4>Summary</h4>
    <p style="font-weight: normal;">Summarize the issue in a detailed paragraph.
    Focus on the key points, including the problem, its impact, and any major developments.
    If the issue is closed, use past tense; otherwise, use present tense.</p>

    <h4>Priorities</h4>
    <p style="font-weight: normal;">Identify the most important aspects of the issue and the most pressing tasks.
    If the issue is closed, use past tense to describe what was done; otherwise, use present tense.</p>

    <h4>Progress</h4>
    <p style="font-weight: normal;">Describe who is actively working on what aspects of the issue.
    Include specific names if available, and detail their contributions.
    If the issue is closed, use past tense to describe what was done; otherwise, use present tense to describe ongoing work.</p>

    <h4>Questions</h4>
    <ul style="font-weight: normal;margin-bottom: 0px;">
      <li>Provide 2-3 of the most important questions that need to be answered.
      Consider the following aspects:
      - Ensuring client focus
      - Requirements are well defined and understood by everyone
      - Identifying and removing potential blockers
      - Making sure team members have everything they need
      - Clarity of tasks and responsibilities
      - Effectiveness of group communication
      If the issue is closed, review the issue and discussions for any unresolved items to ask about.
      </li>
    </ul>

    <h4>Actions</h4>
    <ul style="font-weight: normal;margin-bottom: 0px;">
      <li>List 2-3 of the most impactful next actions. Consider:
      - Suggest most effective and efficient ways to resolve the issue
      - Mitigating risk with risk management strategies
      - Increasing revenue through value adds
      - Ensuring transparency for all project stakeholders
      If the issue is closed, check the issue and discussions for any unresolved items that still require action.</li>
    </ul>

    Remember to maintain consistency in tense usage throughout your response based on the issue status.
  `;

  const combinedSystemContent = `
${preTaskPolicy}

${task}

${postTaskPolicy}
  `.trim();

  // return prompt
  return [
    { role: "system", content: combinedSystemContent },
    {
      role: "user",
      content: `Issue Details: ${JSON.stringify(
        issueData
      )}\nDiscussions: ${JSON.stringify(discussions)}`,
    },
  ];
}

export { getPrompt };
