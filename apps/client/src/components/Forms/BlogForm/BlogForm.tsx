'use client';
import Alert, { AlertMessage } from '@client/components/ui/Alert';
import { Category, FileModel } from '@prisma/client';
import { ErrorMessage, Formik, FormikHelpers } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import * as yup from 'yup';
import UploadFiles from '../../File/UploadFiles';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
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
};
type PropsType = {
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void;
  initialValues: BlogFormType;
  message?: AlertMessage;
  setMessage: Dispatch<SetStateAction<AlertMessage | undefined>>;
  categories: Category[];
  files: FileModel[];
};

export default function BlogForm({
  onSubmit,
  initialValues,
  message,
  setMessage,
  categories,
  files,
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
        setFieldValue,
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
          <div className="col-span-1 flex flex-col gap-1 w-full">
            <label>Slug</label>
            <input
              type="text"
              name="slug"
              className={`input ${
                !!touched.slug && !!errors.slug
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.slug}
            />
            <ErrorMessage
              name="slug"
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
          <div className="col-span-2 flex flex-col gap-1 w-full">
            <label>Image</label>
            <UploadFiles
              defaultValues={files.filter(
                (file) => file.id === initialValues.fileModelId
              )}
              multiple={false}
              files={files}
              onUpload={(files) => {
                setFieldValue('fileModelId', files?.[0].id);
              }}
            >
              {({ setShow }) => (
                <button
                  type="button"
                  onClick={() => setShow((prev) => !prev)}
                  className="btn-primary py-2 px-4"
                >
                  Upload Image
                </button>
              )}
            </UploadFiles>
          </div>
          <div className="col-span-2 py-2 flex items-center gap-1 w-full">
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
          <div className="col-span-2 flex flex-col gap-1 w-full">
            <label>Content</label>
            <ReactQuill
              theme="snow"
              value={values.content}
              defaultValue={values.content}
              className={`mb-8 ${
                !!touched.content && !!errors.content
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              modules={{
                toolbar: [
                  [{ font: [] }],
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
                  [{ color: [] }, { background: [] }],
                  [{ script: 'sub' }, { script: 'super' }],
                  ['blockquote', 'code-block'],
                  ['clean'],
                ],
              }}
              onChange={(newValue) => setFieldValue('content', newValue)}
            />
            <ErrorMessage
              name="content"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
          </div>
          <div className="col-span-2 flex justify-end  gap-1 w-full mt-8">
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
