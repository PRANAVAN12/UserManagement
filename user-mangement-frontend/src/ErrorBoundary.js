import React, { Component } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/Stack';
import { PrimaryButton } from '@fluentui/react/lib/Button';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToOurService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Stack
          verticalAlign="center"
          horizontalAlign="center"
          styles={{ root: { flex: 1 } }}
          tokens={{ childrenGap: 15 }}>
          <Text variant={'large'}>Doh! something went wrong...</Text>
          <PrimaryButton
            text="Try again"
            onClick={() => {
              window.localStorage.clear();
              window.location.reload();
            }}
          />
        </Stack>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
