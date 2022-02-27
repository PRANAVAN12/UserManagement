import React from 'react';
import { withFormik } from 'formik';
import { object, string, ref } from 'yup';

import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { TextField } from '@fluentui/react/lib';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { ScrollablePane, ScrollbarVisibility } from '@fluentui/react';
import SearchDropdown from 'components/SearchDropdown';
function Form({
  isValid,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleFocus,
  handleSubmit,
  isSubmitting,
  buttonText,
  loading,
  setFieldValue,
  setFieldTouched,
}) {
  console.log(errors);
  return (
    <Stack>
      <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
        <form onSubmit={handleSubmit} className="form-custom">
          <Stack className="section-button">
            <div className="ms-Grid" dir="ltr">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-lg12">
                  <PrimaryButton
                    className="primary-btn"
                    disabled={!isValid || isSubmitting || loading}
                    onClick={handleSubmit}
                    text={loading ? 'Loading' : buttonText}
                  />
                </div>
              </div>
            </div>
          </Stack>

          <Stack>
            <div className="ms-Grid" dir="ltr">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-lg3">
                  <TextField
                    name="name"
                    label="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    disabled={isSubmitting}
                    placeholder="enter name here"
                    errorMessage={touched.name && errors.name}
                  />
                </div>
                <div className="ms-Grid-col ms-lg3">
                  <TextField
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    disabled={isSubmitting}
                    placeholder="enter email here"
                    errorMessage={touched.email && errors.email}
                  />
                </div>
                <div className="ms-Grid-col ms-lg3">
                  <Dropdown
                    label="Gender"
                    name="gender"
                    selectedKey={values.gender}
                    errorMessage={touched.gender && errors.gender}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    disabled={loading || isSubmitting}
                    onChange={(event, value) => {
                      setFieldValue('gender', value.key);
                    }}
                    placeholder="Choose the gender"
                    options={[
                      { key: 'Male', text: 'Male' },
                      { key: 'Female', text: 'Female' },
                    ]}
                  />
                </div>
              </div>
              <div className="ms-Grid-row">
            
               
                <div className="ms-Grid-col ms-lg3">
                  <DatePicker
                    name="date_of_birth"
                    label="Date Of Birth"
                    ariaLabel="choose a date"
                    placeholder="choose a date"
                    value={values.date}
                    disabled={isSubmitting}
                    onBlur={() => setFieldTouched('date_of_birth', true)}
                    errorMessage={touched.date_of_birth && errors.date_of_birth}
                    onSelectDate={(value) =>
                      setFieldValue('date_of_birth', value)
                    }
                  />
                  <Text styles={{ root: { color: '#a4252c', fontSize: 12 } }}>
                    {touched.date_of_birth && errors.date_of_birth}
                  </Text>
                </div>
              
                <div className="ms-Grid-col ms-lg3">
                  <TextField
                    name="mobile"
                    label="Phone"
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    disabled={isSubmitting}
                    placeholder="enter mobile here"
                    errorMessage={touched.mobile && errors.mobile}
                  />
                </div>
                <div className="ms-Grid-col ms-lg3">
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    disabled={isSubmitting}
                    placeholder="enter password here"
                    errorMessage={touched.password && errors.password}
                  />
                </div>
                <div className="ms-Grid-col ms-lg3">
                  <TextField
                    name="password_confirmation"
                    label="Password Confirmation"
                    type="password"
                    value={values.password_confirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    disabled={isSubmitting}
                    placeholder="enter password confirmation here"
                    errorMessage={
                      touched.password_confirmation &&
                      errors.password_confirmation
                    }
                  />
                </div>
                <div className="ms-Grid-col ms-lg12">
                  <TextField
                    name="address"
                    label="Address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    multiline
                    rows={3}
                    disabled={isSubmitting}
                    placeholder="enter eddress here"
                    errorMessage={touched.address && errors.address}
                  />
                </div>
              </div>
            </div>
          </Stack>
        </form>
      </ScrollablePane>
    </Stack>
  );
}

export default withFormik({
  validationSchema: object().shape({
    name: string().required('Name is a required field'),
    gender: string().required('Gender is a required field'),
    date_of_birth: string().required('Date of birth is a required field'),
    email: string().required('Email is a required field'),
    mobile: string().required('Phone is a required field'),
    address: string().required('Address is a required field'),
    password: string().required('Password is a required field'),
    password_confirmation: string()
      .required('Password confirmation is a required field')
      .oneOf([ref('password'), null], 'Passwords must match'),
  }),

  mapPropsToValues: ({ item = { is_smoking: true } }) => ({
    name: item?.name,
    email: item?.email,
    gender: item?.gender,
    date_of_birth: item?.date_of_birth,
    email: item?.email,
    mobile: item?.mobile,
    address: item?.address,
  }),
  handleSubmit: (values, { props, ...actions }) => {
    props.onSubmit(
      {
        ...values,
       
      },
      actions,
    );
  },
})(Form);
