import { memo, useContext, useState } from 'react';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import EditEmployeeDialog from '../employee/EditEmployeeDialog';
import CreatePackageDialog from '../packages/CreatePackageDialog';

const PackageDialogHOC = ({ children }) => {
 const {
  shouldCreatePackageDialogOpen,
  setShouldCreatePackageDialogOpen,
  updateEmployeeDefaultValue,
  shouldUpdateEmployeeDialogOpen,
  setShouldUpdateEmployeeDialogOpen,
 } = useContext(DialogContext);

 return (
  <>
   {children}
   <EditEmployeeDialog
    data={updateEmployeeDefaultValue}
    open={shouldUpdateEmployeeDialogOpen}
    onClose={() => setShouldUpdateEmployeeDialogOpen(false)}
   />
   <CreatePackageDialog
    open={shouldCreatePackageDialogOpen}
    onClose={() => setShouldCreatePackageDialogOpen(false)}
   />
  </>
 );
};

export default memo(PackageDialogHOC);
