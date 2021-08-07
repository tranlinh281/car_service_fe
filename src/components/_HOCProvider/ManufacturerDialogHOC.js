import { memo, useContext } from 'react';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import CreateManufacturerDialog from '../manufacturer/CreateManufacturerDialog';
import CreateModelDialog from '../manufacturer/CreateModelDialog';
import EditManufacturerDialog from '../manufacturer/EditManufacturerDialog';

const ManufacturerDialogHOC = ({ children }) => {
 const {
  updateManufacturerDefaultValue,
  shouldUpdateManufacturerDialogOpen,
  setShouldUpdateManufacturerDialogOpen,
  setShouldCreateManufacturerDialogOpen,
  shouldCreateManufacturerDialogOpen,
  shouldCreateModelDialogOpen,
  setShouldCreateModelDialogOpen
 } = useContext(DialogContext);

 return (
  <>
   {children}
   <EditManufacturerDialog
    data={updateManufacturerDefaultValue}
    open={shouldUpdateManufacturerDialogOpen}
    onClose={() => setShouldUpdateManufacturerDialogOpen(false)}
   />
   <CreateManufacturerDialog
    open={shouldCreateManufacturerDialogOpen}
    onClose={() => setShouldCreateManufacturerDialogOpen(false)}
   />
   <CreateModelDialog
    open={shouldCreateModelDialogOpen}
    onClose={() => setShouldCreateModelDialogOpen(false)}
   />
  </>
 );
};

export default memo(ManufacturerDialogHOC);
