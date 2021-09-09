//base url
export const BASE_URL = 'https://carservicesystem.azurewebsites.net/api/';

//Admin url
export const ADMIN = 'Employees';
export const USERS = 'Users';
export const USERNAME = 'username=';
export const PACKAGEID = 'id=';
export const CUSTOMER = 'Customers';
export const COUPON = 'coupons';
export const ORDERS = 'orders';
export const EMPLOYEE = 'employees';
export const DETAILED = 'detailed';
export const PACKAGES = 'packages';
export const ABSENCE = 'absences';
export const TRANSACTION = 'transactions';
export const MANUFACTURER = 'manufacturers';
export const ACCESSORY = 'Accessories';
export const ACCESSORYID = 'accessoryId=';
export const SERVICEID = 'serviceId=';
export const SERVICE = 'Services';
export const TYPE = 'types';
export const OFFER = 'offer';
export const PAGING = '/page?';
export const PAGINGS = '/paging?';
export const PAGENUMBER = 'pageNumber=';
export const CONTENT = 'content';
export const PAGESIZE = '&pageSize=10';
export const PAGESIZEMAN = '&pageSize=9';
export const FORWARD_SLASH = '/';
export const QUESTION_MARK = '?';
export const SEARCH_VALUE = '&searchValue=';
export const MODELS = 'models';
export const NAME = 'name=';
export const COUPONID = 'couponId=';
export const NAME_SEARCH = 'nameSearch=';
export const INSERT_MANUFACTURER = '?manufacturer=';
export const FULLNAME_SEARCH = 'fullnameSearch=';
export const isBANNED = '&isBanned=';
export const BAN = 'ban?';
export const NOTIFICATION = 'notifications';

//Login
export const LOGIN_URL = BASE_URL + USERS;

//Customer
export const GET_CUSTOMER_LIST_URL = BASE_URL + CUSTOMER;
export const CUSTOMER_NOTIFICATION = BASE_URL + NOTIFICATION;

export const banCustomer = (username) =>
 GET_CUSTOMER_LIST_URL + FORWARD_SLASH + BAN + USERNAME + username + isBANNED;

export const GET_CUSTOMER_PAGING_URL =
 GET_CUSTOMER_LIST_URL + PAGING + PAGENUMBER + PAGESIZE + SEARCH_VALUE;

export const getCustomerPagingURL = (page = 1) =>
 GET_CUSTOMER_LIST_URL + PAGING + PAGENUMBER + page + PAGESIZE + SEARCH_VALUE;

export const GET_CUSTOMER_BY_USERNAME_URL =
 GET_CUSTOMER_LIST_URL + QUESTION_MARK + FULLNAME_SEARCH;

//Employee
export const GET_EMPLOYEE_LIST_URL = BASE_URL + ADMIN;
export const getEmployeeAbsentPagingURL = (page = 1) =>
 GET_EMPLOYEE_LIST_URL +
 FORWARD_SLASH +
 ABSENCE +QUESTION_MARK+
 PAGENUMBER +
 page +
 PAGESIZE +
 SEARCH_VALUE;
export const UPDATE_EMPLOYEE_URL = GET_EMPLOYEE_LIST_URL;

export const getEmployeePagingURL = (page = 1) =>
 GET_EMPLOYEE_LIST_URL + PAGING + PAGENUMBER + page + PAGESIZE + SEARCH_VALUE;

export const GET_EMPLOYEE_BY_USERNAME_URL =
 GET_EMPLOYEE_LIST_URL + QUESTION_MARK + SEARCH_VALUE;

export const POST_NEW_EMPLOYEE = GET_EMPLOYEE_LIST_URL;
export const DELETE_EMPLOYEE = GET_EMPLOYEE_LIST_URL + QUESTION_MARK + USERNAME;
// Accessory
export const GET_ACCESSORY_LIST_URL = BASE_URL + ACCESSORY;
export const getAccessoryPagingURL = (page = 1) =>
 GET_ACCESSORY_LIST_URL + PAGING + PAGENUMBER + page + PAGESIZE + SEARCH_VALUE;
export const GET_ACCESSORY_TYPE_LIST_URL =
 GET_ACCESSORY_LIST_URL + FORWARD_SLASH + TYPE;
export const GET_ACCESSORY_TYPE_LIST_BY_USERNAME_URL =
 GET_ACCESSORY_TYPE_LIST_URL + QUESTION_MARK + NAME_SEARCH;
export const UPDATE_ACCESSORY_URL = GET_ACCESSORY_LIST_URL;
export const GET_ACCESSORY_PAGING_URL = GET_ACCESSORY_LIST_URL + PAGING;
export const DELETE_ACCESSORY =
 GET_ACCESSORY_LIST_URL + QUESTION_MARK + ACCESSORYID;
export const GET_ACCESSORY_BY_USERNAME_URL =
 GET_ACCESSORY_LIST_URL + QUESTION_MARK + NAME_SEARCH;
export const POST_NEW_ACCESSORY = GET_ACCESSORY_LIST_URL;
export const POST_NEW_ACCESSORY_TYPE =
 GET_ACCESSORY_TYPE_LIST_URL + QUESTION_MARK + NAME;

//Manufacturer
export const GET_MANUFACTURER_LIST_URL = BASE_URL + MANUFACTURER;
export const UPDATE_MANUFACTURER_URL = GET_MANUFACTURER_LIST_URL;
export const GET_MANUFACTURER_BY_NAME_URL =
 GET_MANUFACTURER_LIST_URL + QUESTION_MARK + NAME_SEARCH;

export const POST_NEW_MANUFACTURER = GET_MANUFACTURER_LIST_URL;
export const POST_NEW_MODELS =
 GET_MANUFACTURER_LIST_URL + FORWARD_SLASH + MODELS;
export const getManufacturerPagingURL = (page = 1) =>
 GET_MANUFACTURER_LIST_URL +
 PAGINGS +
 PAGENUMBER +
 page +
 PAGESIZEMAN +
 SEARCH_VALUE;

//Service
export const GET_SERVICE_LIST_URL = BASE_URL + SERVICE;
export const UPDATE_SERVICE_URL = GET_SERVICE_LIST_URL;
export const GET_SERVICE_TYPE_LIST_URL =
 GET_SERVICE_LIST_URL + FORWARD_SLASH + TYPE;
export const getServicePagingURL = (page = 1) =>
 GET_SERVICE_LIST_URL + PAGINGS + PAGENUMBER + page + PAGESIZE + SEARCH_VALUE;
export const GET_SERVICE_BY_USERNAME_URL =
 GET_SERVICE_LIST_URL + QUESTION_MARK + NAME_SEARCH;
export const POST_NEW_SERVICE = GET_SERVICE_LIST_URL;

export const DELETE_SERVICE = GET_SERVICE_LIST_URL + QUESTION_MARK + SERVICEID;

// Packages
export const GET_PACKAGE_LIST_URL = BASE_URL + PACKAGES;
export const getPackagePagingURL = (page = 1) =>
 GET_PACKAGE_LIST_URL + PAGINGS + PAGENUMBER + page + PAGESIZE + SEARCH_VALUE;
export const POST_NEW_PACKAGE = GET_PACKAGE_LIST_URL;
export const DELETE_PACKAGE = GET_PACKAGE_LIST_URL + QUESTION_MARK + PACKAGEID;
export const UPDATE_PACKAGE_URL = GET_PACKAGE_LIST_URL;
export const GET_PACKAGE_BY_ID = GET_PACKAGE_LIST_URL + FORWARD_SLASH;
export const GET_PACKAGE_CONTENT =
 GET_PACKAGE_LIST_URL + FORWARD_SLASH + CONTENT;

//Types
export const GET_TYPE_LIST_URL = BASE_URL + TYPE;
export const POST_NEW_SERVICE_TYPE = GET_TYPE_LIST_URL + QUESTION_MARK + NAME;

//coupons
export const GET_COUPON_LIST_URL = BASE_URL + COUPON;
export const POST_NEW_COUPON = GET_COUPON_LIST_URL;
export const UPDATE_COUPON_URL = GET_COUPON_LIST_URL;
export const DELETE_COUPON = GET_COUPON_LIST_URL + QUESTION_MARK + COUPONID;

//order
export const GET_ORDER_LIST_URL = BASE_URL + ORDERS;

//transactions
export const GET_ORDER_PAYMENT_LIST_URL = BASE_URL + TRANSACTION;

export const GET_ORDER_PAYMENT_DETAILED_LIST_URL =
 GET_ORDER_PAYMENT_LIST_URL + FORWARD_SLASH + DETAILED;

export const getTransactionPagingURL = (page = 1) =>
 GET_ORDER_PAYMENT_DETAILED_LIST_URL +
 QUESTION_MARK +
 PAGENUMBER +
 page +
 PAGESIZE;
