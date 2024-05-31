import {Frame, GroupBox, Hourglass, Separator} from 'react95';

import React from 'react';
import useSingleEmail from '../hooks/useEmailSingle';

export const ViewMail = (props) => {
  
    const {data, loading, error} = useSingleEmail(props.id);
  
    return (
      <div
        style={{width: '70%', minHeight: '94%', padding: '2%'}}
        >
          <Frame
              variant='outside'
              shadow
              style={{lineHeight: '1.5', width: '100%', minHeight: '100%', padding: '2%'}}
          >
             <GroupBox label={props.sender}>
              <h2> {props.subject} </h2>
              <Separator/>
              {
            loading && 
            (<Hourglass/>)}
            
            {
            !loading && 
            (<p>{data?.text}</p>)}
             </GroupBox>
          </Frame>
        </div>
    );
  }