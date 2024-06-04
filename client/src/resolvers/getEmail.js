const url = 'https://api.email95.net';

export const getEmailMailbox = () => {
    // Construct the full URL
    const fullUrl = `${url}/email/mailbox`;
  
    const headers = {
        'Authorization': `Bearer ${''}`
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
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        // Handle errors
        console.error('There was a problem with your fetch operation:', error);
      });
  }
