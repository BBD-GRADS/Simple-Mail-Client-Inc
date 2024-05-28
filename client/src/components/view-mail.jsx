import { Toolbar, Frame, Button, Window, WindowHeader, WindowContent, TextInput, GroupBox, TreeView, Divider, Separator} from 'react95';

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

export const ViewMail = (props) => {
    return (
      <div
        style={{width: '70%', height: '94%', padding: '2%'}}
        >
          <Frame
              variant='outside'
              shadow
              style={{lineHeight: '1.5', width: '100%', height: '100%', padding: '2%'}}
          >
             <GroupBox label={props.sender}>
              <h2> {props.subject} </h2>
              <Separator/>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac aliquam justo. Phasellus vel metus sit amet est auctor ultrices eu et dui. Phasellus vitae nulla lacus. Cras pharetra feugiat neque, sit amet convallis sem imperdiet sit amet. Vestibulum lorem tortor, rhoncus eu massa eu, lacinia feugiat massa. Vivamus malesuada finibus iaculis. Sed ac velit tellus. Nulla facilisi. Nullam lorem risus, ullamcorper sit amet tincidunt eget, finibus non mauris. Sed vulputate accumsan laoreet. Quisque facilisis viverra risus, a tristique nisi lacinia et. Cras vel enim ut nisl volutpat mollis.
<br />
Aliquam ornare eget diam a aliquam. Curabitur vulputate fringilla erat et gravida. Nulla tristique lacus vel imperdiet pharetra. Morbi sed condimentum sem, non ultricies risus. Proin diam tortor, aliquet quis condimentum a, laoreet ut tortor. Suspendisse tristique quis enim id placerat. Morbi vestibulum, nulla at dapibus accumsan, nisi leo dignissim lectus, nec auctor justo sapien ut augue. Suspendisse ornare aliquam bibendum. Integer risus leo, sagittis eget viverra sit amet, sagittis eget libero.
<br />

Vivamus et vehicula neque. Curabitur vitae pretium nunc. Praesent consectetur dolor non mollis tristique. Vestibulum eget ultrices erat. Nam tempor placerat dui quis molestie. Ut efficitur ipsum eu eros feugiat, eget facilisis urna imperdiet. Donec vitae ex enim. Cras vel lacus ipsum. Fusce eu varius dui. Cras ac eros fringilla, pharetra neque non, facilisis tortor. Cras ultricies et nulla nec tincidunt. Mauris sollicitudin elementum lorem quis sagittis. Phasellus condimentum, massa quis venenatis pellentesque, metus mauris viverra turpis, sit amet euismod arcu nisl vitae lacus.
<br />

Quisque felis dui, ultricies at orci id, congue vestibulum felis. Praesent vitae tellus risus. Proin massa urna, malesuada sit amet eros at, auctor mattis sem. Morbi tincidunt rutrum dui, vel congue turpis luctus quis. Donec scelerisque et ligula eu pretium. Nullam laoreet vulputate fringilla. Pellentesque ornare accumsan libero id cursus. Nam auctor condimentum augue ut porta. Pellentesque efficitur congue massa id sollicitudin. Donec fermentum eros velit, ut varius est aliquam eu.</p>
             </GroupBox>
          </Frame>
        </div>
    );
  }