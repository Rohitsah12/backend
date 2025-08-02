async function getStoredSubmissions() {
  return new Promise((resolve) => {
    chrome.storage.local.get({ acceptedSubmissions: [] }, (items) => {
      resolve(items.acceptedSubmissions);
    });
  });
}

async function clearStoredSubmissions() {
  return new Promise((resolve) => {
    chrome.storage.local.set({ acceptedSubmissions: [] }, () => {
      console.log("[LeetCode Tracker] Submissions cleared from storage.");
      resolve();
    });
  });
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleString();
  } catch {
    return dateStr;
  }
}

async function render() {
  const submissions = await getStoredSubmissions();
  const listElem = document.getElementById("submissionList");
  listElem.innerHTML = "";

  if (submissions.length === 0) {
    listElem.innerHTML = "<li>No submissions tracked yet.</li>";
    return;
  }

  submissions.slice().reverse().forEach(sub => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${sub.questionTitle}</strong><br>
      Accepted on: ${formatDate(sub.timestamp)}<br>
      Language: ${sub.language || 'N/A'}, Runtime: ${sub.runTime || 'N/A'}
    `;
    listElem.appendChild(li);
  });
}

// Event Listeners

document.getElementById("clearBtn").addEventListener("click", async () => {
  if (confirm("Clear all tracked submission data?")) {
    await clearStoredSubmissions();
    await render();
  }
});

document.getElementById("refreshBtn").addEventListener("click", async () => {
  console.log("[LeetCode Tracker] Manual Refresh Clicked.");
  await render();
});

render();