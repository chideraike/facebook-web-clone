import React, { useState, useEffect, useRef } from 'react';

import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';

import { ReactComponent as ProfileIcon } from './icons/profile.svg';

import './index.css';
import { CSSTransition } from 'react-transition-group';
import {
  facebookIcon,
  twitterIcon,
  instagramIcon,
  youtubeIcon,
  whatsappIcon,
  snapchatIcon,
  linkedinIcon
} from './socials';

function App() {
  return (
    <Navbar>
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<MessengerIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<CaretIcon />}>
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
}

function DropdownMenu() {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href={props.onSocial} className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  function DropdownSubTitle(props) {
    return (
      <h4>{props.children}</h4>
    );
  }

  function DropdownTitle(props) {
    return (
      <h2>{props.children}</h2>
    );
  }

  function social(props) {
    props.facebookClick = window.open('https://www.facebook.com/');
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem
            leftIcon={<ProfileIcon />}
          >
            <DropdownTitle>
              Chidera Ike
            </DropdownTitle>
          </DropdownItem>
          <DropdownItem
            leftIcon={<BoltIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="socials"
          >
            <DropdownSubTitle>
              Network
            </DropdownSubTitle>
          </DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings"
          >
            <DropdownSubTitle>
              Settings & Privacy
            </DropdownSubTitle>
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'socials'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main">
            <DropdownTitle>
              My Social Links
            </DropdownTitle>
          </DropdownItem>
          <DropdownItem
            leftIcon={<facebookIcon />}
            onSocial={social.facebookClick}
          >
            <DropdownSubTitle>Facebook</DropdownSubTitle>
          </DropdownItem>
          <DropdownItem
            leftIcon={<twitterIcon />}
          >
            <DropdownSubTitle>Twitter</DropdownSubTitle>
          </DropdownItem>
          <DropdownItem
            leftIcon={<instagramIcon />}
          >
            <DropdownSubTitle>Instagram</DropdownSubTitle>
          </DropdownItem>
          <DropdownItem
            leftIcon={<youtubeIcon />}
          >
            <DropdownSubTitle>YouTube</DropdownSubTitle>
          </DropdownItem>
          <DropdownItem
            leftIcon={<whatsappIcon />}
          >
            <DropdownSubTitle>WhatsApp</DropdownSubTitle>
          </DropdownItem>
          <DropdownItem
            leftIcon={<snapchatIcon />}
          >
            <DropdownSubTitle>Snapchat</DropdownSubTitle>
          </DropdownItem>
          <DropdownItem
            leftIcon={<linkedinIcon />}
          >
            <DropdownSubTitle>LinkedIn</DropdownSubTitle>
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main">
            <DropdownTitle>
              Settings & Privacy
            </DropdownTitle>
          </DropdownItem>
          <DropdownItem>
            <DropdownSubTitle>Get the code</DropdownSubTitle>
          </DropdownItem>
          <DropdownItem>
            <DropdownSubTitle>Settings</DropdownSubTitle>
          </DropdownItem>
          <DropdownItem>
            <DropdownSubTitle>Settings</DropdownSubTitle>
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

export default App;
