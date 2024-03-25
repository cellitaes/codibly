import { PRODUCTS_URL } from '../../../config';
import { tableObjects } from '../../../model/enums/tableObjects';

const baseUrls = {
  [tableObjects.products]: `${PRODUCTS_URL}`,
};

export const getRequestUrl = (
  tableObjectKey: tableObjects,
  searchParams?: string,
) => `${baseUrls[tableObjectKey]}?${searchParams}`;
