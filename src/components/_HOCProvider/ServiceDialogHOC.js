import { memo, useContext } from 'react';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import DialogUpdateService from '../dialog/dialogUpdateService';
import CreateCouponDialog from '../servicees/CreateCouponDialog';
import CreateServiceDialog from '../servicees/CreateServiceDialog';
import CreateServiceTypeDialog from '../servicees/CreateServiceTypeDialog';
import DialogUpdateCoupon from '../servicees/dialogUpdateCoupon';

const ServiceDialogHOC = ({ children }) => {
 const {
  shouldUpdateServiceDialogOpen,
  setShouldUpdateServiceDialogOpen,
  updateServiceDefaultValue,
  setShouldCreateServiceDialogOpen,
  shouldCreateServiceDialogOpen,
  //coupon
  shouldCreateCouponDialogOpen,
  setShouldCreateCouponDialogOpen,
  shouldUpdateCouponDialogOpen,
  setShouldUpdateCouponDialogOpen,
  updateCouponDefaultValue,
  //type
  shouldCreateTypeDialogOpen,
  setShouldCreateTypeDialogOpen
 } = useContext(DialogContext);

 return (
  <>
   {children}
   <DialogUpdateService
    data={updateServiceDefaultValue}
    open={shouldUpdateServiceDialogOpen}
    onClose={() => setShouldUpdateServiceDialogOpen(false)}
   />
   <CreateServiceDialog
    open={shouldCreateServiceDialogOpen}
    onClose={() => setShouldCreateServiceDialogOpen(false)}
   />
   <CreateServiceTypeDialog
    open={shouldCreateTypeDialogOpen}
    onClose={() => setShouldCreateTypeDialogOpen(false)}
   />
   <CreateCouponDialog
    data={updateServiceDefaultValue}
    open={shouldCreateCouponDialogOpen}
    onClose={() => setShouldCreateCouponDialogOpen(false)}
   />
   <DialogUpdateCoupon
    data={updateCouponDefaultValue}
    open={shouldUpdateCouponDialogOpen}
    onClose={() => setShouldUpdateCouponDialogOpen(false)}
   />
  </>
 );
};

export default memo(ServiceDialogHOC);
