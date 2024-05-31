import { useState } from 'react';
import { postEmail } from '../resolvers';

export const useSendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const send = async (emailData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Assuming sendEmail is a function that sends the email
      await postEmail(emailData);
      setSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, send };
};
