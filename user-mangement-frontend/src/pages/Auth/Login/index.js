import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import Form from './Form';
import { useLogin } from './hooks';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import moment from 'moment';
import { detail, name } from 'config/env';

function Login({ history }) {
  const { onLogin, errorMessage, setErrorMessage } = useLogin();
  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      styles={{ root: { height: '100vh' } }}>
      <Stack
        styles={{
          root: {
            backgroundColor: '#eaeaea',
            padding: '10px',
            paddingLeft: '20px',
            paddingRight: '20px',
          },
        }}>
        {errorMessage && (
          <MessageBar
            messageBarType={MessageBarType.error}
            isMultiline={false}
            onDismiss={() => setErrorMessage(null)}
            dismissButtonAriaLabel="Close">
            {errorMessage}
          </MessageBar>
        )}

        <Form
          onSubmit={onLogin}
          errorMessage={errorMessage}
          name={name}
          history={history}
        />
        <Text
          styles={{
            root: {
              paddingTop: '5px',
              textAlign: 'center',
              fontSize: '12px',
              borderTop: '1px dotted #b2b3b7',
            },
          }}>
          Copyright © {moment().year()} {name}, All rights reserved. <br />
          {detail}.
        </Text>
      </Stack>
    </Stack>
  );
}

export default Login;
