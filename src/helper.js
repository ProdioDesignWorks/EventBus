import is from 'is';

export const isEmpty = obj => (is.object(obj) ? is.empty(obj) : true);
export const isFn = fn => is.fn(fn);
export const isObject = obj => is.object(obj);
export const isArray = arr => is.array(arr);
export const isString = str => is.string(str);
export const isNumber = num => is.number(num);
