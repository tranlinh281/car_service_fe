import { ACCESSORY_LIST_FAIL, ACCESSORY_LIST_REQUEST, ACCESSORY_LIST_SUCCESS } from "src/constants/accessoryConstant";



export const listAccessoryReducer = (
    state = { loading: true, accessories: [] },
    action
  ) => {
    switch (action.type) {
      case ACCESSORY_LIST_REQUEST:
        return { loading: true };
      case ACCESSORY_LIST_SUCCESS:
        return {
          loading: false,
          accessories: action.payload
        };
      case ACCESSORY_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };