// popup.js

async function getStoredSubmissions() {
  return new Promise((resolve) =>
    chrome.storage.local.get({ acceptedSubmissions: [] }, (items) => resolve(items.acceptedSubmissions))
  );
}

async function clearStoredSubmissions() {
  return new Promise((resolve) =>
    chrome.storage.local.set({ acceptedSubmissions: [] }, () => resolve())
  );
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

  // Show latest first (reverse chronological)
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

document.getElementById("clearBtn").addEventListener("click", async () => {
  if (confirm("Clear all tracked submission data?")) {
    await clearStoredSubmissions();
    await render();
  }
});

render();
