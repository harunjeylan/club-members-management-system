'use client';
import { ErrorMessage, Formik } from 'formik';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Alert, { AlertMessage } from '../ui/Alert';
import handleRegister from '@client/libs/actions/handleCreateRole';
function RegisterForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues = {
    // name: "",
    username: '',
    email: '',
    password: '',
  };
  let userSchema = Yup.object({
    // name: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

  async function onSubmit(
    values: {
      username: string;
      email: string;
      password: string;
    },
    {}
  ) {
    const next = searchParams.get('next');
    const response = await handleRegister(values, dispatch, () =>
      router.push(next ?? '/')
    );
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
          <div className="col-span-2 flex flex-col gap-1 w-full">
            <button
              type="submit"
              className="btn-primary py-2"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
          <div className="flex flex-row gap-1 w-full">
            <span>I have an account</span>
            <Link href="/auth/login" className="link-text">
              Login
            </Link>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default RegisterForm;
