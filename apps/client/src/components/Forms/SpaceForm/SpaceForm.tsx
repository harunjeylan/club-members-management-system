'use client';
import * as yup from 'yup';

import Alert, { AlertMessage } from '@client/components/ui/Alert';
import { Space } from '@prisma/client';
import { ErrorMessage, Formik, FormikHelpers } from 'formik';
import { Dispatch, SetStateAction } from 'react';

type PropsType = {
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void;
  initialValues: Partial<Space>;
  messages?: AlertMessage[];
  setMessages: Dispatch<SetStateAction<AlertMessage[]>>;
};
export default function SpaceForm({
  onSubmit,
  initialValues,
  messages,
  setMessages,
}: PropsType) {
  const yupSchema = yup.object<Partial<Space>>({
    name: yup.string().required(),
    description: yup.string(),
    isPrivate: yup.boolean().required(),
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
          {messages?.map((message, ind) => (
            <div key={ind} className="col-span-2">
              <Alert
                message={message}
                handleRemove={() => setMessages((prevMessages) => prevMessages?.splice(ind, 1))}
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
          <div className="col-span-1 flex items-center gap-1 w-full">
            <input
              checked={values.isPrivate}
              id="isPrivate"
              type="checkbox"
              name={'isPrivate'}
              onChange={handleChange}
              className="checkbox"
            />
            <label htmlFor="isPrivate">Private</label>
          </div>

          <div className="col-span-2 flex flex-col gap-1 w-full">
            <label>Description</label>
            <textarea
              name="description"
              className={`input ${
                !!touched.description && !!errors.description
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description ?? ''}
            />
            <ErrorMessage
              name="description"
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
  );
}
