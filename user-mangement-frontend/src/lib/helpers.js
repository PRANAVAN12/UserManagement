import moment from 'moment';
import * as config from 'config/env';
import omitBy from 'lodash-es/omitBy';
import isEmpty from 'lodash-es/isEmpty';
import { parse, stringify } from 'querystring';

export function resolveRedirect(hash) {
  try {
    const { state } = parse(hash.replace(config.queryDelimiter, ''));
    const { redirect } = JSON.parse(window.atob(state));
    return redirect;
  } catch (e) {
    return null;
  }
}

export function toDate(date) {
  return moment.utc(date).local().format(config.dateFormat);
}

export function toDateTime(dateString) {
  return moment.utc(dateString).local().format(config.dateTimeFormat);
}

export function urlStringify(values) {
  return stringify(
    omitBy(values, (value) => {
      if (typeof value === 'number') {
        value = String(value);
      }

      return isEmpty(value);
    }),
  );
}
export function urlSearch(search) {
  return parse(search.replace('?', ''));
}
export function searchRoute(location, obj, isQuery = true) {
  if (isQuery) {
    obj['page'] = 1;
  }
  return {
    ...location,
    search: urlStringify({ ...urlSearch(location.search), ...obj }),
  };
}
