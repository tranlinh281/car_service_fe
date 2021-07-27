import { memo, useContext } from 'react';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import CreatePackageDialog from '../packages/CreatePackageDialog';
import DialogUpdatePackage from '../packages/dialogUpdatePackage';

const PackageDialogHOC = ({ children }) => {
 const {
  shouldCreatePackageDialogOpen,
  setShouldCreatePackageDialogOpen,
  updatePackageDefaultValue,
  shouldUpdatePackageDialogOpen,
  setShouldUpdatePackageDialogOpen
 } = useContext(DialogContext);

 return (
  <>
   {children}
   <DialogUpdatePackage
    data={updatePackageDefaultValue}
    open={shouldUpdatePackageDialogOpen}
    onClose={() => setShouldUpdatePackageDialogOpen(false)}
   />
   <CreatePackageDialog
    open={shouldCreatePackageDialogOpen}
    onClose={() => setShouldCreatePackageDialogOpen(false)}
   />
  </>
 );
};

export default memo(PackageDialogHOC);
