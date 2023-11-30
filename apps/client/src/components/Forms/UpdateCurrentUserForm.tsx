'use client';
import { TransitionContext } from '@client/context/TransitionContext';
import handleUpdateCurrentUser from '@client/libs/client/user/handleUpdateCurrentUser';
import { ErrorMessage, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { UserWithAll } from 'types/user';
import * as yup from 'yup';
import UploadFiles from '../File/UploadFiles';
import Alert, { AlertMessage } from '../ui/Alert';

export type UserProfileFormType = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  profile: {
    bio: string;
    fileModelId: string;
  };
};

type PropsType = {
  user: UserWithAll;
};
export default function UpdateCurrentUserForm({ user }: PropsType) {

  const { handleServerMutation } = useContext(TransitionContext);
  const [messages, setMessages] = useState<AlertMessage[]>([]);
  const initialValues: UserProfileFormType = {
    first_name: user.first_name ?? '',
    last_name: user.last_name ?? '',
    username: user.username ?? '',
    email: user.email ?? '',
    profile: {
      bio: user.profile?.bio ?? '',
      fileModelId: user.profile?.fileModelId ?? '',
    },
  };

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

  async function onSubmit(values: UserProfileFormType) {
    if (!user.id) {
      return setMessages([
        {
          type: 'warning',
          summery: 'User Id Not Found',
          title: 'Warning ',
        },
      ]);
    }

    handleServerMutation(async () => {
      const response = await handleUpdateCurrentUser(values);

      if (response.user) {
        setMessages([
          {
            type: 'success',
            summery: 'User updated successfully',
            title: 'Success ',
          },
        ]);
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
  const yupSchema = yup.object<UserProfileFormType>({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required(),
    profile: yup.object({
      bio: yup.string(),
      fileModelId: yup.string(),
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
        setFieldValue,
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
            <label>Image</label>
            <UploadFiles
              multiple={false}
              showPreview={true}
              onUpload={(files) => {
                setFieldValue('profile.fileModelId', files?.[0].id);
              }}
              defaultValues={user.profile?.image ? [user.profile.image] : []}
            >
              {({ setShow }) => (
                <button
                  type="button"
                  onClick={() => setShow((prev) => !prev)}
                  className="btn-primary py-2 px-4"
                >
                  Upload Profile Image
                </button>
              )}
            </UploadFiles>
          </div>
          <div className="col-span-1 flex flex-col gap-1 w-full">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              className={`input ${
                !!touched.first_name && !!errors.first_name
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.first_name}
            />
            <ErrorMessage
              name="first_name"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-1 w-full">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              className={`input ${
                !!touched.last_name && !!errors.last_name
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.last_name}
            />
            <ErrorMessage
              name="last_name"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-1 w-full">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className={`input ${
                !!touched.username && !!errors.username
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            <ErrorMessage
              name="username"
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
          <div className="col-span-2 flex flex-col gap-1 w-full">
            <label>Bio</label>
            <textarea
              name="profile.bio"
              className={`input ${
                !!touched.profile?.bio && !!errors.profile?.bio
                  ? 'bg-red-300/50 border border-red-500'
                  : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.profile?.bio ?? ''}
            />
            <ErrorMessage
              name="profile.bio"
              component="div"
              className="text-red-500 dark:text-red-300"
            />
          </div>
          <div className="col-span-2 flex flex-col justify-end gap-1 w-full">
            <button
              type="submit"
              className="btn-primary py-2"
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
