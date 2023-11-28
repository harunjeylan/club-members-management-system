'use client';
import { setUser } from '@client/libs/features/userSlice';
import handleLogin from '@client/libs/client/user/handleLogin';
import { ErrorMessage, Formik } from 'formik';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Alert, { AlertMessage } from '../ui/Alert';
import { useEffect, useState } from 'react';
function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<AlertMessage[]>([]);
  const initialValues = {
    identifier: '',
    password: '',
  };
  let userSchema = Yup.object({
    identifier: Yup.string().required(),
    password: Yup.string().required(),
  });
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (messages) {
        setMessages([]);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [messages]);

  async function onSubmit(
    values: {
      identifier: string;
      password: string;
    },
    {}
  ) {
    const next = searchParams.get('next');
    const response = await handleLogin(values, dispatch, () =>
      router.push(next ?? '/')
    );
    if (response?.errors) {
      setMessages(
        response?.errors.map((error: { message: string; path: string[] }) => ({
          type: 'warning',
          summery: `${error.path?.[0]} : ${error.message}`,
          title: 'Warning ',
        }))
      );
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
        <form onSubmit={handleSubmit} className=" w-full flex flex-col gap-4">
          {messages.map((message, ind) => (
            <div key={ind} className="col-span-2">
              <Alert
                message={message}
                handleRemove={() => setMessages((prevMessages) => prevMessages.splice(ind, 1))}
              />
            </div>
          ))}
          <div className="flex flex-col gap-1 w-full">
            <label>Identifier</label>
            <input
              type="text"
              name="identifier"
              className={`input ${
                !!touched.identifier && !!errors.identifier
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.identifier}
            />
            <ErrorMessage
              name="identifier"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
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
          <div className="flex flex-row gap-1 justify-between w-full">
            <Link href="/auth/register" className="link-text">
              Verify Email
            </Link>
            <Link href="/auth/register" className="link-text">
              Forget Password
            </Link>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <button
              type="submit"
              className="btn-primary py-2"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
          <div className="flex flex-row gap-1 w-full">
            <span>I don&lsquo;t have an account</span>
            <Link href="/auth/register" className="link-text">
              Register
            </Link>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
