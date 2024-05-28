import { Toolbar, Frame, Button, Window, WindowHeader, WindowContent, TextInput} from 'react95';

import { styled } from 'styled-components';


import original from 'react95/dist/themes/original';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

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
}`;

export const InboxWindow = (props) => {
    return (
      <Wrapper>
        <Window className='window' style={{position: 'absolute', width: '60vw', left: '20vw', height: '70vh', top: '15vh'}}>
          <WindowHeader className='window-title'>
            <span>New Mail</span>
            <Button
              onClick={() => props.setShowMail(false)}
            >
              <span className='close-icon' />
            </Button>
          </WindowHeader>
          <WindowContent>
          <TextInput
            value={''}
            placeholder='Recipient'
            onChange={() => {}}
            fullWidth
            />
            <br/>
            <TextInput
            value={''}
            placeholder='Subject'
            onChange={() => {}}
            fullWidth
            />
            <br/>
            <TextInput multiline rows={12} placeholder={'Type your message...'} fullWidth />
            <br/>
            <Button>Send!</Button>
          </WindowContent>
         
        </Window>
      </Wrapper>
    );
  }