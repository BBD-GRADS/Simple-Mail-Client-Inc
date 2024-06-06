import { fetchAuthSession } from '@aws-amplify/auth';

const baseUrl = 'https://api.email95.net';

export const getEmailSent = async (currentPage) => {
    // Construct the full URL
    const fullUrl = `${baseUrl}/email/sent?page=${currentPage}`;
  
    try {
        // Fetch authentication session and extract access token
        const accessToken = await fetchAuthSession().then(res => res.tokens.idToken.toString());
        
        // Set headers including the access token
        const headers = {
            'Authorization': `Bearer ${accessToken}`
        };
        
        // Send GET request with headers
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: headers
        });
        
        // Check if response is successful (status code 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        // Parse response as JSON
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        // Handle errors
        console.error('There was a problem with your fetch operation:', error);
        return null;
    }
};
