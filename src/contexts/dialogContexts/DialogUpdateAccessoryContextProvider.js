const { createContext, useState } = require('react');

export const DialogContext = createContext();

const DialogContextProvider = ({ children }) => {
 // Context State of update accessory dialog
 const [shouldUpdateAccessoryDialogOpen, setShouldUpdateAccessoryDialogOpen] =
  useState(false);
 const [updateAccessoryDefaultValue, setUpdateAccessoryDefaultValue] =
  useState({});

 const updateDialogAccessoryState = {
  shouldUpdateAccessoryDialogOpen,
  setShouldUpdateAccessoryDialogOpen,
  updateAccessoryDefaultValue,
  setUpdateAccessoryDefaultValue
 };

 // -------------------------------------------------------------------------------

 const defaultProviderValue = {
  ...updateDialogAccessoryState
 };

 return (
  <DialogContext.Provider value={defaultProviderValue}>
   {children}
  </DialogContext.Provider>
 );
};

export default DialogContextProvider;
