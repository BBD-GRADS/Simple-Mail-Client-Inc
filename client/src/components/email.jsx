import React from 'react';
import { Separator } from 'react95';
import { UserAvatar } from './user-avatar';

export const Email = (props) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(
        {
          sender: props.sender,
          subject: props.subject,
           id: props.id
        }
      );
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
    <div style={{display: 'flex', width: '100%', padding: '1vh 0px'}}>
      <UserAvatar
        sender={props.sender}
      />
      <div testid={props.sender} style={{overflow: 'hidden', flex: '1', margin: '0 0 0 1vh'}} onClick={() => {
        handleClick();
        }}>
        <h2 style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{props.sender}</span>
          <span>{formatDate(props.receivedTime)}</span>
        </h2>
        <h2>{props.subject}</h2>
      </div>
    </div>
    <Separator />
    </>
  );
};
