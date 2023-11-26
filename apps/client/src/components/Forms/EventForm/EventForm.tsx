'use client';
import * as yup from 'yup';

import Alert, { AlertMessage } from '@client/components/ui/Alert';
import { Category, Event, Repeat } from '@prisma/client';
import { ErrorMessage, Formik, FormikHelpers } from 'formik';
import { Dispatch, SetStateAction } from 'react';
export type EventFormType = {
  title: string;
  startAt: string;
  endAt: string;
  fullDay: boolean;
  repeat: Repeat;
  published: boolean;
  location: string;
  description: string;
  categoryId: string;
  spaceName?: string;
};
type PropsType = {
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void;
  initialValues: EventFormType;
  message?: AlertMessage;
  setMessage: Dispatch<SetStateAction<AlertMessage | undefined>>;
  categories: Category[];
};

export default function EventForm({
  onSubmit,
  initialValues,
  message,
  setMessage,
  categories,
}: PropsType) {
  const yupSchema = yup.object<EventFormType>({
    title: yup.string().required(),
    repeat: yup
      .string()
      .equals([
        Repeat.NO_REPEAT,
        Repeat.EVERY_DAY,
        Repeat.EVERY_WEEK,
        Repeat.EVERY_MONTH,
        Repeat.EVERY_YEAR,
      ])
      .required(),
    startAt: yup.date().required(),
    endAt: yup.date().required(),
    fullDay: yup.boolean().required(),
    published: yup.boolean().required(),
    description: yup.string(),
    location: yup.string(),
    categoryId: yup.string(),
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
            <label>Category</label>
            <select
              name="categoryId"
              className={`input py-2 px-2 ${
                !!touched.categoryId && !!errors.categoryId
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.categoryId ?? ''}
            >
              <option value={''}>-----</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <ErrorMessage
              name="categoryId"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-1 w-full">
            <label>Start At</label>
            <input
              type="datetime-local"
              name="startAt"
              className={`input ${
                !!touched.startAt && !!errors.startAt
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.startAt}
            />
            <ErrorMessage
              name="startAt"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-1 w-full">
            <label>End At</label>
            <input
              type="datetime-local"
              name="endAt"
              className={`input ${
                !!touched.endAt && !!errors.endAt
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.endAt}
            />
            <ErrorMessage
              name="endAt"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
          </div>
          <div className="col-span-2 flex flex-col gap-1 w-full">
            <label>Repeat</label>
            <select
              name="repeat"
              className={`input py-2 px-2 ${
                !!touched.repeat && !!errors.repeat
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.repeat}
            >
              <option value={Repeat.NO_REPEAT}>No Repeat</option>
              <option value={Repeat.EVERY_DAY}>Every Days</option>
              <option value={Repeat.EVERY_WEEK}>Every Weeks</option>
              <option value={Repeat.EVERY_MONTH}>Every Months</option>
              <option value={Repeat.EVERY_YEAR}>Every Years</option>
            </select>
            <ErrorMessage
              name="repeat"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
          </div>
          <div className="col-span-1 py-2 flex items-center gap-1 w-full">
            <input
              checked={values.fullDay}
              id="fullDay"
              type="checkbox"
              name={'fullDay'}
              onChange={handleChange}
              className="checkbox"
            />
            <label htmlFor="fullDay">Full Day</label>
          </div>
          <div className="col-span-1 py-2 flex items-center gap-1 w-full">
            <input
              checked={values.published}
              id="published"
              type="checkbox"
              name={'published'}
              onChange={handleChange}
              className="checkbox"
            />
            <label htmlFor="published">Published</label>
          </div>
          <div className="col-span-2 flex flex-col gap-1 w-full">
            <label>Location</label>
            <input
              type="text"
              name="location"
              className={`input ${
                !!touched.location && !!errors.location
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.location ?? ''}
            />
            <ErrorMessage
              name="location"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
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
