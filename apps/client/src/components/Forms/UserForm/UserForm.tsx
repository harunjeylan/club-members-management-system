'use client';
import * as yup from 'yup';
import { ErrorMessage, Formik, FormikHelpers } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import Alert, { AlertMessage } from '../../ui/Alert';
import { Role, Space } from '@prisma/client';

export type UserFormType = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password?: string;
  roles: string[];
  spaces: string[];
};

type PropsType = {
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void;
  initialValues: UserFormType;
  message?: AlertMessage;
  setMessage: Dispatch<SetStateAction<AlertMessage | undefined>>;
  roles?: Role[];
  spaces?: Space[];
};
export default function UserForm({
  spaces,
  roles,
  onSubmit,
  initialValues,
  message,
  setMessage,
}: PropsType) {
  const yupSchema = yup.object<UserFormType>({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required(),
    roles: yup.array(yup.string()),
    spaces: yup.array(yup.string()),
    password: yup.string(),
  });
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={yupSchema}
    >
      {({
        errors,
        touched,
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          onSubmit={handleSubmit}
          className=" w-full grid grid-cols-2 gap-4"
        >
          {message && (
            <div className="col-span-2">
              <Alert
                message={message}
                handleRemove={() => setMessage(undefined)}
              />
            </div>
          )}
          <div className="col-span-1 flex flex-col gap-1 w-full">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              className={`input ${
                !!touched.first_name && !!errors.first_name
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.first_name}
            />
            <ErrorMessage
              name="first_name"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-1 w-full">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              className={`input ${
                !!touched.last_name && !!errors.last_name
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.last_name}
            />
            <ErrorMessage
              name="last_name"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-1 w-full">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className={`input ${
                !!touched.username && !!errors.username
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-1 w-full">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className={`input ${
                !!touched.email && !!errors.email
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
          </div>
          <div className="col-span-2 flex flex-col gap-1 w-full">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className={`input ${
                !!touched.password && !!errors.password
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
          </div>
          {spaces?.length ? (
            <div className="col-span-2 flex flex-col gap-1 w-full">
              <label>Space</label>
              <select
                name="spaces"
                className={`input py-2 px-2  ${
                  !!touched.spaces && !!errors.spaces
                    ? 'bg-red-300/50 border border-red-500'
                    : ''
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.spaces}
                multiple
              >
                {spaces.map((space) => (
                  <option key={space.name} value={space.name}>
                    {space.name}
                  </option>
                ))}
              </select>
              <ErrorMessage
                name="first_name"
                component="div"
                className="text-red-500 dark:text-red-300"
              />
            </div>
          ) : (
            ''
          )}
          {roles?.length ? (
            <div className="col-span-2 flex flex-col gap-1 w-full">
              <label>Role</label>
              <select
                name="roles"
                className={`input py-2 px-2  ${
                  !!touched.roles && !!errors.roles
                    ? 'bg-red-300/50 border border-red-500'
                    : ''
                }`}
                multiple
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.roles}
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.spaceName ? role.spaceName + ' -> ' : ''}
                    {role.name}
                  </option>
                ))}
              </select>
              <ErrorMessage
                name="first_name"
                component="div"
                className="text-red-500 dark:text-red-300"
              />
            </div>
          ) : (
            ''
          )}
          <div className="col-span-2 flex flex-col justify-end gap-1 w-full">
            <button
              type="submit"
              className="btn-primary py-2"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
