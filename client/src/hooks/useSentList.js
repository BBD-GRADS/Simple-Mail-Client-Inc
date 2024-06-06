import React, { useState, useEffect } from 'react';
import { getEmailSent } from '../resolvers'; // Import the function for fetching sent emails
import { Email } from '../components/email';

export const useSentMailList = (onClick, currentPage) => { // Renamed to useSentMailList
  const [mailList, setMailList] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  useEffect(() => {
    const parseSentMails = async (asPoll=false) => { // Renamed function and parameter
      try {
        setLoading(!asPoll);

        const sentMails = await getEmailSent(currentPage);
        setHasNext(sentMails?.hasNextPage);
        setHasPrev(sentMails?.hasPrevPage);
        const mailL = sentMails?.emails?.map(mail => (
          <Email
            key={sentMails?.emails?.indexOf(mail)}
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

  return { sentList: mailList, sentLoading: loading, sentHasNext: hasNext, sentHasPrev: hasPrev};
  return { mailList, loading, hasNext, hasPrev};

};
