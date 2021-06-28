import { memo, useContext, useState } from 'react';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import DialogUpdateService from '../dialog/dialogUpdateService';
import CreateEmployeeDialog from '../employee/CreateEmployeeDialog';
import CreateServiceDialog from '../servicees/CreateServiceDialog';

const EmployeeDialogHOC = ({ children }) => {
 const {
  shouldUpdateServiceDialogOpen,
  setShouldUpdateServiceDialogOpen,
  updateServiceDefaultValue,
  setShouldCreateEmployeeDialogOpen,
  shouldCreateEmployeeDialogOpen
 } = useContext(DialogContext);

 return (
  <>
   {children}
   <DialogUpdateService
    data={updateServiceDefaultValue}
    open={shouldUpdateServiceDialogOpen}
    onClose={() => setShouldUpdateServiceDialogOpen(false)}
   />
   <CreateEmployeeDialog
    open={shouldCreateEmployeeDialogOpen}
    onClose={() => setShouldCreateEmployeeDialogOpen(false)}
   />
  </>
 );
};

export default memo(EmployeeDialogHOC);
