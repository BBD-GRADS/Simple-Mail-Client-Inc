import {Frame, Separator, Hourglass, Tabs, Tab, TabBody} from 'react95';

import React from 'react';
import { useMailList } from '../hooks';
import { Email } from './email';
import { useSentMailList } from '../hooks/useSentList';


export const YourMailWindow = (props) => {

  const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (value) => {
    setActiveTab(value);
    props.setActiveTab(value);
  };


  const [selected, setSelected] = React.useState(null);
  const [expanded, setExpanded] = React.useState([]);

  const {mailList, loading} = useMailList(props.onClick);
  const {sentList, sentLoading} = useSentMailList(props.onClick);

    return (
        <div
        style={{width: '40%', height: '100%', padding: '2% 1% 2% 2%'}}
        >
          <Tabs value={activeTab} onChange={handleChange}>
            <Tab value={0}>Inbox</Tab>
            <Tab value={1}>Sent</Tab>
          </Tabs>
          <TabBody shadow style={{lineHeight: '1.5', width: '100%', height: '100%', padding: '5%', overflowY: 'auto'}}>
            <h1 style={{fontSize: '18px', fontWeight: 'bold'}}>{props.user.username}'s Mail</h1>
            {loading && <Hourglass />}

            {!loading && (
              <>
              <Separator/>
        
              {activeTab === 0 && mailList}

              {activeTab === 1 && sentList}
              </>
            )}
            </TabBody>
        </div>
    );
  }