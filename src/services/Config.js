//base url
export const BASE_URL = 'https://carservicesystem.azurewebsites.net/api/';

//Admin url
export const ADMIN = 'Employees';
export const USERS = 'Users';
export const USERNAME = 'username=';
export const CUSTOMER = 'Customers';
export const EMPLOYEE = 'employees';
export const MANUFACTURER = 'manufacturers';
export const ACCESSORY = 'Accessories';
export const ACCESSORYID = 'accessoryId=';
export const SERVICEID = 'serviceId=';
export const SERVICE = 'Services';
export const TYPE = 'types';
export const OFFER = 'offer';
export const PAGING = '/paging?PageNumber=';
export const PAGESIZE = '&PageSize=';
export const FORWARD_SLASH = '/';
export const QUESTION_MARK = '?';
export const SEARCH_VALUE = 'searchValue=';
export const NAME_SEARCH = 'nameSearch=';
export const INSERT_MANUFACTURER = '?manufacturer=';
export const IMANUFACTURER_MODEL = '/models';
export const FULLNAME_SEARCH = 'fullnameSearch=';

//Login
export const LOGIN_URL = BASE_URL + USERS;

//Customer
export const GET_CUSTOMER_LIST_URL = BASE_URL + CUSTOMER;

export const GET_CUSTOMER_PAGING_URL = GET_CUSTOMER_LIST_URL + PAGING;

export const GET_CUSTOMER_BY_USERNAME_URL =
 GET_CUSTOMER_LIST_URL + QUESTION_MARK + FULLNAME_SEARCH;

//Employee
export const GET_EMPLOYEE_LIST_URL = BASE_URL + ADMIN;

export const GET_EMPLOYEE_BY_USERNAME_URL =
 GET_EMPLOYEE_LIST_URL + QUESTION_MARK + SEARCH_VALUE;

export const POST_NEW_EMPLOYEE = GET_EMPLOYEE_LIST_URL;
export const DELETE_EMPLOYEE = GET_EMPLOYEE_LIST_URL + QUESTION_MARK + USERNAME;
// Accessory
export const GET_ACCESSORY_LIST_URL = BASE_URL + ACCESSORY;
export const UPDATE_ACCESSORY_URL = GET_ACCESSORY_LIST_URL;
export const GET_ACCESSORY_PAGING_URL = GET_ACCESSORY_LIST_URL + PAGING;
export const DELETE_ACCESSORY =
 GET_ACCESSORY_LIST_URL + QUESTION_MARK + ACCESSORYID;
export const GET_ACCESSORY_BY_USERNAME_URL =
 GET_ACCESSORY_LIST_URL + QUESTION_MARK + NAME_SEARCH;
export const POST_NEW_ACCESSORY = GET_ACCESSORY_LIST_URL;

//Manufacturer
export const GET_MANUFACTURER_LIST_URL = BASE_URL + MANUFACTURER;

export const GET_MANUFACTURER_BY_NAME_URL =
 GET_MANUFACTURER_LIST_URL + FORWARD_SLASH;

export const POST_NEW_MANUFACTURER =
 GET_MANUFACTURER_LIST_URL + INSERT_MANUFACTURER;

export const POST_NEW_MANUFACTURER_WITH_MODELS =
 GET_MANUFACTURER_LIST_URL + INSERT_MANUFACTURER;
//Service
export const GET_SERVICE_LIST_URL = BASE_URL + SERVICE;
export const UPDATE_SERVICE_URL = GET_SERVICE_LIST_URL;
export const GET_SERVICE_TYPE_LIST_URL =
 GET_SERVICE_LIST_URL + FORWARD_SLASH + TYPE;
export const GET_SERVICE_PAGING_URL = GET_SERVICE_LIST_URL + PAGING;
export const GET_SERVICE_BY_USERNAME_URL =
 GET_SERVICE_LIST_URL + QUESTION_MARK + NAME_SEARCH;
export const POST_NEW_SERVICE = GET_SERVICE_LIST_URL;
export const DELETE_SERVICE = GET_SERVICE_LIST_URL + QUESTION_MARK + SERVICEID;

//Offer

// {
//     "username": "tranlinh",
//         "password": "",
//             "role": "string",
//                 "fullname": "string",
//                     "phoneNumber": "string",
//                         "dateOfBirth": "2021-06-12T07:14:21.651Z"
// }

// https://carservicesystem.azurewebsites.net/api/Users

// {
//     "manufacturerName": "Toyota",
//     "models": [
//       "Toyota 1997, Toyota 2012"
//     ]
//   }
