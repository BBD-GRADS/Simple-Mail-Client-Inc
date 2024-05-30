const url = 'http://localhost:8080';

export const getSingleEmail = async (s3EmailId) => {
    const fullUrl = `${url}/email/received-email?s3EmailId=${encodeURIComponent(s3EmailId)}`;

    console.log(fullUrl);
  
    const headers = {
        'Authorization': `Bearer ${''}`
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
      
      const message = data.split("Content-Transfer-Encoding: quoted-printable")[1].split("Content-Type: text/html; charset=\"iso-8859-1\"")[0];

      const substring = message.substring(0, message.length-65);

      console.log(substring);
      return substring;
    } catch (error) {
      console.error('Error fetching received email:', error);
      throw error;
    }
  };
  