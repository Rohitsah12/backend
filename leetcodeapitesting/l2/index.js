import fetch from 'node-fetch';

const LEETCODE_SESSION = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMTIzOTY2ODIiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjMWUyNmI3MDU2MzMzZDRjMWNlYjIwNjgwYTVjYTNiZDIyZGM4YzBhNGZkNjNjZGM4YzYyMGMyZWE0YWQyYjY1Iiwic2Vzc2lvbl91dWlkIjoiMDhmM2YyZjUiLCJpZCI6MTIzOTY2ODIsImVtYWlsIjoicm9oaXRrdW1hcjIzMzE3OUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Ik5hZGVYeCIsInVzZXJfc2x1ZyI6Ik5hZGVYeCIsImF2YXRhciI6Imh0dHBzOi8vYXNzZXRzLmxlZXRjb2RlLmNvbS91c2Vycy9OYWRlWHgvYXZhdGFyXzE3MzY2OTg1OTAucG5nIiwicmVmcmVzaGVkX2F0IjoxNzU0MTI3NjM2LCJpcCI6IjEyNS42My43OS4yNTAiLCJpZGVudGl0eSI6IjdkZGVkYTg4ZDBjNTk5Y2M0OTRkYTBkZWNlNjU1NGQ1IiwiZGV2aWNlX3dpdGhfaXAiOlsiNmNlNTQzNjIzNTg4MGRlODQwMGUxMTlhZTUwN2FjMGMiLCIxMjUuNjMuNzkuMjUwIl19.DcrdqQQ0YkTmXKr8LxzrQpApNJ5u_CVLC6YAKO_HIBA';

const query = `
  query submissionList($offset: Int!, $limit: Int!) {
    submissionList(offset: $offset, limit: $limit) {
      submissions {
        id
        statusDisplay
        lang
        timestamp
        title
        titleSlug
      }
    }
  }
`;

const fetchSubmissions = async (offset = 0, limit = 20) => {
  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `LEETCODE_SESSION=${LEETCODE_SESSION}`,
    },
    body: JSON.stringify({
      query,
      variables: { offset, limit },
    }),
  });

  const json = await res.json();

  if (!json.data?.submissionList?.submissions) {
    console.error('Invalid response:', JSON.stringify(json, null, 2));
    return [];
  }

  return json.data.submissionList.submissions;
};

(async () => {
  const submissions = await fetchSubmissions(0, 100);
  console.log('Fetched submissions:', submissions.length);
  
  console.log('Submissions:', submissions);
  
})();
