'use client';
import handleCreateUser from '@client/libs/client/handleCreateUser';
import { ErrorMessage, Formik } from 'formik';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Alert, { AlertMessage } from '../ui/Alert';
function CreateUserForm() {
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
  };
  let userSchema = Yup.object({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
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
      password: string;
    },
    {}
  ) {
    const response = await handleCreateUser(values);
    if (response.user) {
      setMessage({
        type: 'success',
        summery: 'User created successfully',
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

export default CreateUserForm;
