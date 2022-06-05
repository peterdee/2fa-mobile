import React, { memo } from 'react';

import { COLORS, SPACER } from '../../../constants';
import ModalWrap from '../../../components/ModalWrap';
import { SecretEntry } from '../../../types/models';
import WideButton from '../../../components/WideButton';

interface EditEntryModalProps {
  handleClose: () => void;
  handleEdit: (id: string) => Promise<void>;
  secretEntry: SecretEntry;
  showEditEntryModal: boolean;
}

function EditEntryModal(props: EditEntryModalProps): React.ReactElement {
  const {
    handleClose,
    handleEdit,
    secretEntry,
    showEditEntryModal,
  } = props;

  return (
    <ModalWrap isVisible={showEditEntryModal}>
      <WideButton
        buttonStyle={{
          backgroundColor: COLORS.positive,
          marginTop: SPACER,
        }}
        onPress={() => handleEdit(secretEntry.id)}
        text="Save"
      />
      <WideButton
        buttonStyle={{
          marginTop: SPACER * 2,
        }}
        onPress={handleClose}
        text="Cancel"
      />
    </ModalWrap>
  );
}

export default memo(EditEntryModal);
