import React from 'react';
import { Separator } from 'react95';

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

  return (
    <>
      <div testid={props.sender} style={{overflow: 'hidden'}} onClick={() => {
        handleClick();
        }}>
        <h2>{props.sender}</h2>
        <h2>{props.subject}</h2>
        <Separator />
      </div>
    </>
  );
};
