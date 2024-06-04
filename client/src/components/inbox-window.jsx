import React, { useState } from 'react';
import { Toolbar, Frame, Button, Window, WindowHeader, WindowContent, TextInput } from 'react95';
import { styled } from 'styled-components';
import { postEmail } from '../resolvers';

const Wrapper = styled.div`
  .window-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .close-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: -1px;
    margin-top: -1px;
    transform: rotateZ(45deg);
    position: relative;
    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.materialText};
    }
    &:before {
      height: 100%;
      width: 3px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:after {
      height: 3px;
      width: 100%;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}`;

export const ComposeEmailWindow = (props) => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = async () => {
    await postEmail({
      to: recipient,
      subject: subject,
      text: message
    });
    props.setShowMail(false);
  };

  return (
    <Wrapper>
      <Window className='window' style={{ position: 'absolute', width: '60vw', left: '20vw', height: '70vh', top: '15vh' }}>
        <WindowHeader className='window-title'>
          <span>New Mail</span>
          <Button onClick={() => props.setShowMail(false)}>
            <span className='close-icon' />
          </Button>
        </WindowHeader>
        <WindowContent>
          <TextInput
            value={recipient}
            onChange={handleRecipientChange}
            placeholder='Recipient'
            fullWidth
          />
          <br />
          <TextInput
            value={subject}
            onChange={handleSubjectChange}
            placeholder='Subject'
            fullWidth
          />
          <br />
          <TextInput
            value={message}
            onChange={handleMessageChange}
            multiline
            rows={12}
            placeholder={'Type your message...'}
            fullWidth
          />
          <br />
          <Button onClick={handleSendClick}>Send!</Button>
        </WindowContent>
      </Window>
    </Wrapper>
  );
};
