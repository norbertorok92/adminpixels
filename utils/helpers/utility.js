import { Map } from 'immutable';

export function arrayEqual(array1, array2) {
  return array1.sort().toString() == array2.sort().toString();
}