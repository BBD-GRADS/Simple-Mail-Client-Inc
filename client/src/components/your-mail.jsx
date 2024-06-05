import {Frame, Separator, Hourglass} from 'react95';

import React from 'react';
import { useMailList } from '../hooks';
import { Email } from './email';


export const YourMailWindow = (props) => {

  const [selected, setSelected] = React.useState(null);
  const [expanded, setExpanded] = React.useState([]);

  const {mailList, loading} = useMailList(props.onClick);

    return (
        <div
        style={{width: '30%', height: '94%', padding: '2%'}}
        >
          <Frame
              variant='outside'
              shadow
              style={{lineHeight: '1.5', width: '100%', height: '100%', padding: '5%', overflowY: 'auto'}}
          >
            <h1>{props.user.username}'s Mail</h1>
            {loading && <Hourglass />}

            {!loading && (
              <>
              <Separator/>
              {mailList}
              </>
            )}
          </Frame>
        </div>
    );
  }