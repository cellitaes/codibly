import { useCallback, useEffect, useState } from 'react';
import { useHttpClient } from '../shared/hooks/httpHook';
import { Product } from '../model/interfaces/Product';
import { PRODUCTS_URL } from '../config';
import TableTemplate from '../shared/components/Table/TableTemplate';
import { useSearchParams } from 'react-router-dom';
import { constructQueryString } from '../shared/utils/urls/searchParams';
import { CenterTextBox, MainPageBoxContainer } from './mainpage-styles';
import Modal from '../shared/components/Modal/Modal';
import { getRequestUrl } from '../shared/utils/urls/fetchUrl';
import { tableObjects } from '../model/enums/tableObjects';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

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
  const rowsPerPage = useSelector(
    (store: RootState) => store.table.rowsPerPage,
  );

  const [searchParams] = useSearchParams();

  const { isLoading, error, clearError, sendRequest } = useHttpClient();

  const [products, setProducts] = useState<Product[]>([]);
  const [rowsCount, setRowsCount] = useState<number>(0);

  const pageSearchParam = searchParams.get('page') ?? 0;
  const idSearchParam = searchParams.get('id') ?? '';

  const getProducts = useCallback(async () => {
    const queryParams = {
      id: idSearchParam,
      page: pageSearchParam,
      per_page: rowsPerPage,
    };

    const queryString = constructQueryString(queryParams);
    const url = getRequestUrl(tableObjects.products, queryString);

    const data = await sendRequest(url);
    if (!data) return;
    setProducts(Array.isArray(data?.data) ? data?.data : [data?.data]);
  }, [sendRequest]);

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
      {products.length && rowsCount ? (
        <TableTemplate
          data={products}
          columns={columns}
          isLoading={isLoading}
          rowsCount={rowsCount}
          setData={setProducts}
        />
      ) : (
        <CenterTextBox>No Data</CenterTextBox>
      )}
      <Modal
        open={!!error}
        modalTitle="Error occured!"
        handleClose={clearError}
      >
        {error}
      </Modal>
    </MainPageBoxContainer>
  );
};

export default MainPage;
