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
 // Context State of create accessory dialog
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

 const defaultProviderValue = {
  ...updateDialogAccessoryState,
  ...createDialogAccessoryState,
  ...updateDialogServiceState,
  ...createDialogServiceState,
  ...updateDialogEmployeeState,
  ...createDialogEmployeeState
 };

 return (
  <DialogContext.Provider value={defaultProviderValue}>
   {children}
  </DialogContext.Provider>
 );
};

export default DialogContextProvider;
