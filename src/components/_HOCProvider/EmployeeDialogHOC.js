import { memo, useContext } from 'react';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import CreateEmployeeDialog from '../employee/CreateEmployeeDialog';
import EditEmployeeDialog from '../employee/EditEmployeeDialog';
import UpdateAbsentDialog from '../employee/UpdateAbsentDialog';

const EmployeeDialogHOC = ({ children }) => {
 const {
  updateEmployeeDefaultValue,
  shouldUpdateEmployeeDialogOpen,
  setShouldUpdateEmployeeDialogOpen,
  setShouldCreateEmployeeDialogOpen,
  shouldCreateEmployeeDialogOpen,
  //absent
  updateAbsentDefaultValue,
  shouldUpdateAbsentDialogOpen,
  setShouldUpdateAbsentDialogOpen
 } = useContext(DialogContext);

 return (
  <>
   {children}
   <EditEmployeeDialog
    data={updateEmployeeDefaultValue}
    open={shouldUpdateEmployeeDialogOpen}
    onClose={() => setShouldUpdateEmployeeDialogOpen(false)}
   />
   <UpdateAbsentDialog
    data={updateAbsentDefaultValue}
    open={shouldUpdateAbsentDialogOpen}
    onClose={() => setShouldUpdateAbsentDialogOpen(false)}
   />
   <CreateEmployeeDialog
    open={shouldCreateEmployeeDialogOpen}
    onClose={() => setShouldCreateEmployeeDialogOpen(false)}
   />
  </>
 );
};

export default memo(EmployeeDialogHOC);
