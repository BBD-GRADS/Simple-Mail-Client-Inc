import React, { useState, useEffect } from 'react';
import { getEmailMailbox } from '../resolvers';
import { Email } from '../components/email';

export const useMailList = (onClick) => {
  const [mailList, setMailList] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  useEffect(() => {
    const parseMails = async (asPoll=false) => {
      try {
        // Set loading to true when fetching data
        setLoading(!asPoll);

        // Assuming getEmailMailbox is a function that fetches the emails
        const mails = await getEmailMailbox();
        setHasNext(mails.hasNextPage);
        setHasPrev(mails.hasPrevPage);
        const mailL = mails.emails.map(mail => (
          <Email
            key={mails.indexOf(mail)} // Assuming each email has a unique id
            sender={mail.sender}
            subject={mail.subject}
            id={mail.s3EmailId}
            receivedTime={mail.receivedTime}
            onClick={onClick}
          />
        ));
        setMailList(mailL);
      } catch (error) {
        console.error('Error parsing mails:', error);
      } finally {
        // Set loading back to false when data is loaded or an error occurs
        setLoading(false);
      }
    };

    parseMails();

    const intervalId = setInterval(parseMails, 5000, [true]); // Fetch emails every 5 seconds

    return () => clearInterval(intervalId); // Cleanup function to clear the interval

    // You can add dependencies to rerun the effect when needed
    // For example, if getEmailMailbox or any state/prop used inside the effect changes
  }, []);

  // Return loading along with mailList
  return { mailList, loading, hasNext, hasPrev};
};
