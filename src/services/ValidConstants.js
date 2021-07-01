import * as Yup from 'yup';

export const DisplayingErrorMessagesLoginSchema = Yup.object().shape({
 username: Yup.string()
  .min(3, 'Tài khoản phải trên 3 ký tự!')
  .max(50, 'Tài khoản phải dưới 20 ký tự!')
  .required('Không được bỏ trống'),
 password: Yup.string().required('Không được bỏ trống')
});

export const DisplayingErrorMessagesCreateAccessorySchema = Yup.object().shape({
 name: Yup.string()
  .min(3, 'Tên phụ tùng phải trên 3 ký tự!')
  .max(50, 'Tên phụ tùng phải dưới 30 ký tự!')
  .required('Không được bỏ trống'),
 quantity: Yup.string().required('Không được bỏ trống'),
 price: Yup.string().required('Không được bỏ trống'),
 unit: Yup.string()
  .min(3, 'Loại phải trên 3 ký tự!')
  .max(50, 'Loại phải dưới 30 ký tự!')
  .required('Không được bỏ trống')
});

export const DisplayingErrorMessagesCreateEmployeeSchema = Yup.object().shape({
 fullname: Yup.string()
  .min(3, 'Họ và tên trên 3 ký tự!')
  .max(50, 'Họ và Tên phải dưới 50 ký tự!')
  .required('Không được bỏ trống'),
 email: Yup.string()
  .min(3, 'Email trên 3 ký tự!')
  .max(50, 'Email phải dưới 50 ký tự!')
  .email('Phải đúng định dạng @abc.com')
  .required('Không được bỏ trống'),
 address: Yup.string()
  .min(3, 'Địa chỉ trên 3 ký tự!')
  .max(100, 'Địa chỉ phải dưới 100 ký tự!')
  .required('Không được bỏ trống'),
 phoneNumber: Yup.string()
  .matches(/[0-9]+/, 'Must only be number')
  .min(10, 'Số điện thoại phải ít nhất 10 ký tự!')
  .max(11, 'Số điện thoạ phải dưới 11 ký tự!')
  .required('Không được bỏ trống'),
 role: Yup.string().required('Không được bỏ trống'),
 dateOfBirth: Yup.string().required('Không được bỏ trống')
});
