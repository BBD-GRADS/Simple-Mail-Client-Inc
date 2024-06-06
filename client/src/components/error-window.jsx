import React, { useState } from 'react';
import { Toolbar, Frame, Button, Window, WindowHeader, WindowContent, Tabs, Tab, TextInput} from 'react95';
import {User4, Attach} from '@react95/icons';
import '@react95/icons/icons.css';
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

export const ErrorWindow = (props) => {

  React.useEffect(() => {
    var audio = new Audio('https://www.myinstants.com/media/sounds/mission-failed-well-get-em-next-time-sound-effect-zxhixnbk.mp3');
    audio.play();

    
    }, [

  ]);

  return (
    <Wrapper>
      <Window className='window' style={{ position: 'absolute', width: '60vw', left: '20vw', height: 'auto', top: '25vh' }}>
        <WindowHeader className='window-title'>
          <span>Error</span>
          <Button onClick={() => 
            {
              props.setShowError('');
            }}>
            <span className='close-icon' />
          </Button>
        </WindowHeader>
        <WindowContent>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1vh'
          }}
          >
            <div style={{fontWeight: 'bold'}}>
              <User4 variant="32x32_4" size={'10vh'}/>
              {props.message}
            </div>
            <Button onClick={() => 
            {
              props.setShowError('');
            }}>I am disappointed in myself</Button>
          </div>
        </WindowContent>
      </Window>
    </Wrapper>
  );
};
