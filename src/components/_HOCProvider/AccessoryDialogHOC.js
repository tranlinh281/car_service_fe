import { memo, useContext, useState } from 'react';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import DialogCreateAccessory from '../dialog/dialogCreateAccessory';
import DialogUpdateAccessory from '../dialog/dialogUpdateAccessory';

const AccessoryDialogHOC = ({ children }) => {
 const {
  shouldUpdateAccessoryDialogOpen,
  setShouldUpdateAccessoryDialogOpen,
  updateAccessoryDefaultValue,
  shouldCreateAccessoryDialogOpen,
  setShouldCreateAccessoryDialogOpen
 } = useContext(DialogContext);

 return (
  <>
   {children}
   <DialogUpdateAccessory
    data={updateAccessoryDefaultValue}
    open={shouldUpdateAccessoryDialogOpen}
    onClose={() => setShouldUpdateAccessoryDialogOpen(false)}
   />

   <DialogCreateAccessory
    open={shouldCreateAccessoryDialogOpen}
    onClose={() => setShouldCreateAccessoryDialogOpen(false)}
   />

   {/* là chỗ này nè */}
  </>
 );
};

export default memo(AccessoryDialogHOC);
