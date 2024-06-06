import React, { useState, useEffect } from 'react';
import { getEmailSent } from '../resolvers'; // Import the function for fetching sent emails
import { Email } from '../components/email';

export const useSentMailList = (onClick) => { // Renamed to useSentMailList
  const [mailList, setMailList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const parseSentMails = async (asPoll=false) => { // Renamed function and parameter
      try {
        setLoading(!asPoll);

        const sentMails = await getEmailSent(); // Changed function call to fetch sent emails
        const mailL = sentMails.map(mail => (
          <Email
            key={sentMails.indexOf(mail)}
            sender={mail.recipient}
            subject={mail.subject}
            id={mail.s3EmailId}
            receivedTime={mail.sentTime}
            onClick={onClick}
          />
        ));
        setMailList(mailL);
      } catch (error) {
        console.error('Error parsing sent mails:', error);
      } finally {
        setLoading(false);
      }
    };

    parseSentMails();

    const intervalId = setInterval(parseSentMails, 5000, [true]); // Fetch sent emails every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return { sentList: mailList, sentLoading: loading };
};
