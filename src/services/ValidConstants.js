import * as Yup from 'yup';

export const DisplayingErrorMessagesLoginSchema = Yup.object().shape({
 username: Yup.string()
  .min(3, 'Tài khoản phải trên 3 ký tự!')
  .max(20, 'Tài khoản phải dưới 20 ký tự!')
  .required('Không được bỏ trống'),
 password: Yup.string().required('Không được bỏ trống')
});

export const DisplayingErrorMessagesCreateEmployeeSchema = Yup.object().shape({
 fullname: Yup.string()
  .min(3, 'Họ và tên trên 3 ký tự!')
  .max(50, 'Họ và Tên phải dưới 50 ký tự!')
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
  .required('Không được bỏ trống'),
 quantity: Yup.string().required('Không được bỏ trống'),
 price: Yup.string().required('Không được bỏ trống'),
 unit: Yup.string()
  .min(3, 'Loại phải trên 3 ký tự!')
  .max(30, 'Loại phải dưới 30 ký tự!')
  .required('Không được bỏ trống'),
 type: Yup.string().required('Không được bỏ trống'),
 manufacturer: Yup.string().required('Không được bỏ trống')
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
  .max(30, 'Tên dịch vụ phải dưới 30 ký tự!')
  .required('Không được bỏ trống'),
 price: Yup.string().required('Không được bỏ trống'),
 type: Yup.string().required('Không được bỏ trống')
});
export const DisplayingErrorMessagesPackageSchema = Yup.object().shape({
 name: Yup.string()
  .min(3, 'Tên dịch vụ phải trên 3 ký tự')
  .max(50, 'Tên dịch vụ phải dưới 50 ký tự!')
  .required('Không được bỏ trống'),
 description: Yup.string()
  .required('Không được bỏ trống')
  .min(3, 'Mô tả dịch vụ phải trên 3 ký tự')
  .max(500, 'Tên dịch vụ phải dưới 500 ký tự!'),
 services: Yup.array().required('Không được bỏ trống')
});
