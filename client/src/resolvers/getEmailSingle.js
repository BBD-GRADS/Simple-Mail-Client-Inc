const url = 'http://localhost:8080';

export const getSingleEmail = async (s3EmailId) => {
    const fullUrl = `${url}/email/received-email?s3EmailId=${encodeURIComponent(s3EmailId)}`;

    console.log(fullUrl);
  
    const headers = {
        'Authorization': `Bearer ${'eyJraWQiOiJEKzlnYlVsMEVIR3ZXZW9RcmIwMlhXRlwvMEV2ejJtWHA2eFhOdHpUN1N3RT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiMjk1ODRiNC0yMDgxLTcwM2ItNzBjOC0wNTMxOTc2ZGI1YTIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9OTjB3QTA0alYiLCJjb2duaXRvOnVzZXJuYW1lIjoidGVzdEBlbWFpbDk1Lm5ldCIsIm9yaWdpbl9qdGkiOiI1Y2EwMjVmMi1lZWFiLTRkM2YtYWQyNC0zMjM5NTFiZmVkZDgiLCJhdWQiOiIxc2ViYzRwaWpjZWxlc21rc3RrZXRsZ2pwIiwiZXZlbnRfaWQiOiJkNzcyMWZhNy0wNTcxLTQ0YWEtOWU5Ny01ZjQyNWU2YWJkOWIiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcxNzA5NzQ1MCwiZXhwIjoxNzE3MTAxMDUwLCJpYXQiOjE3MTcwOTc0NTAsImp0aSI6IjU2ZGJkNzYwLTUzYWEtNGI0ZC1iYmExLWE5MmYwNzMzZDIzOCIsImVtYWlsIjoidGVzdEBlbWFpbDk1Lm5ldCJ9.Vj5VCEnJRi5E0xTwNEGAA3o67KF6IZvN84CiRLUh_UxMHpAbOaGmFQhXo6nXvmEJMdAs8WgeXe-hxvIuOW_OMwycyJOWmPwQVnyWB3f7Y3dnCazoLabjbR4x7GWWPW-3ny3Kq-UCRPqfsLlHXQLAv_n7n81lsVGfI8fw23MVzAs8Wo7il0ZlymJS5HZ_4obYTuUL64BFusqi8RGqql5873NWZqw7rWbSJyn8QhPl-7fauWHdVObaRcs27rfOsXnEe3EeHGRK99M4dMNZkxe63cMcB8ITqkd83Rl4_pGL6HRy7v2d6APFmRKXiVbXrfFJa4iy7IX4TBu9AlV7KWOLvQ'}`
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
  