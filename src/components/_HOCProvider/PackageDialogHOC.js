import { memo, useContext, useState } from 'react';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import CreateEmployeeDialog from '../employee/CreateEmployeeDialog';
import EditEmployeeDialog from '../employee/EditEmployeeDialog';

const PackageDialogHOC = ({ children }) => {
 const {
  updateEmployeeDefaultValue,
  shouldUpdateEmployeeDialogOpen,
  setShouldUpdateEmployeeDialogOpen,
  setShouldCreateEmployeeDialogOpen,
  shouldCreateEmployeeDialogOpen
 } = useContext(DialogContext);

 return (
  <>
   {children}
   <EditEmployeeDialog
    data={updateEmployeeDefaultValue}
    open={shouldUpdateEmployeeDialogOpen}
    onClose={() => setShouldUpdateEmployeeDialogOpen(false)}
   />
   <CreateEmployeeDialog
    open={shouldCreateEmployeeDialogOpen}
    onClose={() => setShouldCreateEmployeeDialogOpen(false)}
   />
  </>
 );
};

export default memo(PackageDialogHOC);
