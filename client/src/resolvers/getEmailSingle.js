import { fetchAuthSession } from '@aws-amplify/auth';
const url = 'https://api.email95.net';

export const getSingleEmail = async (s3EmailId) => {
    const fullUrl = `${url}/email/received-email?s3EmailId=${encodeURIComponent(s3EmailId)}`;

    if (!s3EmailId)
      {
        return;
      }
  
      const headers =  {
        'Authorization': `Bearer ${await fetchAuthSession().then(res=>{
          let accessToken = res.tokens.accessToken.toString();
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
      const data = await (await response.blob()).text();
      
      return data;
    } catch (error) {
      console.error('Error fetching received email:', error);
      throw error;
    }
  };