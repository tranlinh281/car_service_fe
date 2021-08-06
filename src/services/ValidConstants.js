import * as Yup from 'yup';

export const DisplayingErrorMessagesLoginSchema = Yup.object().shape({
 username: Yup.string()
  .min(3, 'Tài khoản phải trên 3 ký tự!')
  .max(20, 'Tài khoản phải dưới 20 ký tự!')
  .required('Không được bỏ trống'),
 password: Yup.string().required('Không được bỏ trống mật khẩu')
});

export const DisplayingErrorMessagesCreateEmployeeSchema = Yup.object().shape({
 fullname: Yup.string()
  .min(3, 'Họ và tên trên 3 ký tự!')
  .max(20, 'Họ và Tên phải dưới 20 ký tự!')
  .required('Không được bỏ trống họ và tên'),
 email: Yup.string()
  .min(3, 'Email trên 3 ký tự!')
  .max(30, 'Email phải dưới 30 ký tự!')
  .email('Email không hợp lệ')
  .required('Không được bỏ trống Email'),
 address: Yup.string()
  .min(3, 'Địa chỉ trên 3 ký tự!')
  .max(100, 'Địa chỉ phải dưới 100 ký tự!')
  .required('Không được bỏ trống địa chỉ'),
 phoneNumber: Yup.string()
  .matches(/[0-9]+/, 'Must only be number')
  .min(10, 'Số điện thoại phải ít nhất 10 ký tự!')
  .max(11, 'Số điện thoại phải dưới 11 ký tự!')
  .required('Không được bỏ trống số điện thoại'),
 role: Yup.string().required('Không được bỏ trống chức vụ'),
 dateOfBirth: Yup.string()
  .max(10, 'Ngày tháng không hợp lệ')
  .required('Không được bỏ trống ngày tháng năm sinh')
});

export const DisplayingErrorMessagesCreateAccessorySchema = Yup.object().shape({
 name: Yup.string()
  .min(3, 'Tên phụ tùng phải trên 3 ký tự!')
  .max(30, 'Tên phụ tùng phải dưới 30 ký tự!')
  .required('Không được bỏ trống tên phụ tùng'),
 quantity: Yup.string().required('Không được bỏ trống số lượng'),
 price: Yup.string().required('Không được bỏ trống giá của phụ tùng'),
 unit: Yup.string()
  .min(3, 'Đơn vị phải trên 3 ký tự!')
  .max(30, 'Đơn vị phải dưới 30 ký tự!')
  .required('Không được bỏ trống đơn vị của phụ tùng'),
 type: Yup.string().required('Không được bỏ trống loại phụ tùng'),
 manufacturer: Yup.string().required('Không được bỏ trống hãng của phụ tùng')
});

export const DisplayingErrorMessagesCreateTypeSchema = Yup.object().shape({
 type: Yup.string()
  .min(3, 'Loại phải trên 3 ký tự!')
  .max(30, 'Loại phải dưới 30 ký tự!')
  .required('Không được bỏ trống')
});
export const DisplayingErrorMessagesCreateServiceSchema = Yup.object().shape({
 name: Yup.string()
  .min(3, 'Tên dịch vụ phải trên 3 ký tự!')
  .max(50, 'Tên dịch vụ phải dưới 50 ký tự!')
  .required('Không được bỏ trống tên dịch vụ'),
 price: Yup.string()
  .required('Không được bỏ trống giá của dịch vụ')
  .min(3, 'Giá dịch vụ phải trên 3 ký tự!'),
 type: Yup.string().required('Không được bỏ trống loại của dịch vụ')
});
export const DisplayingErrorMessagesPackageSchema = Yup.object().shape({
 name: Yup.string()
  .min(3, 'Tên gói dịch vụ phải trên 3 ký tự')
  .max(50, 'Tên gói dịch vụ phải dưới 50 ký tự!')
  .required('Không được bỏ trống tên của gói dịch vụ'),
 description: Yup.string()
  .required('Không được bỏ trống mô tả')
  .min(3, 'Mô tả dịch vụ phải trên 3 ký tự')
  .max(200, 'Mô tả dịch vụ phải dưới 200 ký tự!'),
 services: Yup.array().required('Không được bỏ trống các dịch vụ'),
 price: Yup.string().required('Không được bỏ trống giá tiền')
});

export const DisplayingErrorMessagesManufacturerSchema = Yup.object().shape({
 name: Yup.string()
  .min(3, 'Tên hãng xe phải trên 3 ký tự')
  .max(50, 'Tên hãng xe phải dưới 50 ký tự!')
  .required('Không được bỏ trống tên của hãng xe')
});

export const DisplayingErrorMessagesModelSchema = Yup.object().shape({
 manufacturerName: Yup.string().required('Không được bỏ trống tên của hãng xe'),
 name: Yup.string()
  .min(3, 'Tên loại  xe phải trên 3 ký tự')
  .max(50, 'Tên loại xe phải dưới 50 ký tự!')
  .required('Không được bỏ trống tên của loại xe')
});
