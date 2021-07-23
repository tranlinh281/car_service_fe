import { memo, useContext } from 'react';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import CreateManufacturerDialog from '../manufacturer/CreateManufacturerDialog';

const ManufacturerDialogHOC = ({ children }) => {
 const {
  updateManufacturerDefaultValue,
  shouldUpdateManufacturerDialogOpen,
  setShouldUpdateManufacturerDialogOpen,
  setShouldCreateManufacturerDialogOpen,
  shouldCreateManufacturerDialogOpen
 } = useContext(DialogContext);

 return (
  <>
   {children}
   {/* <EditManufacturerDialog
    data={updateManufacturerDefaultValue}
    open={shouldUpdateManufacturerDialogOpen}
    onClose={() => setShouldUpdateManufacturerDialogOpen(false)}
   /> */}
   <CreateManufacturerDialog
    open={shouldCreateManufacturerDialogOpen}
    onClose={() => setShouldCreateManufacturerDialogOpen(false)}
   />
  </>
 );
};

export default memo(ManufacturerDialogHOC);
