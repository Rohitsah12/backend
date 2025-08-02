chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.type === "FETCH_SUBMISSIONS") {
    const username = msg.username;

    // Go to the public submissions page
    window.location.href = `https://leetcode.com/${username}/submissions/`;

    // Use MutationObserver to wait for page load if needed
    setTimeout(() => {
      scrapeSubmissions(sendResponse);
    }, 3000);

    return true; // Keep the message channel open for async response
  }
});

async function scrapeSubmissions(callback) {
  let submissions = [];
  let nextBtn;

  do {
    // Wait until the table is present
    const table = document.querySelector('.ant-table-tbody');
    if (!table) {
      callback({done: false});
      return;
    }

    // Scrape current page
    for (let row of table.querySelectorAll('tr')) {
      const cells = row.querySelectorAll('td');
      submissions.push({
        question: cells[2].innerText,
        status: cells[3].innerText,
        time: cells[1].innerText,
        lang: cells[4].innerText,
        runTime: cells[5].innerText
      });
    }

    // Find and click "Next" if exists
    nextBtn = document.querySelector('.ant-pagination-next:not(.ant-pagination-disabled) button');
    if (nextBtn) {
      nextBtn.click();
      await new Promise(r => setTimeout(r, 1200));
    }
  } while (nextBtn);

  // Download as JSON
  const blob = new Blob([JSON.stringify(submissions, null, 2)], {type: "application/json"});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'submissions.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  callback({done: true});
}
