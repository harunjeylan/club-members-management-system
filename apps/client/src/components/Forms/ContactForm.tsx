'use client';
import { ErrorMessage, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import Alert, { AlertMessage } from '../ui/Alert';
const phoneRegExp = /^\+?1?\d{9,15}$/;
function ContactForm() {
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };
  let yupSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .required('required')
      .matches(
        phoneRegExp,
        "Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
      ),
    subject: yup.string().required(),
    message: yup.string().required(),
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
  async function onSubmit(values: typeof initialValues) {
    console.log({ values });

    // const response = await handleCreateCategory(values);
    // console.log({ response });
    // if (response.category) {
    //   setMessage({
    //     type: 'success',
    //     summery: 'Category created successfully',
    //     title: 'Success ',
    //   });
    // }
    // if (response?.message) {
    //   setMessage({
    //     type: 'error',
    //     summery: response?.message,
    //     title: 'Error ',
    //   });
    // }
  }
  return (
    <>
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
            <div className="col-span-2 flex flex-col gap-1 w-full">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className={`input ${
                  !!touched.name && !!errors.name
                    ? 'bg-red-300/50 border border-red-500'
                    : ''
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <ErrorMessage
                name="name"
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
            <div className="col-span-1 flex flex-col gap-1 w-full">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                className={`input ${
                  !!touched.phone && !!errors.phone
                    ? 'bg-red-300/50 border border-red-500'
                    : ''
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 dark:text-red-300"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-1 w-full">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                className={`input ${
                  !!touched.subject && !!errors.subject
                    ? 'bg-red-300/50 border border-red-500'
                    : ''
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.subject}
              />
              <ErrorMessage
                name="subject"
                component="div"
                className="text-red-500 dark:text-red-300"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-1 w-full">
              <label>Message</label>
              <textarea
                name="message"
                className={`input ${
                  !!touched.message && !!errors.message
                    ? 'bg-red-300/50 border border-red-500'
                    : ''
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message ?? ''}
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500 dark:text-red-300"
              />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

export default ContactForm;
