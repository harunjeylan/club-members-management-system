'use client';
import * as yup from 'yup';

import Alert, { AlertMessage } from '@client/components/ui/Alert';
import { ErrorMessage, Formik, FormikHelpers } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { ForumScop, RoleCode, Space } from '@prisma/client';
export type ForumFormType = {
  title: string;
  description: string;
  spaceName?: string;
  scop:ForumScop
};
type PropsType = {
  spaces?:Space[],
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void;
  initialValues: ForumFormType;
  messages?: AlertMessage[];
  setMessages: Dispatch<SetStateAction<AlertMessage[]>>;
};

export default function ForumForm({
  spaces,
  onSubmit,
  initialValues,
  messages,
  setMessages,
}: PropsType) {
  const yupSchema = yup.object<ForumFormType>({
    title: yup.string().required(),
    description: yup.string(),
    scop: yup.string().equals([ForumScop.GENERAL, ForumScop.LOCAL]).required(),
    spaceName: yup.string().when('scop', {
      is: (scop: ForumScop) => scop === ForumScop.LOCAL,
      then: () => yup.string().required('Space is a required field'),
    }),
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
                handleRemove={() =>
                  setMessages((prevMessages) => prevMessages?.splice(ind, 1))
                }
              />
            </div>
          ))}

          <div className="col-span-2 flex flex-col gap-1 w-full">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className={`input ${
                !!touched.title && !!errors.title
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
          </div>
          <div className="col-span-2 flex flex-col gap-1 w-full">
            <label>Scop</label>
            <select
              name="scop"
              className={`input py-2 px-2  ${
                !!touched.scop && !!errors.scop
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.scop}
            >
              <option value={ForumScop.LOCAL}>Local</option>
              {!values.spaceName && (
                <option value={ForumScop.GENERAL}>General</option>
              )}
            </select>
            <ErrorMessage
              name="scop"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
          </div>
          {values.scop === ForumScop.LOCAL && spaces && (
            <div className="col-span-2 flex flex-col gap-1 w-full">
              <label>Space</label>
              <select
                name="spaceName"
                className={`input py-2 px-2  ${
                  !!touched.spaceName && !!errors.spaceName
                    ? 'bg-red-300/50 border border-red-500'
                    : ''
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.spaceName ?? ''}
              >
                {spaces.map((space) => (
                  <option key={space.name} value={space.name}>
                    {space.name}
                  </option>
                ))}
              </select>
              <ErrorMessage
                name="spaceName"
                component="div"
                className="text-red-500 dark:text-red-300"
              />
            </div>
          )}

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
