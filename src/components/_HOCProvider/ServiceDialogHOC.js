import { memo, useContext, useState } from 'react';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import DialogUpdateService from '../dialog/dialogUpdateService';
import CreateCouponDialog from '../servicees/CreateCouponDialog';
import CreateServiceDialog from '../servicees/CreateServiceDialog';

const ServiceDialogHOC = ({ children }) => {
 const {
  shouldUpdateServiceDialogOpen,
  setShouldUpdateServiceDialogOpen,
  updateServiceDefaultValue,
  setShouldCreateServiceDialogOpen,
  shouldCreateServiceDialogOpen,
  shouldCreateCouponDialogOpen,
  setShouldCreateCouponDialogOpen
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
   <CreateCouponDialog
    data={updateServiceDefaultValue}
    open={shouldCreateCouponDialogOpen}
    onClose={() => setShouldCreateCouponDialogOpen(false)}
   />
  </>
 );
};

export default memo(ServiceDialogHOC);
