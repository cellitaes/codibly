import { DialogTitle } from '@mui/material';
import { styled } from '@mui/system';

export const StyledDialogTitle = styled(DialogTitle)({ m: 0, p: 2 });
export const StyledCloseIcon = styled(DialogTitle)(({ theme }) => ({
  cursor: 'pointer',
  position: 'absolute',
  right: 8,
  top: 8,
  color: theme.palette.grey,
}));
