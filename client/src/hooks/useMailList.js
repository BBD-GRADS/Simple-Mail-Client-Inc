import React, { useState, useEffect } from 'react';
import { getEmailMailbox } from '../resolvers';
import { Email } from '../components/email';

export const useMailList = (onClick) => {
  const [mailList, setMailList] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const parseMails = async () => {
      try {
        // Set loading to true when fetching data
        setLoading(true);

        // Assuming getEmailMailbox is a function that fetches the emails
        const mails = await getEmailMailbox();
        const mailL = mails.map(mail => (
          <Email
            //key={mail.id} // Assuming each email has a unique id
            sender={mail.sender}
            subject={mail.subject}
            id={mail.s3EmailId}
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

    // You can add dependencies to rerun the effect when needed
    // For example, if getEmailMailbox or any state/prop used inside the effect changes
  }, []);

  // Return loading along with mailList
  return { mailList, loading };
};
