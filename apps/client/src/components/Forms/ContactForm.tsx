'use client';
import { ErrorMessage, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import Alert, { AlertMessage } from '../ui/Alert';
import handleCreateContact from '@client/libs/client/contact/handleCreateContact';
import { TransitionContext } from '@client/context/TransitionContext';
const phoneRegExp = /^\+?1?\d{9,15}$/;
function ContactForm() {
  const { handleServerMutation } = useContext(TransitionContext);
  const [messages, setMessages] = useState<AlertMessage[]>([]);
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
      if (messages) {
        setMessages([]);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [messages]);
  async function onSubmit(values: typeof initialValues) {
    const response = await handleCreateContact(values);
    if (response.contact) {
      setMessages([
        {
          type: 'success',
          summery: 'Message is sent successfully',
          title: 'Success ',
        },
      ]);
    }
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
            {messages.map((message, ind) => (
              <div key={ind} className="col-span-2">
                <Alert
                  message={message}
                  handleRemove={() =>
                    setMessages((prevMessages) => prevMessages.splice(ind, 1))
                  }
                />
              </div>
            ))}
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
            <div className="col-span-2 flex justify-end  gap-1 w-full">
              <button
                type="submit"
                className="btn-primary py-2 px-4"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

export default ContactForm;
