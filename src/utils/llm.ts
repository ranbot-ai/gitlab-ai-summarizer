import { getOpenAIApiKey } from ".";
import { getPrompt } from "./prompts";

export {};

/* eslint-disable @typescript-eslint/no-redeclare */
const openAIModel = "gpt-4o-mini-2024-07-18";
// The issue with groq models right now is that they have restricted context window size to only 8K (instead of 128K)
// const groqModel = 'llama-3.1-8b-instant';
const groqModel = "llama-3.1-70b-versatile";
// const groqModel = 'mixtral-8x7b-32768' // 32K context window
const useGroq = false; // Set this to true to use Groq, false for OpenAI

const chatAPIs = {
  groq: "https://api.groq.com/openai/v1/chat/completions",
  openai: "https://api.openai.com/v1/chat/completions",
};

async function fetchLLMResponse(
  issueDetails: any,
  issueData: any,
  discussions: any
) {
  const personalOpenAIApiKey = await getOpenAIApiKey();

  // Generate messages prompt
  const messages = getPrompt(issueData, discussions);

  const model = useGroq ? groqModel : openAIModel;
  const apiUrl = useGroq ? chatAPIs.groq : chatAPIs.openai;

  let urlSection = document.createElement("p");
  urlSection.innerHTML = `<em>Asking model: ${model}</em>`;
  urlSection.style.color = "black";
  urlSection.style.paddingBottom = "0px";
  urlSection.style.marginBottom = "5px";
  issueDetails.appendChild(urlSection);

  let responseSection = document.createElement("p");
  responseSection.style.color = "black";
  responseSection.style.paddingBottom = "0px";
  responseSection.style.marginBottom = "5px";
  issueDetails.appendChild(responseSection);

  try {
    // Call the LLM API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${personalOpenAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        stream: true,
      }),
    });

    // Check if the response is not OK
    if (!response.ok) {
      throw new Error("Error calling LLM API");
    }

    // Get a reader for the response body stream
    const reader = response.body
      ?.pipeThrough(new TextDecoderStream())
      .getReader();
    if (!reader) return;

    let responseContent = "";
    let accumulatedChunk = "";
    const maxRetries = 5;
    let retryCount = 0;

    // Read the stream
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Split the stream data by new lines
      const arr = value.split("\n");
      for (const data of arr) {
        // Ignore empty or comment messages
        if (data.length === 0 || data.startsWith(":")) continue;
        if (data === "data: [DONE]") {
          // Update the DOM when the stream is done
          urlSection.innerHTML = `<em>Generated model: ${model}</em>`;
          // responseSection.innerHTML += `<br><p style="text-align: center; font-style: italic;">${model} may make errors.</p>`;
          return responseContent.trim(); // End of stream
        }

        accumulatedChunk += data;

        // Parse the JSON response incrementally
        try {
          const jsonResponse = JSON.parse(accumulatedChunk.split("data: ")[1]);
          const deltaContent = jsonResponse.choices[0].delta.content;
          if (deltaContent) {
            responseContent += deltaContent;
            // Update the DOM with the content, trimming backticks and HTML

            responseSection.innerHTML = responseContent
              .replace(/```html/g, "")
              .replace(/```/g, "")
              .trim();
          }
          // Reset accumulatedChunk and retryCount after successful parse
          accumulatedChunk = "";
          retryCount = 0;
        } catch (e) {
          // Increment retry count and pause before retrying
          retryCount++;
          if (retryCount > maxRetries) {
            // Attempt to parse the accumulated chunks as a whole
            try {
              const jsonResponse = JSON.parse(
                accumulatedChunk.split("data: ")[1]
              );
              const deltaContent = jsonResponse.choices[0].delta.content;
              if (deltaContent) {
                responseContent += deltaContent;

                responseSection.innerHTML = responseContent
                  .replace(/```html/g, "")
                  .replace(/```/g, "")
                  .trim();
              }
            } catch (finalError) {
              throw new Error("Error parsing accumulated JSON response");
            }
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 100)); // Pause for 100ms before retrying
        }
      }
    }

    return responseContent.trim();
  } catch (error) {
    console.log("Error fetching data from OpenAI:", error);
  }
}

export { fetchLLMResponse };
