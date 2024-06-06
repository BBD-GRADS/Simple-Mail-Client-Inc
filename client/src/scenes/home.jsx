import React from 'react';
import { AppBar, Toolbar,Button, Separator} from 'react95';

import { ComposeEmailWindow } from '../components/inbox-window';
import { YourMailWindow } from '../components/your-mail';
import { ViewMail } from '../components/view-mail';
import { UserAvatar } from '../components/user-avatar';

export const Home = (props) => {

    const [showMail, setShowMail] = React.useState(false);

    const [viewingEmail, setViewingEmail] = React.useState(null);
    
    return (
            <><nav>
            <AppBar style={{ zIndex: 3 }}>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <div style={{alignItems: 'center', display: 'flex'}}>
                      <UserAvatar
                          sender={props.user.username}
                        />
                        <h1 style={{fontWeight: 'bold', padding: '0 1vh'}}>
                          {props.user.username}  
                        </h1>
                      <Separator orientation='vertical' size='43px' />
                      <div
                        style={{padding: '0 1vh'}}
                      >
                      <Button 
                        onClick={() => setShowMail(true)}
                      >  
                        Compose Mail
                      </Button>
                      </div>
                    </div>
                    <Button
                        onClick={() => {props.logoutFunction()}}
                    >Logout</Button>
                </Toolbar>
            </AppBar>
        </nav>
        <main style={{ width: '100vw', display: 'flex', flexDirection: 'row', height: '90vh', top: '5vh', position: 'absolute' }}>
                <YourMailWindow
                  user={props.user}
                  onClick={(val) => {
                    setViewingEmail(val);
                  }
                }
                />
                <ViewMail
                  {...viewingEmail}
                />
        </main>
        {showMail && (
        <ComposeEmailWindow
            setShowMail={setShowMail}
        />
        )}
        </>        
    );
}