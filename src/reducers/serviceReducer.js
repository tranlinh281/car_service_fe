import { SERVICE_LIST_FAIL, SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS } from "src/constants/serviceConstant";



export const listServiceReducer = (
    state = { loading: true, services: [] },
    action
  ) => {
    switch (action.type) {
      case SERVICE_LIST_REQUEST:
        return { loading: true };
      case SERVICE_LIST_SUCCESS:
        return {
          loading: false,
          services: action.payload
        };
      case SERVICE_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };