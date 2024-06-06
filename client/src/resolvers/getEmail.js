import { fetchAuthSession } from '@aws-amplify/auth';

const url = 'https://api.email95.net';

export const getEmailMailbox = async (currentPage) => {
    // Construct the full URL
    const fullUrl = `${url}/email/mailbox?page=${currentPage}&pageSize=1000`;
  
    const headers =  {
        'Authorization': `Bearer ${await fetchAuthSession().then(res=>{
          let accessToken = res.tokens.idToken.toString();
          return accessToken;
        })}`
      };
    
      // Send GET request with headers
      return fetch(fullUrl, {
        method: 'GET',
        headers: headers
      })
      .then(response => {
        // Check if response is successful (status code 200-299)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse response as JSON
        const value = response.json();
        console.log(value);
        return value;
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        // Handle errors
        console.error('There was a problem with your fetch operation:', error);
      });
  }
