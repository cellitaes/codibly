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
    <Dialog onClose={handleClose} open={open}>
      <StyledDialogTitle>{modalTitle}</StyledDialogTitle>
      <StyledCloseIcon aria-label="close" onClick={handleClose}>
        <CloseIcon />
      </StyledCloseIcon>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
