import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 670,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:1,
  p: 4,
  marginBlock:'1rem',
  overflow:'scroll',
  height:'100%',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    width: '0',
    height: '0',
    backgroundColor: 'transparent',
  }

};

export default function CustomModal({ handleClose, open, title, children}) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
           {children}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
