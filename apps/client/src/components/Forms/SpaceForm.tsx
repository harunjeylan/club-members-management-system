'use client';
import handleCreateSpace from '@client/libs/client/handleCreateSpace';
import { Space } from '@prisma/client';
import { ErrorMessage, Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import Alert, { AlertMessage } from '../ui/Alert';
function SpaceForm() {
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues: Partial<Space> = {
    name: '',
    description: '',
    isPrivate: true,
  };
  let yupSchema = yup.object({
    name: yup.string().required(),
    description: yup.string(),
    isPrivate: yup.boolean().required(),
  });

  async function onSubmit(values: Partial<Space>) {
    console.log({ values });

    const response = await handleCreateSpace(values);
    console.log({ response });

    if (response?.error) {
      setMessage({
        type: 'error',
        summery: response?.error,
        title: 'Error ',
      });
    }
  }
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

export default SpaceForm;
