import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import last from 'lodash-es/last';
import { Text } from '@fluentui/react/lib/Text';
import { Label } from '@fluentui/react/lib/Label';
import { getTheme } from '@fluentui/react/lib/Styling';
import { CompactPeoplePicker } from '@fluentui/react/lib/Pickers';
import { searchItems } from 'actions/search';
import SuggestionsItem from './SuggestionsItem';
import Item from './Item';

function SearchDropdown({
  url,
  label,
  value,
  onBlur,
  onChange,
  errorMessage,
  required,
  ...props
}) {
  const theme = getTheme();
  const dispatch = useDispatch();
  const { getValue, getText, getImage, getPresence, placeholder, disabled } =
    props;

  const handleSearch = useCallback(
    async (query) => {
      let items;
      query = typeof query === 'string' ? query : '';

      try {
        const response = await dispatch(
          searchItems(url.replace('{query}', query)),
        );
        items = response?.data;
      } catch (e) {}
      return items;
    },

    [dispatch, url],
  );

  return (
    <div>
      {label && <Label required={required}>{label}</Label>}
      <CompactPeoplePicker
        onBlur={onBlur}
        resolveDelay={300}
        disabled={disabled}
        getTextFromItem={getText}
        onEmptyInputFocus={handleSearch}
        onResolveSuggestions={handleSearch}
        onChange={(item) => onChange(last(item))}
        selectedItems={value ? [value] : null}
        inputProps={{
          placeholder: value.id ? '' : placeholder,
        }}
        onRenderItem={(props) => (
          <Item key={props.index} item={props.item} getText={getText} />
        )}
        onRenderSuggestionsItem={(item) => (
          <SuggestionsItem
            item={item}
            getText={getText}
            getValue={getValue}
            getImage={getImage}
            getPresence={getPresence}
          />
        )}
        styles={{
          root: {
            backgroundColor: '#fff',
            selectors: {
              '.ms-BasePicker-text': {
                borderColor: errorMessage ? theme.palette.redDark : undefined,
              },
            },
          },
        }}
      />
      {errorMessage && (
        <Text
          variant="xSmall"
          styles={{
            root: {
              color: theme.semanticColors.errorText,
            },
          }}>
          {errorMessage}
        </Text>
      )}
    </div>
  );
}

export default SearchDropdown;
