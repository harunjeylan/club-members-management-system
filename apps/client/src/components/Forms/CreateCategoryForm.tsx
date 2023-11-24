'use client';
import { ErrorMessage, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import Alert, { AlertMessage } from '../ui/Alert';
import handleCreateCategory from '@client/libs/client/handleCreateCategory';
import { Category } from '@prisma/client';
function CreateCategoryForm({ categories }: { categories: Category[] }) {
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues: Partial<Category & { isSubcategory: boolean }> = {
    name: '',
    isSubcategory: false,
    categoryId: '',
  };
  let yupSchema = yup.object({
    name: yup.string().required(),
    isSubcategory: yup.boolean(),
    categoryId: yup.string().when('isSubcategory', {
      is: true,
      then: () => yup.string().required('required'),
    }),
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

  async function onSubmit(values: Partial<Category>) {
    console.log({ values });

    const response = await handleCreateCategory(values);
    console.log({ response });
    if (response.category) {
      setMessage({
        type: 'success',
        summery: 'Category created successfully',
        title: 'Success ',
      });
    }
    if (response?.message) {
      setMessage({
        type: 'error',
        summery: response?.message,
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
          <div className="col-span-1 py-2 flex items-center gap-1 w-full">
            <input
              checked={values.isSubcategory}
              id="isSubcategory"
              type="checkbox"
              name={'isSubcategory'}
              onChange={handleChange}
              onBlur={handleBlur}
              className="checkbox"
            />
            <label htmlFor="isSubcategory">Is Subcategory</label>
          </div>
          {values.isSubcategory && (
            <div className="col-span-2 flex flex-col gap-4 w-full">
              <div className="col-span-2 flex flex-col gap-1 w-full">
                <label>Main Category</label>
                <select
                  name="categoryId"
                  className={`input py-2 px-`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.categoryId ?? ''}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

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

export default CreateCategoryForm;