// content.js

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function base64UrlToBase64(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) base64 += "=";
  return base64;
}

function getUsernameFromSessionCookie() {
  const session = getCookie("LEETCODE_SESSION");
  if (!session) return "unknown";
  const parts = session.split('.');
  if (parts.length !== 3) return "unknown";
  try {
    const payload = JSON.parse(atob(base64UrlToBase64(parts[1])));
    return payload.username || payload.user_slug || "unknown";
  } catch (e) {
    console.error("Cookie decode error", e);
    return "unknown";
  }
}

function getRuntime() {
  const runtimeSpans = document.querySelectorAll('span.text-sd-foreground.text-lg.font-semibold');
  for (const span of runtimeSpans) {
    let parentDiv = span.closest('div');
    while (parentDiv) {
      if (parentDiv.textContent && parentDiv.textContent.includes("Runtime")) {
        const unitSpan = span.nextElementSibling;
        const unitText = unitSpan ? unitSpan.innerText.trim() : "";
        return span.innerText.trim() + (unitText ? " " + unitText : "");
      }
      parentDiv = parentDiv.parentElement;
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
      username: getUsernameFromSessionCookie(),
      questionTitle: getProblemTitle(),
      status: statusText,
      language: getLanguage(),
      runTime: getRuntime(),
      timestamp: new Date().toISOString(),
      acceptedCount: 0 // Extend later for accepted count
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
