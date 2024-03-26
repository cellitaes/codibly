import { expect, describe, it } from 'vitest';
import { constructQueryString } from '../shared/utils/urls/searchParams';

describe('constructQueryString', () => {
  it('should handle an empty object', () => {
    const params = {};
    expect(constructQueryString(params)).toBe('');
  });

  it('should handle an object with null and undefined values', () => {
    const params = { a: null, b: undefined, c: 'value' };
    expect(constructQueryString(params)).toBe('c=value');
  });

  it('should handle an object with string values', () => {
    const params = { a: 'hello', b: 'world' };
    expect(constructQueryString(params)).toBe('a=hello&b=world');
  });

  it('should handle an object with number values', () => {
    const params = { a: 123, b: 456 };
    expect(constructQueryString(params)).toBe('a=123&b=456');
  });

  it('should handle an object with boolean values', () => {
    const params = { a: true, b: false };
    expect(constructQueryString(params)).toBe('a=true&b=false');
  });

  it('should handle special characters in values', () => {
    const params = { a: 'hello world', b: 'special !@#$%^&*() characters' };
    expect(constructQueryString(params)).toBe(
      'a=hello%20world&b=special%20!%40%23%24%25%5E%26*()%20characters',
    );
  });

  it('should handle special characters in keys', () => {
    const params = { 'key!@#$%^&*()': 'value', 'another[key]': 'value2' };
    expect(constructQueryString(params)).toBe(
      'key!%40%23%24%25%5E%26*()=value&another%5Bkey%5D=value2',
    );
  });

  it('should handle an object with array values', () => {
    const params = { a: ['value1', 'value2'], b: ['value3'] };
    expect(constructQueryString(params)).toBe('a=value1%2Cvalue2&b=value3');
  });

  it('should handle nested objects', () => {
    const params = { a: { b: 'value1', c: 'value2' }, d: { e: 'value3' } };
    expect(constructQueryString(params)).toBe(
      'a=%5Bobject%20Object%5D&d=%5Bobject%20Object%5D',
    );
  });

  it('should handle mixed types of values', () => {
    const params = { a: 'hello', b: 123, c: true, d: null, e: undefined };
    expect(constructQueryString(params)).toBe('a=hello&b=123&c=true');
  });

  it('should handle null params', () => {
    const params = null;
    expect(constructQueryString(params)).toBe('');
  });

  it('should handle undefined params', () => {
    const params = undefined;
    expect(constructQueryString(params)).toBe('');
  });
});
