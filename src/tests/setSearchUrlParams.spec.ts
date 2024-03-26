import { expect, describe, it } from 'vitest';
import { setSearchUrlParams } from '../shared/utils/urls/searchParams';

import { URLSearchParams } from 'url';

describe('setSearchUrlParams', () => {
  it('should add a new parameter to the search params', () => {
    const searchParams = new URLSearchParams();
    const paramKey = 'param';
    const value = 'value';

    const updatedSearchParams = setSearchUrlParams(
      searchParams,
      value,
      paramKey,
    );
    expect(updatedSearchParams.toString()).toBe(`${paramKey}=${value}`);
  });

  it('should update an existing parameter in the search params', () => {
    const paramKey = 'param';
    const initialValue = 'initialValue';
    const updatedValue = 'updatedValue';

    const searchParams = new URLSearchParams();
    searchParams.set(paramKey, initialValue);

    const updatedSearchParams = setSearchUrlParams(
      searchParams,
      updatedValue,
      paramKey,
    );
    expect(updatedSearchParams.toString()).toBe(`${paramKey}=${updatedValue}`);
  });

  it('should remove a parameter from the search params if the value is falsy', () => {
    const paramKey = 'param';
    const initialValue = 'initialValue';

    const searchParams = new URLSearchParams();
    searchParams.set(paramKey, initialValue);

    const updatedSearchParams = setSearchUrlParams(
      searchParams,
      undefined,
      paramKey,
    );
    expect(updatedSearchParams.toString()).toBe('');
  });

  it('should not modify the original search params object', () => {
    const searchParams = new URLSearchParams();
    const originalParamsString = searchParams.toString();
    const paramKey = 'param';
    const value = 'value';

    setSearchUrlParams(searchParams, value, paramKey);

    expect(searchParams.toString()).toBe(originalParamsString);
  });

  it('should handle null parameter values correctly', () => {
    const searchParams = new URLSearchParams();
    const paramKey = 'param';
    const newSearchParams = setSearchUrlParams(searchParams, null, paramKey);
    expect(newSearchParams.toString()).toBe(``);
  });

  it('should handle empty string parameter values correctly', () => {
    const searchParams = new URLSearchParams();
    const paramKey = 'param';
    const newSearchParams = setSearchUrlParams(searchParams, '', paramKey);
    expect(newSearchParams.toString()).toBe('');
  });

  it('should handle number parameter values correctly', () => {
    const searchParams = new URLSearchParams();
    const paramKey = 'param';
    const newSearchParams = setSearchUrlParams(searchParams, 123, paramKey);
    expect(newSearchParams.toString()).toBe(`${paramKey}=123`);
  });

  it('should handle boolean parameter values correctly', () => {
    const searchParams = new URLSearchParams();
    const paramKey = 'param';
    const newSearchParams = setSearchUrlParams(searchParams, true, paramKey);
    expect(newSearchParams.toString()).toBe(`${paramKey}=true`);
  });

  it('should handle multiple parameters correctly', () => {
    const searchParams = new URLSearchParams();

    const newSearchParams = setSearchUrlParams(
      searchParams,
      'value1',
      'param1',
    );
    const updatedSearchParams = setSearchUrlParams(
      newSearchParams,
      'value2',
      'param2',
    );
    expect(updatedSearchParams.toString()).toBe('param1=value1&param2=value2');
  });
});
