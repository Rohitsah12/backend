async function getAllSolvedProblems(username) {
    const query = `
        query userProfileUserQuestionProgressV2($userSlug: String!) {
            userProfileUserQuestionProgressV2(userSlug: $userSlug) {
                numAcceptedQuestions {
                    difficulty
                    count
                }
                numFailedQuestions {
                    difficulty
                    count
                }
                numUntouchedQuestions {
                    difficulty
                    count
                }
                userSessionBeatsPercentage {
                    difficulty
                    percentage
                }
            }
        }
    `;
    
    try {
        const response = await fetch('https://leetcode.com/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            body: JSON.stringify({
                query: query,
                variables: { userSlug: username }
            })
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('GraphQL query failed:', error);
        throw error;
    }
}
console.log(getAllSolvedProblems('NadeXx').then(problems => {
    console.log('Solved Problems:', problems);
}));
