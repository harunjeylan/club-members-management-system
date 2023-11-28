'use client';
import * as yup from 'yup';
import { ErrorMessage, Formik, FormikHelpers } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import Alert, { AlertMessage } from '../../ui/Alert';
import { Role, RoleCode, RoleScop, Space } from '@prisma/client';
import { UserWithAll } from 'types/user';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export type UserFormType = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password?: string;
  setRoles?: string[];
  setSpaces?: string[];
  addRoles?: string[];
  addSpaces?: string[];
};

type PropsType = {
  user: UserWithAll;
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void;
  initialValues: UserFormType;
  messages?: AlertMessage[];
  setMessages: Dispatch<SetStateAction<AlertMessage[]>>;
  roles?: Role[];
  spaces?: Space[];
  spaceName?: string;
};
export default function UserForm({
  user,
  spaces,
  roles,
  onSubmit,
  initialValues,
  messages,
  setMessages,
  spaceName,
}: PropsType) {
  const yupSchema = yup.object<UserFormType>({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required(),
    setRoles: yup.array(yup.string()),
    setSpaces: yup.array(yup.string()),
    password: yup.string(),
  });
  const superAdminRoles = getUserAccessRoles(user.roles, [
    { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
  ]);
  const spaceAdminRoles = getUserAccessRoles(user.roles, [
    { scop: RoleScop.SPACE, code: RoleCode.ADMIN, spaceName: spaceName },
    { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
  ]);
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
          {Object.keys(values).includes('password') && (
            <div className="col-span-2 flex flex-col gap-1 w-full">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className={`input ${
                  !!touched.password && !!errors.password
                    ? 'bg-red-300/50 border border-red-500'
                    : ''
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 dark:text-red-300"
              />
            </div>
          )}
          {spaces?.length ? (
            <>
              {Object.keys(values).includes('setSpaces') && (
                <div className="col-span-2 flex flex-col gap-1 w-full">
                  <label>Set Space</label>
                  <select
                    name="setSpaces"
                    className={`input py-2 px-2  ${
                      !!touched.setSpaces && !!errors.setSpaces
                        ? 'bg-red-300/50 border border-red-500'
                        : ''
                    }`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.setSpaces}
                    multiple
                  >
                    {spaces.map((space) => (
                      <option key={space.name} value={space.name}>
                        {space.name}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    name="setSpaces"
                    component="div"
                    className="text-red-500 dark:text-red-300"
                  />
                </div>
              )}
              {Object.keys(values).includes('addSpaces') && (
                <div className="col-span-2 flex flex-col gap-1 w-full">
                  <label>Add Space</label>
                  <select
                    name="addSpaces"
                    className={`input py-2 px-2  ${
                      !!touched.addSpaces && !!errors.addSpaces
                        ? 'bg-red-300/50 border border-red-500'
                        : ''
                    }`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.addSpaces}
                    multiple
                  >
                    {spaces.map((space) => (
                      <option key={space.name} value={space.name}>
                        {space.name}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    name="addSpaces"
                    component="div"
                    className="text-red-500 dark:text-red-300"
                  />
                </div>
              )}
            </>
          ) : (
            ''
          )}
          {((spaceName && !!spaceAdminRoles.length) ||
            !!superAdminRoles.length) &&
          roles?.length ? (
            <>
              {Object.keys(values).includes('setRoles') && (
                <div className="col-span-2 flex flex-col gap-1 w-full">
                  <label>Set Role</label>
                  <select
                    name="setRoles"
                    className={`input py-2 px-2  ${
                      !!touched.setRoles && !!errors.setRoles
                        ? 'bg-red-300/50 border border-red-500'
                        : ''
                    }`}
                    multiple
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.setRoles}
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.spaceName ? role.spaceName + ' -> ' : ''}
                        {role.name}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    name="setRoles"
                    component="div"
                    className="text-red-500 dark:text-red-300"
                  />
                </div>
              )}
              {Object.keys(values).includes('addRoles') && (
                <div className="col-span-2 flex flex-col gap-1 w-full">
                  <label>Add Role</label>
                  <select
                    name="addRoles"
                    className={`input py-2 px-2  ${
                      !!touched.addRoles && !!errors.addRoles
                        ? 'bg-red-300/50 border border-red-500'
                        : ''
                    }`}
                    multiple
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.addRoles}
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.spaceName ? role.spaceName + ' -> ' : ''}
                        {role.name}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    name="addRoles"
                    component="div"
                    className="text-red-500 dark:text-red-300"
                  />
                </div>
              )}
            </>
          ) : (
            ''
          )}
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
