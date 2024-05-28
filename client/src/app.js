import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset, AppBar, Toolbar, TextInput, Frame, Button, MenuList, Separator, MenuListItem} from 'react95';

import original from 'react95/dist/themes/original';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import { Home } from './scenes/home';
import { Login } from './scenes/login';


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

export const App = () => {

  const [hasAuth, setHasAuth] = React.useState(false);

  console.log(hasAuth)

  return (
      <>
      <GlobalStyles />
      <ThemeProvider theme={original}>

      {hasAuth && 
        (
        <Home
          logoutFunction={() => setHasAuth(false)}
        />
        )
      }

      {!hasAuth && 
        (
        <Login
          logoutFunction={() => setHasAuth(false)}
        />
        )
      }

      </ThemeProvider></>
  );
}
