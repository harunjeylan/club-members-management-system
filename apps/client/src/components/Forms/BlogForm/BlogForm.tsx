'use client';
import * as yup from 'yup';

import Alert, { AlertMessage } from '@client/components/ui/Alert';
import { Category } from '@prisma/client';
import { ErrorMessage, Formik, FormikHelpers } from 'formik';
import { Dispatch, SetStateAction } from 'react';
export type BlogFormType = {
  title: string;
  slug: string;
  published: boolean;
  description: string;
  content: string;
  keyword: string;
  categoryId: string;
  spaceName: string;
  fileModelId: string;
  authorId: string;
};
type PropsType = {
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void;
  initialValues: BlogFormType;
  message?: AlertMessage;
  setMessage: Dispatch<SetStateAction<AlertMessage | undefined>>;
  categories: Category[];
};

export default function BlogForm({
  onSubmit,
  initialValues,
  message,
  setMessage,
  categories,
}: PropsType) {
  const yupSchema = yup.object<BlogFormType>({
    title: yup.string(),
    slug: yup.string(),
    published: yup.boolean(),
    description: yup.string(),
    content: yup.string(),
    keyword: yup.string(),
    categoryId: yup.string(),
    spaceName: yup.string(),
    fileModelId: yup.string(),
    authorId: yup.string(),
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
            <label>keyword</label>
            <input
              type="text"
              name="keyword"
              className={`input ${
                !!touched.keyword && !!errors.keyword
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.keyword ?? ''}
            />
            <ErrorMessage
              name="keyword"
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
