async function fetchFromGitLabAPI(url: string) {
  const gitLabAPI = await getGitLabApiKey();
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${gitLabAPI}` },
  });

  if (!response.ok) {
    throw new Error(`GitLab API error: ${response.statusText}`);
  }

  return await response.json();
}

// Utility function to send a message to the background script and retrieve the result
const getFromBackground = async (
  action: string,
  key: string
): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action }, function (response) {
      if (response && response[key]) {
        resolve(response[key]);
      } else {
        console.log(`No ${key} found`);
        resolve(undefined);
      }
    });
  });
};

// Retrieve GitLab API key
const getGitLabApiKey = async (): Promise<string | undefined> => {
  return getFromBackground("getGitLabApiKey", "GASGitLabAccessToken");
};

// Retrieve GitLab Web URL
const getGitLabWebURL = async (): Promise<string | undefined> => {
  return getFromBackground("getGitLab", "GASGitlab");
};

// Retrieve OpenAI API key
const getOpenAIApiKey = async (): Promise<string | undefined> => {
  return getFromBackground("getOpenAIApiKey", "GASOpenAIKey");
};

// Retrieve Theme Color
const getThemeColor = async (): Promise<string | undefined> => {
  return getFromBackground("getThemeColor", "GASThemeColor");
};

// Retrieve AI Provider
const getAiProvider = async (): Promise<string | undefined> => {
  return getFromBackground("getAiProvider", "GASAiProvider");
};

const getOpenAIModel = async (): Promise<string | undefined> => {
  return getFromBackground("getOpenAIModel", "GASOpenaiModel");
};

const getOllamaModel = async (): Promise<string | undefined> => {
  return getFromBackground("getOllamaModel", "GASOllamaModel");
};

const getOllamaURL = async (): Promise<string | undefined> => {
  return getFromBackground("getOllamaURL", "GASOllamaURL");
};

const getStorage = (
  keys: string | string[] | PlainObjectType,
  callback: (v: any) => any
) => {
  if (chrome.storage) {
    chrome.storage.sync.get(keys, (result: any) => callback(result));
  } else {
    console.log("Local storage is not available in this browser.");

    callback(keys);
  }
};

const setStorage = (obj: PlainObjectType, callback?: () => any) => {
  if (chrome.storage) {
    chrome.storage.sync.set(obj, callback ?? (() => {}));
  } else {
    console.log("Local storage is not available in this browser.");

    callback?.();
  }
};

const calculateTicketAge = (date: string): number => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date format");
  }

  const ageInDays = Math.floor(
    (new Date().getTime() - parsedDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return ageInDays;
};

const getDomainFromURL = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch (error) {
    console.error("Invalid URL:", error);
    return "";
  }
};

const chunkArray = (array: any, size: number) => {
  return array.reduce((acc: any, item: any, index: number) => {
    const chunkIndex = Math.floor(index / size);

    if (!acc[chunkIndex]) {
      acc[chunkIndex] = []; // Start a new chunk
    }

    acc[chunkIndex].push(item); // Add item to the chunk

    return acc;
  }, []);
};

const isGitLabIssuesPage = (url?: string) => {
  if (!url) {
    return;
  }

  // domain check
  // const { host } = new URL(url);
  // return SITES.some((domain) => host.endsWith(domain));
  const regexp = new RegExp("/-/issues/d+|https://gitlab.|/-/work_items/d+");
  return regexp.test(url);
};

const checkDisabledGitLabSites = (
  url: string,
  cb: (resule: boolean, domain: string, sites: string[]) => any
) => {
  const { host: domain } = new URL(url as string);
  getStorage({ disabled_gitlab_sites: [] }, ({ disabled_gitlab_sites }) => {
    const result = disabled_gitlab_sites.includes(domain);
    cb(result, domain, disabled_gitlab_sites);
  });
};

const toggleDisabledGitLabSites = (
  url: string,
  cb?: (isDisabled: boolean) => any
) => {
  checkDisabledGitLabSites(url, (isDisabled, domain, sites) => {
    if (isDisabled) {
      sites = sites.filter((site) => site !== domain);
    } else {
      sites.push(domain);
    }
    setStorage({ disabled_gitlab_sites: sites }, () => cb?.(!isDisabled));
  });
};

export {
  getStorage,
  setStorage,
  getGitLabWebURL,
  getGitLabApiKey,
  getOpenAIApiKey,
  getThemeColor,
  getAiProvider,
  getOpenAIModel,
  getOllamaModel,
  getOllamaURL,
  getDomainFromURL,
  chunkArray,
  calculateTicketAge,
  fetchFromGitLabAPI,
  isGitLabIssuesPage,
  checkDisabledGitLabSites,
  toggleDisabledGitLabSites,
};
