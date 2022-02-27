import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { DatePicker, Label } from '@fluentui/react/lib';
import moment from 'moment';
import { Dropdown, DropdownMenuItemType } from '@fluentui/react/lib/Dropdown';

function DateRangePicker({ setFieldValue, values, setValues }) {
  const getDateRange = (range) => {
    let date = null;
    switch (range) {
      case 'today':
        setValues({
          ...values,
          range: range,
          from: moment().format('YYYY-MM-DD'),
          to: moment().format('YYYY-MM-DD'),
        });
        break;
      case 'this_week':
        setValues({
          ...values,
          range: range,
          from: moment().startOf('week').format('YYYY-MM-DD'),
          to: moment().endOf('week').format('YYYY-MM-DD'),
        });
        break;
      case 'this_month':
        setValues({
          ...values,
          range: range,
          from: moment().startOf('month').format('YYYY-MM-DD'),
          to: moment().endOf('month').format('YYYY-MM-DD'),
        });
        break;
      case 'this_year':
        setValues({
          ...values,
          range: range,
          from: moment().startOf('year').format('YYYY-MM-DD'),
          to: moment().endOf('year').format('YYYY-MM-DD'),
        });
        break;
      case 'yesterday':
        date = moment().subtract(1, 'day').format('YYYY-MM-DD');

        setValues({
          ...values,
          range: range,
          from: date,
          to: date,
        });
        break;
      case 'previous_week':
        date = moment().subtract(1, 'week');
        setValues({
          ...values,
          range: range,
          from: date.startOf('week').format('YYYY-MM-DD'),
          to: date.endOf('week').format('YYYY-MM-DD'),
        });
        break;
      case 'previous_month':
        date = moment().subtract(1, 'month');
        setValues({
          ...values,
          range: range,
          from: date.startOf('month').format('YYYY-MM-DD'),
          to: date.endOf('month').format('YYYY-MM-DD'),
        });
        break;
      case 'previous_year':
        date = moment().subtract(1, 'year');
        setValues({
          ...values,
          range: range,
          from: date.startOf('year').format('YYYY-MM-DD'),
          to: date.endOf('year').format('YYYY-MM-DD'),
        });
        break;
      case 'custom':
        setValues({
          ...values,
          range: range,
          from: moment().format('YYYY-MM-DD'),
          to: moment().format('YYYY-MM-DD'),
        });
        break;
      default:
        return false;
    }
  };
  return (
    <Stack>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg4">
          <Dropdown
            label="Date Range"
            selectedKey={values.range}
            placeholder="choose date range"
            options={[
              {
                key: 'current',
                text: 'Current',
                itemType: DropdownMenuItemType.Header,
              },
              {
                key: 'today',
                text: 'Today',
              },
              {
                key: 'this_week',
                text: 'This Week',
              },
              {
                key: 'this_month',
                text: 'This Month',
              },
              {
                key: 'this_year',
                text: 'This Year',
              },
              {
                key: 'previous',
                text: 'Previous',
                itemType: DropdownMenuItemType.Header,
              },
              {
                key: 'yesterday',
                text: 'Yesterday',
              },
              {
                key: 'previous_week',
                text: 'Previous Week',
              },
              {
                key: 'previous_month',
                text: 'Previous Month',
              },
              {
                key: 'previous_year',
                text: 'Previous Year',
              },
              {
                key: 'customHeader',
                text: 'Custom',
                itemType: DropdownMenuItemType.Header,
              },
              {
                key: 'custom',
                text: 'Custom',
              },
            ]}
            onChange={(ev, value) => {
              getDateRange(value ? value.key : '');
            }}
          />
        </div>
        <div className="ms-Grid-col ms-lg4">
          <Label>From</Label>
          <DatePicker
            required={true}
            value={values && values.from ? new Date(values.from) : new Date()}
            onSelectDate={(e) => {
              setFieldValue('from', moment(e).format('YYYY-MM-DD'));
            }}
            disabled={values.range !== 'custom'}
          />
        </div>
        <div className="ms-Grid-col ms-lg4">
          <Label>To</Label>
          <DatePicker
            required={true}
            value={values && values.to ? new Date(values.to) : new Date()}
            onSelectDate={(e) => {
              setFieldValue('to', moment(e).format('YYYY-MM-DD'));
            }}
            disabled={values.range !== 'custom'}
          />
        </div>
      </div>
    </Stack>
  );
}

export default DateRangePicker;
