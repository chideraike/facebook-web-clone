import React from 'react'

import OutsideClick from '../hooks/OutsideClick';

function NavItem(props) {
    const { open, setOpen, ref } = OutsideClick(false);

    const handleOpen = () => {
        setOpen((open) => !open)
    }

    return (
        <li className="nav-item" ref={ref}>
            <a href="#" className="icon-button" onClick={handleOpen}>
                {props.icon}
            </a>
            {open && props.children}
        </li>
    );
}

export default NavItem;