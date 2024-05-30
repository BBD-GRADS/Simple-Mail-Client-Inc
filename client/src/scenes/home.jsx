import React from 'react';
import { AppBar, Toolbar,Button} from 'react95';

import { InboxWindow } from '../components/inbox-window';
import { YourMailWindow } from '../components/your-mail';
import { ViewMail } from '../components/view-mail';

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