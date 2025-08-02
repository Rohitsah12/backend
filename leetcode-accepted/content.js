function getUsernameFromPage() {
  // Method 1: Profile Link in Navbar (Primary)
  const navbarProfileLink = document.querySelector('a[href^="/u/"]');
  if (navbarProfileLink) {
    const username = navbarProfileLink.href.split('/').filter(Boolean).pop();
    if (username) return username;
  }

  // Method 2: Avatar Image Link
  const avatarImageLink = document.querySelector('a[href^="/u/"] img');
  if (avatarImageLink && avatarImageLink.parentElement) {
    const username = avatarImageLink.parentElement.href.split('/').filter(Boolean).pop();
    if (username) return username;
  }

  // Method 3: Dropdown Profile Menu
  const dropdownProfileLink = document.querySelector('div[class*="dropdown"] a[href^="/u/"]');
  if (dropdownProfileLink) {
    const username = dropdownProfileLink.href.split('/').filter(Boolean).pop();
    if (username) return username;
  }

  // Method 4: Meta Tags (Rare Case)
  const metaUser = document.querySelector('meta[name="user-login"]');
  if (metaUser && metaUser.content) {
    return metaUser.content;
  }

  // Method 5: Search inside possible User Dropdown (if opened)
  const dropdownItems = document.querySelectorAll('a[href^="/u/"]');
  for (const item of dropdownItems) {
    const username = item.href.split('/').filter(Boolean).pop();
    if (username) return username;
  }

  // Fallback: Return unknown
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
  if (!statusElement) return null;
  return statusElement.innerText.trim();
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
      acceptedCount: 0 // Placeholder, can extend later.
    };
  } catch (e) {
    console.error("Error extracting submission info:", e);
    return null;
  }
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
        const resultElem = await waitForElement('span[data-e2e-locator="submission-result"]', 15000);

        setTimeout(() => {
          const submissionInfo = extractSubmissionInfo();
          if (submissionInfo) {
            const json = JSON.stringify(submissionInfo);
            if (json !== lastLoggedSubmissionJSON) {
              console.log("[LeetCode Accepted Submission]", submissionInfo);
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

// Initialize monitoring
setupSubmitButtonListener();
