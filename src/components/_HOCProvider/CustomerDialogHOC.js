import { memo, useContext } from 'react';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import CreateNotificationDialog from '../customer/CreateNotificationDialog';

const CustomerDialogHOC = ({ children }) => {
 const {
  shouldCreateNotificationDialogOpen,
  setShouldCreateNotificationDialogOpen
 } = useContext(DialogContext);

 return (
  <>
   {children}

   <CreateNotificationDialog
    open={shouldCreateNotificationDialogOpen}
    onClose={() => setShouldCreateNotificationDialogOpen(false)}
   />
  </>
 );
};

export default memo(CustomerDialogHOC);
