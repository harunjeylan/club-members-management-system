'use client';
import handleUpdateUser from '@client/libs/client/handleUpdateUser';
import { Role, Space } from '@prisma/client';
import { ErrorMessage, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { UserWithProfileAndRoles } from 'types/user';
import * as yup from 'yup';
import Alert, { AlertMessage } from '../ui/Alert';
function UpdateUserForm({
  user,
  roles,
  spaces,
}: {
  user: Partial<UserWithProfileAndRoles & { spaces: Space[] }>;
  roles: Role[];
  spaces: Space[];
}) {
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues = {
    first_name: user.first_name ?? '',
    last_name: user.last_name ?? '',
    username: user.username ?? '',
    email: user.email ?? '',
    roles: user.roles?.map((role) => role.id) ?? [],
    spaces: user.spaces?.map((role) => role.name) ?? [],
  };
  let userSchema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required(),
    roles: yup.array(yup.string()),
    spaces: yup.array(yup.string()),
  });
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (message) {
        setMessage(undefined);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [message]);

  async function onSubmit(
    values: {
      first_name: string;
      last_name: string;
      username: string;
      email: string;
      roles: string[];
      spaces: string[];
    },
    {}
  ) {
    if (!user.id) {
      return setMessage({
        type: 'warning',
        summery: 'User Id Not Found',
        title: 'Warning ',
      });
    }
    const response = await handleUpdateUser(user.id, values);
    console.log(response.user);
    
    if (response.user) {
      setMessage({
        type: 'success',
        summery: 'User updated successfully',
        title: 'Success ',
      });
    }
    if (response?.error) {
      setMessage({
        type: 'warning',
        summery: response?.error,
        title: 'Warning ',
      });
    }
  }

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={userSchema}
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
          <div className="col-span-2 flex flex-col gap-4 w-full">
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
                <option value={''}>-----</option>
                {spaces.map((space) => (
                  <option value={space.name}>{space.name}</option>
                ))}
              </select>
              <ErrorMessage
                name="first_name"
                component="div"
                className="text-red-500 dark:text-red-300"
              />
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-4 w-full">
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
                <option value={''}>-----</option>
                {roles.map((role) => (
                  <option value={role.id}>
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
          </div>
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

export default UpdateUserForm;
