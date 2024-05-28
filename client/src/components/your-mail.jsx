import { Toolbar, Frame, Button, Window, WindowHeader, WindowContent, TextInput, GroupBox, TreeView} from 'react95';

import React from 'react';

import * as Icons from '@react95/icons';

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

const categories = [
  {
    id: 'USERNAME1',
    label: 'USERNAME1',
    icon: <Icons.Person116 />,
    items: [
      {
        id: '1',
        label: 'Re: Collection of Passport',
        icon: <Icons.Mail />,
      },
      {
        id: '2',
        label: 'Hello Mom and Dad',
        icon: <Icons.Mail />,
      },
    ]
  },
  {
    id: 'USERNAME2',
    label: 'EPIC_LORD_23213',
    icon: <Icons.Person116 />,
    items: [
      {
        id: '3',
        label: 'I AM THE WALRUS',
        icon: <Icons.Mail />,
      },
      {
        id: '4',
        label: 'My favorite songs about the sky',
        icon: <Icons.Mail />,
      },
    ]
  },
];

export const YourMailWindow = (props) => {

  const [selected, setSelected] = React.useState(null);
  const [expanded, setExpanded] = React.useState([]);

    return (
        <div
        style={{width: '30%', height: '94%', padding: '2%'}}
        >
          <Frame
              variant='outside'
              shadow
              style={{lineHeight: '1.5', width: '100%', height: '100%', padding: '5%'}}
          >
            <h1>Your Mail</h1>
              <TreeView
                tree={categories}
                onNodeSelect={(_, id) => {console.log(id); setSelected(id);}}
                onNodeToggle={(_, ids) => setExpanded(ids)}
                expanded={expanded}
                selected={selected}
              />
          </Frame>
        </div>
    );
  }