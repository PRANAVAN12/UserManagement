import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Nav } from '@fluentui/react/lib/Nav';
import { Stack } from '@fluentui/react/lib/Stack';
import * as routes from 'constants/routes';
import {
  ScrollablePane,
  ScrollbarVisibility,
} from '@fluentui/react/lib/ScrollablePane';

function SideBar({ history, location }) {
  const [isExpanded, setExpanded] = useState('');
  const links = useRef(null);
  const menuItems = [
    {
      key: 'home',
      name: 'Home',
      icon: 'Home',
      route: routes.HOME,
    },
    {
      key: 'user',
      name: 'User',
      icon: 'Hotel',
      route: routes.USER,
    },
  
  
   
   
    
    
  ];

  links.current = menuItems;
  const activeLink = links.current.find((item) =>
    routes.HOME === item.route
      ? item.route === location.pathname
      : location.pathname.includes(item.route),
  );

  return (
    <Stack styles={{ root: { marginTop: 48 } }}>
      <Stack
        styles={{
          root: {
            height: '100%',
            minWidth: '250px',
            position: 'relative',
            backgroundColor: '#34444c',
          },
        }}>
        <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
          <Nav
            groups={[{ links: links.current }]}
            selectedKey={activeLink && activeLink.key}
            onLinkExpandClick={(event, item) => {
              setExpanded(!item.isExpanded ? item.key : '');
            }}
            onLinkClick={(event, item) => {
              if (item.route !== undefined) {
                history.push(item.route);
              }
            }}
            styles={{
              root: {
                width: '250px',
                height: '100%',
              },
              compositeLink: {
                background: 'transparent',
                selectors: {
                  '.ms-Nav-chevronButton': {
                    display: 'none',
                  },
                  '&:hover': {
                    color: '#fff',
                    background: '#657177',
                  },
                  '&.is-selected': {
                    color: '#fff',
                    background: '#657177',
                  },
                  '.ms-Button-icon': {
                    color: '#fff !important',
                  },
                  '.ms-Button-icon:hover': {
                    color: '#fff !important',
                  },
                  '&.is-selected .ms-Nav-link': {
                    fontWeight: 'bold',
                    color: '#fff',
                    background: '#657177',
                  },
                  '&.is-selected:hover .ms-Nav-link': {
                    color: '#fff',
                    background: '#657177',
                  },
                },
              },
              link: {
                minHeight: 35,
                color: '#fff',
                borderRadius: 0,
                selectors: {
                  '&:after': {
                    border: 'none',
                  },
                  '&:hover': {
                    color: '#fff !important',
                    background: '#858F94 !important',
                  },
                },
              },
            }}
          />
        </ScrollablePane>
      </Stack>
    </Stack>
  );
}

SideBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default withRouter(SideBar);
