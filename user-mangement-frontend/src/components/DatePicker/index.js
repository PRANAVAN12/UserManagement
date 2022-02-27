import * as React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';

import {
    DatePicker,
    DayOfWeek,
    Dropdown,
    IDropdownOption,
    mergeStyles,
    defaultDatePickerStrings,
} from '@fluentui/react';



const rootClass = mergeStyles({ maxWidth: 300, selectors: { '> *': { marginBottom: 15 } } });
function DatePickerCompo({label}) {
    const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);
  return (
  
      <Stack horizontal horizontalAlign="space-between">
      <div className={rootClass}>
            <DatePicker
                firstDayOfWeek={firstDayOfWeek}
                placeholder={label}
                ariaLabel={label}
                // DatePicker uses English strings by default. For localized apps, you must override this prop.
                strings={defaultDatePickerStrings}
            />

        </div>
      </Stack>
   
  );
}

export default DatePickerCompo;
