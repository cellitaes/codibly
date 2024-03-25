import { useCallback, useState } from 'react';
import { tableObjects } from '../../model/enums/tableObjects';
import { useHttpClient } from './httpHook';
import { getRequestUrl } from '../utils/urls/fetchUrl';
import {
  constructQueryString,
  setSearchUrlParams,
} from '../utils/urls/searchParams';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_ROWS_PER_PAGE } from '../../constants/tableConstants';

export const useTable = ({
  type,
  setData,
}: {
  type: tableObjects;
  setData: (data: any[]) => void;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSearchParam = searchParams.get('page') ?? 0;
  const idSearchParam = searchParams.get('id') ?? '';

  const [globalFilter, setGlobalFilter] = useState(idSearchParam);
  const [pagination, setPagination] = useState({
    pageIndex: +pageSearchParam - 1 ?? 0,
    pageSize: DEFAULT_ROWS_PER_PAGE,
  });

  const { error, clearError, isLoading, sendRequest } = useHttpClient();

  const getData = useCallback(
    async (requestSearchParams: string) => {
      const url = getRequestUrl(type, requestSearchParams);
      const data = await sendRequest(url);

      if (!data) return;
      setData(Array.isArray(data?.data) ? data?.data : [data?.data]);
    },
    [type, sendRequest, setData],
  );

  const handleGlobalFiltersChange = useCallback(
    (filterChange: string) => {
      let newSearch = filterChange ?? '';
      newSearch = newSearch.replace(/\D/g, '');

      setGlobalFilter(newSearch);
      setSearchParams(setSearchUrlParams(searchParams, newSearch, 'id'));
    },
    [searchParams, setSearchParams],
  );

  const handlePaginationChange = useCallback(
    (paginationChange: any) => {
      const newPagination = paginationChange(pagination);
      const { pageIndex, pageSize } = newPagination;

      setPagination(newPagination);
      const newPage = !!pageIndex ? pageIndex + 1 : '';

      setSearchParams(setSearchUrlParams(searchParams, newPage, 'page'));
      const queryParams = {
        id: idSearchParam,
        page: pageIndex + 1,
        per_page: pageSize,
      };

      const queryString = constructQueryString(queryParams);
      getData(queryString);
    },
    [pagination, searchParams, idSearchParam, getData, setSearchParams],
  );

  return {
    globalFilter,
    pagination,
    error,
    isLoading,
    clearError,
    getData,
    handleGlobalFiltersChange,
    handlePaginationChange,
  };
};
