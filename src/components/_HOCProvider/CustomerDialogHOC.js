import { memo, useContext } from 'react';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import CreateNotificationDialog from '../customer/CreateNotificationDialog';
import HistoryCash from '../history/HistoryCash';
import PaymentCash from '../payment/PaymentCash';

const CustomerDialogHOC = ({ children }) => {
 const {
  shouldCreateNotificationDialogOpen,
  setShouldCreateNotificationDialogOpen,
  customerNotificationDefaultValue,
  //payment
  shouldCreatePaymentDialogOpen,
  setShouldCreatePaymentDialogOpen,
  shouldViewPaymentDialogOpen,
  setShouldViewPaymentDialogOpen
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
   <HistoryCash
    open={shouldViewPaymentDialogOpen}
    onClose={() => setShouldViewPaymentDialogOpen(false)}
   />
  </>
 );
};

export default memo(CustomerDialogHOC);
