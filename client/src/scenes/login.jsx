import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset, AppBar, Toolbar, TextInput, Frame, Button, MenuList, Separator, MenuListItem, Window, WindowHeader, WindowContent, Hourglass} from 'react95';

import original from 'react95/dist/themes/original';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import { ComposeEmailWindow } from '../components/inbox-window';
import { YourMailWindow } from '../components/your-mail';
import { ViewMail } from '../components/view-mail';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
  }
`;

export const Login = (props) => {
    
    return (
      <div className='window-container' style={{ display: 'flex', 
      flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}>
        <p> The wait is finally over! Introducing...</p>
        <br/>
        <p>Mail95</p>
      <Window className='window' style={{ width: '30vw', height: '40vh'}}>
        <WindowHeader className='window-title'>
          <span>Log In - Simple Mail Client</span>
        </WindowHeader>
        <WindowContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80%'}}>
          <p>To use this application, you need to</p>
          <p>authenticate with Google.</p>
          <br />
          <Button>Authenticate</Button>
          {/* <Hourglass size={32} style={{ margin: 20 }} /> */}
        </WindowContent>
      </Window>
      <p>Proudly sponsored by Internet Explorer™️</p>
    </div>
    
    );
}