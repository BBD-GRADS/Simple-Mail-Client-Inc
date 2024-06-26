import { fetchAuthSession } from '@aws-amplify/auth';
const url = 'https://api.email95.net';

export const getSingleEmail = async (s3EmailId, sent=false) => {
    const fullUrl = `${url}/email/${sent ? 'sent' : 'received'}-email?s3EmailId=${encodeURIComponent(s3EmailId)}`;

    if (!s3EmailId)
      {
        return;
      }
  
      const headers =  {
        'Authorization': `Bearer ${await fetchAuthSession().then(res=>{
          let accessToken = res.tokens.idToken.toString();
          return accessToken;
        })}`
      };

    try {
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: headers
      });
      if (!response.ok) {
        throw new Error('Failed to fetch received email data');
      }
      var data;
      if (sent) {
        data = await response.json();
      }
      else {
        data = await (await response.blob()).text();
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching received email:', error);
      throw error;
    }
  };