import React, { useState } from 'react';
import { Toolbar, Frame, Button, Window, WindowHeader, WindowContent, Tabs, Tab, TextInput } from 'react95';
import { styled } from 'styled-components';
import {User4, Attach} from '@react95/icons';
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

  const [attachments, setAttachments] = React.useState([]);
  const fileInputRef = React.useRef(null);

  const addAttachment = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader);
      const newAttachment = {
        filename: file.name,
        content: reader.result
      };
      setAttachments([...attachments, newAttachment]);
    };
    console.log(file);
    reader.readAsDataURL(file);
  }

  const openFileSelector = () => {
    fileInputRef.current.click();
  };

  // Function to handle file selection
  const handleFileInputChange = (event) => {
    console.log(event);
    const file = event.target.files[0];
    if (file) {
      addAttachment(file);
    }
  };

  // Function to remove attachment
  const removeAttachment = (index) => {
    const updatedAttachments = [...attachments];
    updatedAttachments.splice(index, 1);
    setAttachments(updatedAttachments);
  };

  const handleSendClick = async () => {

    const needle = 'drop tables';
    if (recipient.toLowerCase().includes(needle) || subject.toLowerCase().includes(needle) || message.toLowerCase().includes(needle))
      {
        props.setShowError('Oh wow, SQL injection! Look at mister/missus/person hacker man/woman/person here! Hey everyone, look, they got reeeaall creative. Have you considered running for POTUS? You\'ll make some real differences there buddy. I hope you are as dissapointed in yourself as I am...')
      }
    else {

      await postEmail({
        to: recipient,
        subject: subject,
        text: message,
        attachments: attachments
      });
      props.setShowMail(false);
  
    }

    };

  return (
    <Wrapper>
      <Window className='window' style={{ position: 'absolute', width: '50vw', left: '25vw', height: 'auto', top: '10vh' }}>
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
          <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' }}>
            <div>
              <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                <Button onClick={openFileSelector}>
                  <Attach variant="16x16_4" style={{ marginRight: '8px' }} />
                  Attach File
                </Button>
              </label>
              <input
                type="file"
                id="fileInput"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(event) => handleFileInputChange(event)}
              />
            </div>

            {/* Display attachments */}
            <div style={{flexDirection: 'row', gap: '12px'}}>
              {attachments.map((attachment, index) => (
                <Button key={index} onClick={() => removeAttachment(index)}>
                  {attachment.filename}
                </Button>
              ))}
            </div>
          </div>
          
          
          <br />
          <Button onClick={handleSendClick}>Send!</Button>
        </WindowContent>
      </Window>
    </Wrapper>
  );
};
