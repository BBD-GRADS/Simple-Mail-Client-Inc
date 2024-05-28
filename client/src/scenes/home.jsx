import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset, AppBar, Toolbar, TextInput, Frame, Button, MenuList, Separator, MenuListItem} from 'react95';

import original from 'react95/dist/themes/original';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import { InboxWindow } from '../components/inbox-window';
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

export const Home = (props) => {

    const [showMail, setShowMail] = React.useState(false);
    
    return (
            <><nav>
            <AppBar style={{ zIndex: 3 }}>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <Button
                        onClick={() => setShowMail(true)}
                    >Compose Mail</Button>
                    <Button
                        onClick={() => {props.logoutFunction(); console.log(props);}}
                    >Logout</Button>
                </Toolbar>
            </AppBar>
        </nav>
        <main style={{ width: '100vw', display: 'flex', flexDirection: 'row', height: '90vh', top: '5vh', position: 'absolute' }}>
                <YourMailWindow />
                <ViewMail
                    sender={'USERNAME1'} />
        </main>
        {showMail && (
        <InboxWindow
            setShowMail={setShowMail}
        />
        )}
        </>        
    );
}