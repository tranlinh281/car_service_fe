const { createContext, useState } = require('react');

export const DialogContext = createContext();

const DialogContextProvider = ({ children }) => {
 // Context State of update accessory dialog
 const [shouldUpdateAccessoryDialogOpen, setShouldUpdateAccessoryDialogOpen] =
  useState(false);
 const [updateAccessoryDefaultValue, setUpdateAccessoryDefaultValue] = useState(
  {}
 );

 const updateDialogAccessoryState = {
  shouldUpdateAccessoryDialogOpen,
  setShouldUpdateAccessoryDialogOpen,
  updateAccessoryDefaultValue,
  setUpdateAccessoryDefaultValue
 };

 // -------------------------------------------------------------------------------
 // Context State of create accessory dialog
 const [shouldCreateAccessoryDialogOpen, setShouldCreateAccessoryDialogOpen] =
  useState(false);

 const createDialogAccessoryState = {
  shouldCreateAccessoryDialogOpen,
  setShouldCreateAccessoryDialogOpen
 };

 // -------------------------------------------------------------------------------
 // Context State of update service dialog
 const [shouldUpdateServiceDialogOpen, setShouldUpdateServiceDialogOpen] =
  useState(false);
 const [updateServiceDefaultValue, setUpdateServiceDefaultValue] = useState({});

 const updateDialogServiceState = {
  shouldUpdateServiceDialogOpen,
  setShouldUpdateServiceDialogOpen,
  updateServiceDefaultValue,
  setUpdateServiceDefaultValue
 };
 // --------------------------------------
 // Context State of create service dialog
 const [shouldCreateServiceDialogOpen, setShouldCreateServiceDialogOpen] =
  useState(false);

 const createDialogServiceState = {
  shouldCreateServiceDialogOpen,
  setShouldCreateServiceDialogOpen
 };
 // ---------------------------
 // Context State of update employee dialog
 const [shouldUpdateEmployeeDialogOpen, setShouldUpdateEmployeeDialogOpen] =
  useState(false);
 const [updateEmployeeDefaultValue, setUpdateEmployeeDefaultValue] = useState(
  {}
 );
 const updateDialogEmployeeState = {
  shouldUpdateEmployeeDialogOpen,
  setShouldUpdateEmployeeDialogOpen,
  updateEmployeeDefaultValue,
  setUpdateEmployeeDefaultValue
 };
 // --------------------------------------
 // Context State of create employee dialog
 const [shouldCreateEmployeeDialogOpen, setShouldCreateEmployeeDialogOpen] =
  useState(false);

 const createDialogEmployeeState = {
  shouldCreateEmployeeDialogOpen,
  setShouldCreateEmployeeDialogOpen
 };
 // Context State of create accessory dialog
 const [shouldCreatePackageDialogOpen, setShouldCreatePackageDialogOpen] =
  useState(false);

 const createDialogPackageState = {
  shouldCreatePackageDialogOpen,
  setShouldCreatePackageDialogOpen
 };
 // --------------------------------------
 // Context State of create manufacturer dialog
 const [
  shouldCreateManufacturerDialogOpen,
  setShouldCreateManufacturerDialogOpen
 ] = useState(false);

 const createDialogManufacturerState = {
  shouldCreateManufacturerDialogOpen,
  setShouldCreateManufacturerDialogOpen
 };
 // --------------------------------------
 // Context State of create vehicleModel dialog
 const [shouldCreateModelDialogOpen, setShouldCreateModelDialogOpen] =
  useState(false);

 const createDialogModelState = {
  shouldCreateModelDialogOpen,
  setShouldCreateModelDialogOpen
 };
 // -------------------------------------------------------------------------------
 // Context State of update package dialog
 const [shouldUpdatePackageDialogOpen, setShouldUpdatePackageDialogOpen] =
  useState(false);
 const [updatePackageDefaultValue, setUpdatePackageDefaultValue] = useState({});

 const updateDialogPackageState = {
  shouldUpdatePackageDialogOpen,
  setShouldUpdatePackageDialogOpen,
  updatePackageDefaultValue,
  setUpdatePackageDefaultValue
 };

 // -------------------------------------------------------------------------------
 // Context State of update Manufacturer dialog
 const [
  shouldUpdateManufacturerDialogOpen,
  setShouldUpdateManufacturerDialogOpen
 ] = useState(false);
 const [updateManufacturerDefaultValue, setUpdateManufacturerDefaultValue] =
  useState({});

 const updateDialogManufacturerState = {
  shouldUpdateManufacturerDialogOpen,
  setShouldUpdateManufacturerDialogOpen,
  updateManufacturerDefaultValue,
  setUpdateManufacturerDefaultValue
 };
 // Context State of create coupon dialog
 const [shouldCreateCouponDialogOpen, setShouldCreateCouponDialogOpen] =
  useState(false);

 const createDialogCouponState = {
  shouldCreateCouponDialogOpen,
  setShouldCreateCouponDialogOpen
 };

 // Context State of send notification  dialog
 const [
  shouldCreateNotificationDialogOpen,
  setShouldCreateNotificationDialogOpen
 ] = useState(false);
 const [customerNotificationDefaultValue, setCustomerNotificationDefaultValue] =
  useState({});

 const createDialogNotificationState = {
  shouldCreateNotificationDialogOpen,
  setShouldCreateNotificationDialogOpen,
  customerNotificationDefaultValue,
  setCustomerNotificationDefaultValue
 };

 // -------------------------------------------------------------------------------
 // Context State of update package dialog
 const [shouldUpdateCouponDialogOpen, setShouldUpdateCouponDialogOpen] =
  useState(false);
 const [updateCouponDefaultValue, setUpdateCouponDefaultValue] = useState({});

 const updateDialogCouponState = {
  shouldUpdateCouponDialogOpen,
  setShouldUpdateCouponDialogOpen,
  updateCouponDefaultValue,
  setUpdateCouponDefaultValue
 };
 // --------------------------------------
 // Context State of create type  dialog
 const [shouldCreateTypeDialogOpen, setShouldCreateTypeDialogOpen] =
  useState(false);

 const createDialogTypeState = {
  shouldCreateTypeDialogOpen,
  setShouldCreateTypeDialogOpen
 };

 // -------------------------------------------------------------------------------
 // Context State of absent employee dialog
 const [shouldUpdateAbsentDialogOpen, setShouldUpdateAbsentDialogOpen] =
  useState(false);
 const [updateAbsentDefaultValue, setUpdateAbsentDefaultValue] = useState({});

 const updateDialogAbsentState = {
  shouldUpdateAbsentDialogOpen,
  setShouldUpdateAbsentDialogOpen,
  updateAbsentDefaultValue,
  setUpdateAbsentDefaultValue
 };
 // --------------------------------------
 // Context State of create type  dialog
 const [shouldCreatePaymentDialogOpen, setShouldCreatePaymentDialogOpen] =
  useState(false);

 const createDialogPaymentState = {
  shouldCreatePaymentDialogOpen,
  setShouldCreatePaymentDialogOpen
 };
 // --------------------------------------
 // Context State of view order  dialog
 const [shouldViewPaymentDialogOpen, setShouldViewPaymentDialogOpen] =
  useState(false);

 const viewDialogPaymentState = {
  shouldViewPaymentDialogOpen,
  setShouldViewPaymentDialogOpen
 };

 const defaultProviderValue = {
  ...updateDialogAccessoryState,
  ...createDialogAccessoryState,
  ...updateDialogServiceState,
  ...createDialogServiceState,
  ...updateDialogEmployeeState,
  ...createDialogEmployeeState,
  ...createDialogPackageState,
  ...createDialogManufacturerState,
  ...createDialogModelState,
  ...updateDialogPackageState,
  ...updateDialogManufacturerState,
  ...createDialogCouponState,
  ...updateDialogCouponState,
  ...createDialogTypeState,
  ...createDialogNotificationState,
  ...updateDialogAbsentState,
  ...createDialogPaymentState,
  ...viewDialogPaymentState
 };

 return (
  <DialogContext.Provider value={defaultProviderValue}>
   {children}
  </DialogContext.Provider>
 );
};

export default DialogContextProvider;
