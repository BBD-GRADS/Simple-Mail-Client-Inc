import {Frame, Separator, Hourglass, Tabs, Tab, TabBody, Button} from 'react95';
import {Progman44, Progman45} from '@react95/icons';
import React from 'react';
import { useMailList } from '../hooks';
import { Email } from './email';
import { useSentMailList } from '../hooks/useSentList';


export const YourMailWindow = (props) => {

  const [activeTab, setActiveTab] = React.useState(0);

  const [currentPage, setCurrentPage] = React.useState(1);

  const handleChange = (value) => {
    setActiveTab(value);
    setCurrentPage(1);
    props.setActiveTab(value);
  };


  const [selected, setSelected] = React.useState(null);
  const [expanded, setExpanded] = React.useState([]);

  const {mailList, loading, hasNext, hasPrev} = useMailList(props.onClick);
  const {sentList, sentLoading} = useSentMailList(props.onClick);

    return (
        <div
        style={{width: props.large ? '100%' : '40%', height: '100%', padding: '2% 1% 2% 2%'}}
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
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button onClick={() => {
                  if (hasPrev) {
                    setCurrentPage(currentPage - 1);
                  }
                }}>
                  <Progman44 variant={hasPrev ? "32x32_1" : "32x32_4"} />
                </Button>
                <Button onClick={() => {
                  if (hasNext) {
                    setCurrentPage(currentPage + 1);
                  }
                }}>
                  <Progman45 variant={hasNext ? "32x32_1" : "32x32_4"}/>
                </Button>
              </div>
              <Separator/>
        
              {activeTab === 0 && mailList}

              {activeTab === 1 && sentList}
              </>
            )}
            </TabBody>
        </div>
    );
  }