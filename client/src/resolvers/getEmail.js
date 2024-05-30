const url = 'http://localhost:8080';

export const getEmailMailbox = () => {
    // Construct the full URL
    const fullUrl = `${url}/email/mailbox`;
  
    const headers = {
        'Authorization': `Bearer ${'eyJraWQiOiJEKzlnYlVsMEVIR3ZXZW9RcmIwMlhXRlwvMEV2ejJtWHA2eFhOdHpUN1N3RT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiMjk1ODRiNC0yMDgxLTcwM2ItNzBjOC0wNTMxOTc2ZGI1YTIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9OTjB3QTA0alYiLCJjb2duaXRvOnVzZXJuYW1lIjoidGVzdEBlbWFpbDk1Lm5ldCIsIm9yaWdpbl9qdGkiOiI1Y2EwMjVmMi1lZWFiLTRkM2YtYWQyNC0zMjM5NTFiZmVkZDgiLCJhdWQiOiIxc2ViYzRwaWpjZWxlc21rc3RrZXRsZ2pwIiwiZXZlbnRfaWQiOiJkNzcyMWZhNy0wNTcxLTQ0YWEtOWU5Ny01ZjQyNWU2YWJkOWIiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcxNzA5NzQ1MCwiZXhwIjoxNzE3MTAxMDUwLCJpYXQiOjE3MTcwOTc0NTAsImp0aSI6IjU2ZGJkNzYwLTUzYWEtNGI0ZC1iYmExLWE5MmYwNzMzZDIzOCIsImVtYWlsIjoidGVzdEBlbWFpbDk1Lm5ldCJ9.Vj5VCEnJRi5E0xTwNEGAA3o67KF6IZvN84CiRLUh_UxMHpAbOaGmFQhXo6nXvmEJMdAs8WgeXe-hxvIuOW_OMwycyJOWmPwQVnyWB3f7Y3dnCazoLabjbR4x7GWWPW-3ny3Kq-UCRPqfsLlHXQLAv_n7n81lsVGfI8fw23MVzAs8Wo7il0ZlymJS5HZ_4obYTuUL64BFusqi8RGqql5873NWZqw7rWbSJyn8QhPl-7fauWHdVObaRcs27rfOsXnEe3EeHGRK99M4dMNZkxe63cMcB8ITqkd83Rl4_pGL6HRy7v2d6APFmRKXiVbXrfFJa4iy7IX4TBu9AlV7KWOLvQ'}`
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
