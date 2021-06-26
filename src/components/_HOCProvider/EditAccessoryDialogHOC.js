import { memo, useContext, useState } from 'react';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import DialogUpdateAccessory from '../dialog/dialogUpdateAccessory';

const EditAccessoryDialogHOC = ({ children }) => {
 const {
  shouldUpdateAccessoryDialogOpen,
  setShouldUpdateAccessoryDialogOpen,
  updateAccessoryDefaultValue
 } = useContext(DialogContext);

 return (
  <>
   {children}
   <DialogUpdateAccessory
    data={updateAccessoryDefaultValue}
    open={shouldUpdateAccessoryDialogOpen}
    onClose={() => setShouldUpdateAccessoryDialogOpen(false)}
   />
  </>
 );
};

export default memo(EditAccessoryDialogHOC);
