export const setSearchUrlParams = (
  searchParams: URLSearchParams,
  value: any,
  paramKey: string,
): URLSearchParams => {
  const newSearchParams = new URLSearchParams(searchParams);

  if (!!value) {
    newSearchParams.set(paramKey, String(value));
  } else {
    newSearchParams.delete(paramKey);
  }

  return newSearchParams;
};

export const constructQueryString = (params: any) => {
  if (typeof params !== 'object' || params === null) return '';

  return Object.entries(params)
    .filter(
      ([_, value]: [string, any]) => value !== null && value !== undefined,
    )
    .map(
      ([key, value]: [string, any]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join('&');
};
