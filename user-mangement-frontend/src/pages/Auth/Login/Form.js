import React from 'react';
import { withFormik } from 'formik';
import { object, string } from 'yup';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { ReactComponent as Logo } from 'assets/svg/blank-icon.svg';

function Form({
  history,
  isValid,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleFocus,
  handleSubmit,
  isSubmitting,
  name,
}) {
  return (
    <form action="" onSubmit={handleSubmit}>
      <Stack horizontalAlign="center" verticalAlign="center">
        <Stack styles={{ root: { width: '400px', height: '100%' } }}>
          <Stack horizontalAlign="center">
            <Logo className="logo-image" />
            <Text variant={'small'}>Enter your email & password to login</Text>
          </Stack>
          <TextField
            name="username"
            label="Email"
            value={values.username}
            disabled={isSubmitting}
            placeholder="hint: email@example.com"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            errorMessage={touched.username && errors.username}
          />

          <TextField
            type="password"
            name="password"
            label="Password"
            value={values.password}
            placeholder="Please enter your password here"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            onFocus={handleFocus}
            errorMessage={touched.password && errors.password}
            styles={{ root: { marginBottom: '10px' } }}
            canRevealPassword
            revealPasswordAriaLabel="Show password"
          />

          <PrimaryButton
            className="login-btn"
            text={isSubmitting ? 'Logging...' : 'LOGIN'}
            disabled={!isValid || isSubmitting}
            onClick={handleSubmit}
            styles={{ root: { marginBottom: '10px' } }}
          />
        </Stack>
      </Stack>
    </form>
  );
}

export default withFormik({
  validationSchema: object().shape({
    username: string().required('Email address is a required field'),
    password: string().required('Password is a required field'),
  }),
  handleSubmit: (values, { props, ...actions }) => {
    props.onSubmit(values, actions);
  },
})(Form);
