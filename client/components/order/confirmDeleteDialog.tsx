import React from 'react';
import CustomDialog from '../../utilities/customDialog';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import { create } from 'domain';

interface Props {
  open?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  loading?: boolean;
}

export const ConfirmDeleteDialog = ({
  open,
  onCancel,
  onConfirm,
  loading
}: Props) => {
  const [canDelete, setCanDelete] = React.useState(false);

  const cancel = () => {
    if (onCancel) onCancel();
  };

  const content = (
    <div>
      <h3 className="bp3-heading">刪除訂單</h3>
      <div style={{ margin: '10px 0' }}>
        訂單刪除後，沒有辦法復原且會從結算列表移除
      </div>
      <FormGroup
        label="如果確認要刪除，請在底下輸入「刪除」"
        labelFor="delete-check-input"
      >
        <InputGroup
          id="delete-check-input"
          placeholder="刪除"
          onChange={e => {
            setCanDelete(e.target.value && e.target.value.trim() === '刪除');
          }}
          defaultValue=""
        />
      </FormGroup>
    </div>
  );

  return (
    <CustomDialog
      isOpen={open}
      onClose={cancel}
      footer={
        <>
          <Button minimal onClick={cancel} style={{ marginRight: 12 }}>
            取消
          </Button>
          <Button
            minimal
            intent="danger"
            disabled={!canDelete}
            onClick={() => {
              if (onConfirm) onConfirm();
            }}
            loading={loading}
          >
            刪除
          </Button>
        </>
      }
      content={content}
      title="確定刪除"
    />
  );
};
