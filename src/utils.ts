const fetchFromGitlab = async (url: string, token: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Private-Token": token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
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
  getDomainFromURL,
  chunkArray,
  fetchFromGitlab,
  isGitLabIssuesPage,
  checkDisabledGitLabSites,
  toggleDisabledGitLabSites,
};
