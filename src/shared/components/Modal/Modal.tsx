import { FC, ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { StyledCloseIcon, StyledDialogTitle } from './modal-styles';

type ModalType = {
  children: ReactNode;
  modalTitle: string;
  open: boolean;
  handleClose: () => void;
};

const Modal: FC<ModalType> = ({ children, modalTitle, open, handleClose }) => {
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{ '& .MuiPaper-root': { minWidth: '60%', maxWidth: '70%' } }}
      data-cy="modal"
      slotProps={{
        backdrop: {
          'data-cy': 'modal-backdrop',
        } as any,
      }}
    >
      <StyledDialogTitle>{modalTitle}</StyledDialogTitle>
      <StyledCloseIcon
        aria-label="close"
        onClick={handleClose}
        data-cy="close-modal-icon"
      >
        <CloseIcon />
      </StyledCloseIcon>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} data-cy="confirm-modal-btn">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
