import {Button, Frame, GroupBox, Hourglass, Separator} from 'react95';

import React from 'react';
import useSingleEmail from '../hooks/useEmailSingle';

export const ViewMail = (props) => {
  
    const {data, loading, error} = useSingleEmail(props.id, props.sent);
  
    const downloadAttachment = (attachment) => {
      const blob = new Blob([attachment.content], { type: attachment.mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = attachment.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <div
        style={{width: '70%', minHeight: '100%', padding: 'calc(34px + 2%) 2% 0% 1%'}}
        >
          <Frame
              variant='outside'
              shadow
              style={{lineHeight: '1.5', width: '100%', minHeight: '100%', padding: '2% 2% 1.5% 2%'}}
          >
             <GroupBox label={props.sender}style ={{overflowWrap: 'anywhere',minWidth: 'auto'}}>
              <h2 style={{fontSize: '16px', fontWeight: 'bold'}}> {props.subject} </h2>
              <Separator/>
              {
            loading && 
            (<Hourglass/>)}
            
            {
            !loading && 
            (<>
              <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
              {data?.attachments.map((attachment, index) => (
                <div key={index}>
                  <Button onClick={() => downloadAttachment(attachment)}>{attachment.filename}</Button>
                </div>
              ))}
              </div>
              <p>{data?.text}</p>
              
              </>)}
             </GroupBox>
          </Frame>
        </div>
    );
  }