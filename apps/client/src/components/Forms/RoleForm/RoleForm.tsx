'use client';
import * as yup from 'yup';

import Alert, { AlertMessage } from '@client/components/ui/Alert';
import { Role, RoleCode, RoleScop, Space } from '@prisma/client';
import { ErrorMessage, Formik, FormikHelpers } from 'formik';
import { Dispatch, SetStateAction } from 'react';

type PropsType = {
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void;
  initialValues: Partial<Role>;
  message?: AlertMessage;
  setMessage: Dispatch<SetStateAction<AlertMessage | undefined>>;
  spaces: Space[];
};
export default function RoleForm({
  spaces,
  onSubmit,
  initialValues,
  message,
  setMessage,
}: PropsType) {
  let yupSchema = yup.object<Partial<Role>>({
    name: yup.string().required(),
    code: yup
      .string()
      .equals([RoleCode.ADMIN, RoleCode.EDITOR, RoleCode.MEMBER])
      .required(),
    scop: yup.string().equals([RoleScop.SPACE, RoleScop.SUPER]).required(),
    description: yup.string(),
    spaceName: yup.string().when('scop', {
      is: (scop: RoleScop) => scop === RoleScop.SPACE,
      then: () => yup.string().required('required in space scop'),
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
            <label>Code</label>
            <select
              name="code"
              className={`input py-2 px-2 ${
                !!touched.code && !!errors.code
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.code}
            >
              <option value={RoleCode.MEMBER}>Member</option>
              <option value={RoleCode.EDITOR}>Editor</option>
              <option value={RoleCode.ADMIN}>Admin</option>
            </select>
            <ErrorMessage
              name="code"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-1 w-full">
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
              <option value={RoleScop.SPACE}>Space</option>
              <option value={RoleScop.SUPER}>Super</option>
            </select>
            <ErrorMessage
              name="scop"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
          </div>
          {values.scop === RoleScop.SPACE && (
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
              value={values.description}
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
