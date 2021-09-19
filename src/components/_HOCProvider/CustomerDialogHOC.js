import { memo, useContext } from 'react';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import CreateNotificationDialog from '../customer/CreateNotificationDialog';
import PaymentCash from '../payment/PaymentCash';

const CustomerDialogHOC = ({ children }) => {
 const {
  shouldCreateNotificationDialogOpen,
  setShouldCreateNotificationDialogOpen,
  customerNotificationDefaultValue,
  //payment
  shouldCreatePaymentDialogOpen,
  setShouldCreatePaymentDialogOpen
 } = useContext(DialogContext);

 return (
  <>
   {children}

   <CreateNotificationDialog
    data={customerNotificationDefaultValue}
    open={shouldCreateNotificationDialogOpen}
    onClose={() => setShouldCreateNotificationDialogOpen(false)}
   />
   <PaymentCash
    open={shouldCreatePaymentDialogOpen}
    onClose={() => setShouldCreatePaymentDialogOpen(false)}
   />
  </>
 );
};

export default memo(CustomerDialogHOC);
