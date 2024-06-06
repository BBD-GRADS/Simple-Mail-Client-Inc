import React from 'react';
import { Avatar } from 'react95';

export const UserAvatar = (props) => {
    const colors = [
        'palevioletred',
        'lightseagreen',
        'darkorange',
        'cornflowerblue',
        'mediumorchid',
        'tomato',
        'mediumspringgreen',
        'slateblue'
        // Add more colors if needed
    ];

    const getSenderInitials = () => {
        const parts = props.sender.split('@');
        if (parts.length !== 2) {
            console.log("Invalid email format");
            return;
        }
        const name = parts[0];
        const nameParts = name.split('.');
        let initials = '';
        for (let i = 0; i < nameParts.length; i++) {
            initials += nameParts[i][0];
            if (initials.length >= 2) {
                break;
            }
        }
        return initials.toUpperCase();
    }

    const getColorIndex = () => {
        const hash = props.sender
            .split('')
            .reduce((acc, char) => (acc * 31) + char.charCodeAt(0), 0);
        return Math.abs(hash) % colors.length;
    }

    const colorIndex = getColorIndex();

    return (
        <Avatar size={50} style={{ background: colors[colorIndex] }}>
            {getSenderInitials()}
        </Avatar>
    );
};
