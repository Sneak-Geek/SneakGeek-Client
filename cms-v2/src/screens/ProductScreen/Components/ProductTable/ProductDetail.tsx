import React from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';

type Props = {
  onCloseProductDetail: () => void;
  isDialogOpen: boolean;
};

const ProductDetail = (props: Props): JSX.Element => {
  return (
    <Dialog onClose={props.onCloseProductDetail} open={props.isDialogOpen}>
      <DialogTitle>Thông tin giày</DialogTitle>
    </Dialog>
  );
};
