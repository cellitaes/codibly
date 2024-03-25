import { FC, useEffect, useRef, useState } from 'react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
  MRT_RowData,
} from 'material-react-table';
import { DEBOUNCE_DELAY } from '../../../constants/tableConstants';
import { useTable } from '../../hooks/manageTableHook';
import { tableObjects } from '../../../model/enums/tableObjects';
import Modal from '../Modal/Modal';
import { List, ListItem, ListItemText } from '@mui/material';

type TableTemplateProps<T extends MRT_RowData> = {
  data: T[];
  columns: MRT_ColumnDef<T>[];
  isLoading: boolean;
  rowsCount?: number;
  setData: (data: any[]) => void;
};

type AnyObjectType = { [key: string]: any };

const TableTemplate: FC<TableTemplateProps<AnyObjectType>> = ({
  data,
  columns,
  isLoading,
  rowsCount,
  setData,
}) => {
  const rowData = useRef<object | null>(null);

  const {
    globalFilter,
    pagination,
    handleGlobalFiltersChange,
    handlePaginationChange,
  } = useTable({ type: tableObjects.products, setData });

  const [openAdditionalInfoModal, setOpenAdditionalInfoModal] = useState(false);

  const openInfoModal = (row: MRT_RowData) => {
    rowData.current = row.original;
    setOpenAdditionalInfoModal(true);
  };

  const closeInfoModal = () => setOpenAdditionalInfoModal(false);

  useEffect(() => {
    const handler = setTimeout(() => {}, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [globalFilter]);

  const contentTable = document.querySelector('.table-container')!;
  const tableToolbar = document.querySelector('.upperToolbar')!;
  const bottomToolbar = document.querySelector('.bottomToolbar')!;

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableColumnPinning: true,
    enableTopToolbar: true,
    enablePagination: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enablePinning: true,
    enableSorting: true,
    enableColumnResizing: true,
    manualPagination: true,
    enableGrouping: false,
    memoMode: 'cells',
    positionToolbarAlertBanner: undefined,
    paginationDisplayMode: 'pages',
    layoutMode: 'grid',
    positionPagination: 'bottom',

    rowCount: rowsCount,

    onGlobalFilterChange: (updaterOrValue) =>
      handleGlobalFiltersChange(updaterOrValue),
    onPaginationChange: (onChangeFn) => handlePaginationChange(onChangeFn),

    initialState: {
      showGlobalFilter: true,
      columnVisibility: { color: false, pantone_value: false },
    },

    state: {
      globalFilter,
      isLoading,
      showProgressBars: isLoading,
      pagination,
    },

    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 15],
    },

    muiTopToolbarProps: {
      className: 'upperToolbar',
    },

    muiBottomToolbarProps: {
      className: 'bottomToolbar',
    },

    muiTableContainerProps: {
      sx: {
        maxHeight:
          contentTable?.clientHeight -
          tableToolbar?.clientHeight -
          bottomToolbar?.clientHeight,
      },
    },

    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => openInfoModal(row),
      sx: {
        backgroundColor: row?.original?.color,
      },
    }),

    muiSearchTextFieldProps: () => ({
      type: 'number',
      inputProps: {
        min: 1,
        max: rowsCount,
      },
      placeholder: 'Search by id',
    }),
  });

  return (
    <>
      <MaterialReactTable table={table} />;
      <Modal
        modalTitle="Additional Data Info"
        open={openAdditionalInfoModal}
        handleClose={closeInfoModal}
      >
        {rowData.current && (
          <List>
            {Object.entries(rowData.current).map(([key, value]) => (
              <ListItem key={key} disableGutters secondaryAction={`${value}`}>
                <ListItemText
                  primary={`${key
                    .toString()
                    .split('_')
                    .join(' ')
                    .toUpperCase()}:`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Modal>
    </>
  );
};

export default TableTemplate;
