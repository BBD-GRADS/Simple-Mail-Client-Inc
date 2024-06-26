import { MailParser } from 'mailparser';
import PostalMime from 'postal-mime';
import { useState, useEffect } from 'react';
import { getSingleEmail } from '../resolvers';

const useSingleEmail = (s3EmailId, sent=false) => {
  const [emailContent, setEmailContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmailContent = async () => {
      try {
        setLoading(true);
        const data = await getSingleEmail(s3EmailId, sent);

        var message;
        if (sent)
        {
          message = data;
        }
        else {
          message = await PostalMime.parse(data);
        } 
        
        setEmailContent(message);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmailContent();

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, [s3EmailId]); // Include s3EmailId in the dependency array

  return { data: emailContent, loading, error };
};

export default useSingleEmail;
