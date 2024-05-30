import { useState, useEffect } from 'react';
import { getSingleEmail } from '../resolvers';

const useSingleEmail = (s3EmailId) => {
  const [emailContent, setEmailContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmailContent = async () => {
      try {
        setLoading(true);
        const data = await getSingleEmail(s3EmailId);
        setEmailContent(data);
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
