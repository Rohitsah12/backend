function getUsernameFromPage() {
  const profileLinks = document.querySelectorAll('a[href^="/u/"]');
  for (const link of profileLinks) {
    const username = link.href.split('/').filter(Boolean).pop();
    if (username) return username;
  }
  return "unknown";
}

function getRuntime() {
  const runtimeBlocks = document.querySelectorAll('div.group.flex.flex-col');
  for (const block of runtimeBlocks) {
    const label = block.querySelector('div.text-sm');
    const valueSpan = block.querySelector('span.text-lg.font-semibold');
    const unitSpan = block.querySelector('span.text-sd-muted-foreground.text-sm');

    if (label && label.innerText.includes("Runtime") && valueSpan && unitSpan) {
      return `${valueSpan.innerText.trim()} ${unitSpan.innerText.trim()}`;
    }
  }
  return "N/A";
}

function getLanguage() {
  const divs = document.querySelectorAll('div.flex.items-center.gap-2.text-sm.font-medium.text-text-tertiary');
  for (const div of divs) {
    if (div.textContent.includes("Code")) {
      const children = Array.from(div.childNodes).filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim() !== "");
      if (children.length > 0) {
        return children[children.length - 1].textContent.trim();
      }
    }
  }
  return "N/A";
}

function getProblemTitle() {
  const titleElem = document.querySelector('div[data-cy="question-title"], h1[data-key="question-title"], h1');
  return titleElem ? titleElem.innerText.trim() : document.title;
}

function getSubmissionStatus() {
  const statusElement = document.querySelector('span[data-e2e-locator="submission-result"]');
  return statusElement ? statusElement.innerText.trim() : null;
}

function extractSubmissionInfo() {
  try {
    const statusText = getSubmissionStatus();
    if (!statusText || statusText.toLowerCase() !== "accepted") {
      return null;
    }
    return {
      username: getUsernameFromPage(),
      questionTitle: getProblemTitle(),
      status: statusText,
      language: getLanguage(),
      runTime: getRuntime(),
      timestamp: new Date().toISOString(),
      acceptedCount: 0
    };
  } catch (e) {
    console.error("Error extracting submission info:", e);
    return null;
  }
}

function saveSubmissionToStorage(submission) {
  chrome.storage.local.get({ acceptedSubmissions: [] }, (items) => {
    const submissions = items.acceptedSubmissions || [];
    submissions.push(submission);
    chrome.storage.local.set({ acceptedSubmissions: submissions }, () => {
      console.log("[LeetCode Tracker] Submission saved to storage.", submissions);
    });
  });
}

let lastLoggedSubmissionJSON = null;

function waitForElement(selector, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) return resolve(element);

    const observer = new MutationObserver((mutations, obs) => {
      const elem = document.querySelector(selector);
      if (elem) {
        obs.disconnect();
        resolve(elem);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error("Timeout waiting for element: " + selector));
    }, timeout);
  });
}

function setupSubmitButtonListener() {
  const submitButtonSelector = 'button[data-e2e-locator="console-submit-button"]';

  function attachListener() {
    const submitButton = document.querySelector(submitButtonSelector);
    if (!submitButton) {
      setTimeout(attachListener, 1000);
      return;
    }
    submitButton.addEventListener("click", async () => {
      console.log("[LeetCode Tracker] Submit button clicked, waiting for submission result...");

      try {
        await waitForElement('span[data-e2e-locator="submission-result"]', 15000);

        setTimeout(() => {
          const submissionInfo = extractSubmissionInfo();
          if (submissionInfo) {
            const json = JSON.stringify(submissionInfo);
            if (json !== lastLoggedSubmissionJSON) {
              console.log("[LeetCode Accepted Submission]", submissionInfo);
              saveSubmissionToStorage(submissionInfo);
              lastLoggedSubmissionJSON = json;
            } else {
              console.log("[LeetCode Tracker] Duplicate accepted submission ignored.");
            }
          } else {
            console.log("[LeetCode Tracker] Submission not accepted or info not available.");
          }
        }, 2000);
      } catch (error) {
        console.error("[LeetCode Tracker] Error waiting for submission result:", error);
      }
    });

    console.log("[LeetCode Tracker] Submit button listener attached.");
  }

  attachListener();
}

// Initialize
setupSubmitButtonListener();
