import React, { useState, useEffect, useRef } from 'react';

import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';
import { ReactComponent as MoonIcon } from './icons/moon.svg';

import { ReactComponent as ProfileIcon } from './icons/profile.svg';

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

import DarkModeToggle from "./darkmode/DarkModeToggle";
import OutsideClick from './hooks/OutsideClick';

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
      <a href={props.link} className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
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
            leftIcon={<MoonIcon />}
            rightIcon={<DarkModeToggle />}
          >
            <DropdownSubTitle>
              Dark Mode
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
            link={'https://www.facebook.com/ChideraSIke'}
          >
            <DropdownSubTitle>Facebook</DropdownSubTitle>
          </DropdownItem>
          <DropdownItem
            leftIcon={<twitterIcon />}
            link={'https://www.twitter.com/chidera_si'}
          >
            <DropdownSubTitle>Twitter</DropdownSubTitle>
          </DropdownItem>
          <DropdownItem
            leftIcon={<instagramIcon />}
            link={'https://www.instagram.com/chidera_si'}
          >
            <DropdownSubTitle>Instagram</DropdownSubTitle>
          </DropdownItem>
          <DropdownItem
            leftIcon={<youtubeIcon />}
            link={'https://www.youtube.com/channel/UCSkwxsaDMuz1crikMQBbPoQ'}
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
            link={'https://www.snapchat.com/chidera_si'}
          >
            <DropdownSubTitle>Snapchat</DropdownSubTitle>
          </DropdownItem>
          <DropdownItem
            leftIcon={<linkedinIcon />}
            link={'https://www.linkedin.com/in/chideraike'}
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
          <DropdownItem
            link={'https://github.com/chideraike/facebook-web-clone'}
          >
            <DropdownSubTitle>Get the code</DropdownSubTitle>
          </DropdownItem>
          <DropdownItem>
            <DropdownSubTitle>Thanks for checking this out</DropdownSubTitle>
          </DropdownItem>
          <DropdownItem
            link={'/'}
          >
            <DropdownSubTitle>Log Out</DropdownSubTitle>
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

export default App;
