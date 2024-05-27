import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset, AppBar, Toolbar, TextInput, Frame, Button, MenuList, Separator, MenuListItem} from 'react95';

import original from 'react95/dist/themes/original';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import { MailWindow } from './components/mail-window';


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

function App() {
 
  const [showMail, setShowMail] = React.useState(false);

  return (
      <><GlobalStyles /><ThemeProvider theme={original}>
          <nav>
              <AppBar style={{ zIndex: 3 }}>
                  <Toolbar style={{ justifyContent: 'space-between' }}>
                      <Button
                        onClick={() => setShowMail(true)}
                      >Compose Mail</Button>
                      <TextInput
                          placeholder="Search..."
                          width={150}
                          style={{ marginLeft: 'auto' }}
                      />
                  </Toolbar>
              </AppBar>
          </nav>
          <main>
              <div>
                <Frame
                    variant='outside'
                    shadow
                    style={{lineHeight: '1.5', width: '30vw'  , top: '5vh', height: '80vh', margin: '1.25vw', padding: '1vw'}}
                >
                 <h1>Your Mail</h1>
                 <MenuList style={{width: '100%'}}>
                  <MenuListItem>Item 1</MenuListItem>
                  <Separator />
                  <MenuListItem>Item 2</MenuListItem>
                  <Separator />
                  <MenuListItem>Item 3</MenuListItem>
                </MenuList> 
                </Frame>

                <Frame
                    variant='outside'
                    shadow
                    style={{lineHeight: '1.5', width: '60vw'  , top: '5vh', height: '80vh', margin: '1.25vw'}}
                >
                 <h1 style={{ padding: '0.5rem'}}>Message Content</h1>    
                   
                </Frame>

              </div>
          </main>
          {showMail && (
          <MailWindow
            setShowMail={setShowMail}
          />
          )}
          
      </ThemeProvider></>
  );
}

export default App;
