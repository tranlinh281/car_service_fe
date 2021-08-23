import { memo, useContext } from 'react';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import CreateNotificationDialog from '../customer/CreateNotificationDialog';

const CustomerDialogHOC = ({ children }) => {
 const {
  shouldCreateNotificationDialogOpen,
  setShouldCreateNotificationDialogOpen,
  customerNotificationDefaultValue
 } = useContext(DialogContext);

 return (
  <>
   {children}

   <CreateNotificationDialog
    data={customerNotificationDefaultValue}
    open={shouldCreateNotificationDialogOpen}
    onClose={() => setShouldCreateNotificationDialogOpen(false)}
   />
  </>
 );
};

export default memo(CustomerDialogHOC);
