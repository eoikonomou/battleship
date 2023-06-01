import {
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

  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>
        <Typography>{dialogTitle}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>{dialogMsg}</Typography>
      </DialogContent>
      <DialogActions>
        {/* TODO: Add buttons */}
      </DialogActions>
    </Dialog>
  );
};

BattleshipDialog.displayName = 'BattleshipDialog';

BattleshipDialog.propTypes = {
  store: PropTypes.instanceOf(Store).isRequired
};

export default observer(BattleshipDialog);
