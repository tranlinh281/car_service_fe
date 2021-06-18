import { MANUFACTURER_LIST_FAIL, MANUFACTURER_LIST_REQUEST, MANUFACTURER_LIST_SUCCESS } from "src/constants/ManufacturerConstant";


export const listManufacturerReducer = (
    state = { loading: true, manufacturers: [] },
    action
  ) => {
    switch (action.type) {
      case MANUFACTURER_LIST_REQUEST:
        return { loading: true };
      case MANUFACTURER_LIST_SUCCESS:
        return {
          loading: false,
          manufacturers: action.payload
        };
      case MANUFACTURER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };