const url = 'https://api.email95.net';

export const postEmail = (emailData) => {
    // Construct the full URL
    const fullUrl = `${url}/email/send`;
  
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${''}`
    };
    
    // Send POST request with headers and email data
    return fetch(fullUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(emailData)
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
