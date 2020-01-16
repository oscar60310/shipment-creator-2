import React from 'react';
import { Dialog, IDialogProps, Classes } from '@blueprintjs/core';

const CustomDialog = (
  props: IDialogProps & { footer?: React.ReactNode; content?: React.ReactNode }
) => {
  const dialogProps = {
    ...props,
    usePortal: true,
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true
  };
  return (
    <Dialog {...dialogProps}>
      <div className={Classes.DIALOG_BODY}>{props.content}</div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>{props.footer}</div>
      </div>
    </Dialog>
  );
};
export default CustomDialog;
