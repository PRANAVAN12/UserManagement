import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/Stack';
import { IconButton, ActionButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { getUser } from 'selectors/auth';
import { logout } from 'actions/auth';
import styles from './Right.module.css';

const signOutIcon = { iconName: 'SignOut' };

function Right({ history }) {
  const panelRef = useRef(null);
  const user = useSelector(getUser);

  const [showPanel, setShowPanel] = useState(false);
  const dispatch = useDispatch();

  return (
    <Stack horizontal>
      <Stack
        horizontal
        verticalAlign="center"
        styles={{ root: { cursor: 'pointer' } }}
        tokens={{ padding: 15, childrenGap: 10 }}>
        <Text className={styles['profile-text']}>{user.name}</Text>
        <Persona
          onClick={() => setShowPanel(!showPanel)}
          text={user.fullName}
          initialsColor="#037ef3"
          onRenderPrimaryText={null}
          size={PersonaSize.size40}
          styles={{ root: { marginRight: '-25px' } }}
          imageUrl={user.image_url}
        />
      </Stack>
      <Stack>
        <Panel
          customWidth={300}
          isOpen={showPanel}
          componentRef={panelRef}
          isLightDismiss={true}
          type={PanelType.custom}
          onDismiss={() => setShowPanel(false)}
          styles={{
            root: {
              position: 'absolute',
              marginTop: '50px',
            },
          }}
          onRenderNavigation={() => (
            <Stack
              horizontal
              verticalAlign="center"
              horizontalAlign="space-between"
              tokens={{ childrenGap: 30, padding: 15 }}>
              <Text variant={'xLarge'}>My Account</Text>
              <IconButton
                iconProps={{
                  iconName: 'Clear',
                  styles: {
                    root: {
                      fontSize: 12,
                    },
                  },
                }}
                onClick={() => setShowPanel(false)}
              />
            </Stack>
          )}>
          <Stack tokens={{ childrenGap: 30 }}>
            <Persona
              text={user.fullName}
              secondaryText={user.email}
              initialsColor="#00c1b2"
              size={PersonaSize.size52}
              imageUrl={user.avatar}
            />
            <Stack>
              <ActionButton
                iconProps={signOutIcon}
                allowDisabledFocus
                onClick={() => dispatch(logout())}>
                Sign out
              </ActionButton>
            </Stack>
          </Stack>
        </Panel>
      </Stack>
    </Stack>
  );
}

export default Right;
