'use client';
import { ErrorMessage, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import Alert, { AlertMessage } from '../ui/Alert';
import handleCreateCategory from '@client/libs/client/category/handleCreateCategory';
import { Category } from '@prisma/client';
import { TransitionContext } from '@client/context/TransitionContext';
function CreateCategoryForm({ categories }: { categories: Category[] }) {
  const { isPending, handleServerMutation } = useContext(TransitionContext);
  const [messages, setMessages] = useState<AlertMessage[]>([]);
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
      if (messages) {
        setMessages([]);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [messages]);

  async function onSubmit(values: Partial<Category>) {
    handleServerMutation(async () => {
      const response = await handleCreateCategory(values);
      if (response.category) {
        setMessages([{
          type: 'success',
          summery: 'Category created successfully',
          title: 'Success ',
        }]);
      }
      if (response?.errors) {
        setMessages(
          response?.errors.map(
            (error: { message: string; path: string[] }) => ({
              type: 'warning',
              summery: `${error.path?.[0]} : ${error.message}`,
              title: 'Warning ',
            })
          )
        );
      }
    });
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
          {messages.map((message, ind) => (
            <div key={ind} className="col-span-2">
              <Alert
                message={message}
                handleRemove={() => setMessages((prevMessages) => prevMessages.splice(ind, 1))}
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
