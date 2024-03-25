import { useCallback, useState } from 'react';
import { tableObjects } from '../../model/enums/tableObjects';
import { useHttpClient } from './httpHook';
import { getRequestUrl } from '../utils/urls/fetchUrl';
import { setSearchUrlParams } from '../utils/urls/searchParams';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_ROWS_PER_PAGE } from '../../constants/tableConstants';

export const useTable = ({
  requestSearchParams,
  type,
  setData,
}: {
  type: tableObjects;
  requestSearchParams?: string;
  setData: (data: any[]) => void;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSearchParam = searchParams.get('page') ?? 0;
  const idSearchParam = searchParams.get('id') ?? '';

  const [globalFilter, setGlobalFilter] = useState(idSearchParam);
  const [pagination, setPagination] = useState({
    pageIndex: +pageSearchParam ?? 0,
    pageSize: DEFAULT_ROWS_PER_PAGE,
  });

  const { sendRequest } = useHttpClient();

  const getData = useCallback(async () => {
    const url = getRequestUrl(type);
    const data = await sendRequest(url, requestSearchParams);

    if (!data) return;
    setData(data);
  }, [type, requestSearchParams, sendRequest, setData]);

  const handleGlobalFiltersChange = useCallback(
    (filterChange: string) => {
      const newSearch = filterChange ?? '';

      setGlobalFilter(newSearch);
      setSearchParams(setSearchUrlParams(searchParams, newSearch, 'id'));
    },
    [searchParams, setSearchParams],
  );

  const handlePaginationChange = useCallback(
    (paginationChange: any) => {
      const newPagination = paginationChange(pagination);

      setPagination(newPagination);
      const newPage = !!newPagination.pageIndex
        ? newPagination.pageIndex + 1
        : '';

      setSearchParams(setSearchUrlParams(searchParams, newPage, 'page'));
    },
    [pagination, searchParams, setSearchParams],
  );

  return {
    globalFilter,
    pagination,
    getData,
    handleGlobalFiltersChange,
    handlePaginationChange,
  };
};
