document.getElementById('fetch').onclick = async () => {
  const username = document.getElementById('username').value.trim();
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

  chrome.tabs.sendMessage(tab.id, {type: "FETCH_SUBMISSIONS", username}, (response) => {
    document.getElementById('status').textContent =
      response && response.done ? "Fetched! See downloaded file." : "Failed or not started.";
  });
};
