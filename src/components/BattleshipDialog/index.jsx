import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React from 'react';

import Store from '../../Store';

const BattleshipDialog = ({ store }) => {
  const { isDialogOpen, dialogTitle, dialogMsg } = store;

  const onClose = () => {
    store.setIsDialogOpen(false);
  };

  const onRestart = () => {
    onClose();
    store.restartGame();
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>
        <Typography>{dialogTitle}</Typography>
      </DialogTitle>
      <DialogContent>
        {dialogMsg.split('\n').map(partialMsg => (
          <Typography key={partialMsg}>{partialMsg}</Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>No</Button>
        <Button variant="contained" onClick={onRestart}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

BattleshipDialog.displayName = 'BattleshipDialog';

BattleshipDialog.propTypes = {
  store: PropTypes.instanceOf(Store).isRequired
};

export default observer(BattleshipDialog);
