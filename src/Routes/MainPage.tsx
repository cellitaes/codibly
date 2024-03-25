import { useCallback, useEffect, useState } from 'react';
import { useHttpClient } from '../shared/hooks/httpHook';
import { Product } from '../model/interfaces/Product';
import { PRODUCTS_URL } from '../config';
import TableTemplate from '../shared/components/Table/TableTemplate';
import { useSearchParams } from 'react-router-dom';
import { constructQueryString } from '../shared/utils/urls/searchParams';
import { MainPageBoxContainer } from './mainpage-styles';

const columns = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'year',
    header: 'Year',
  },
  {
    accessorKey: 'color',
    header: 'Color',
    enableHiding: false,
  },
  {
    accessorKey: 'pantone_value',
    header: 'Pantone value',
    enableHiding: false,
  },
];

const MainPage = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, sendRequest } = useHttpClient();

  const [products, setProducts] = useState<Product[]>([]);
  const [rowsCount, setRowsCount] = useState<number>(0);

  const pageSearchParam = searchParams.get('page') ?? 0;
  const idSearchParam = searchParams.get('id') ?? '';

  const getProducts = useCallback(
    async (pageIndex?: number, pageSize?: number) => {
      const queryParams = {
        id: idSearchParam,
        page: +pageSearchParam ?? pageIndex,
        per_page: 5,
      };

      const queryString = constructQueryString(queryParams);
      const url = `${PRODUCTS_URL}?${queryString}`;

      const data = await sendRequest(url);
      if (!data) return;
      setProducts(Array.isArray(data?.data) ? data?.data : [data?.data]);
    },
    [idSearchParam, pageSearchParam, sendRequest],
  );

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    const getProductsLength = async () => {
      const url = `${PRODUCTS_URL}`;

      const data = await sendRequest(url);
      if (!data) return;
      setRowsCount(data.total);
    };
    getProductsLength();
  }, [sendRequest]);

  return (
    <MainPageBoxContainer>
      <TableTemplate
        data={products}
        columns={columns}
        isLoading={isLoading}
        rowsCount={rowsCount}
        setData={setProducts}
      />
    </MainPageBoxContainer>
  );
};

export default MainPage;
