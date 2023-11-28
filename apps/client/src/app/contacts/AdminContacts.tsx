'use client';
import Header2 from '@client/components/ui/Header2';
import { TransitionContext } from '@client/context/TransitionContext';
import useConfirmation from '@client/hooks/useConfirmation';
import handleDeleteContact from '@client/libs/client/contact/handleDeleteContact';
import handleRevalidate from '@client/libs/client/handleRevalidate';
import { Contact } from '@prisma/client';
import React, { Suspense, useContext } from 'react';
import { MdDelete } from 'react-icons/md';

export default function AdminContacts({ contacts }: { contacts: Contact[] }) {
  const { confirm, ConfirmComp } = useConfirmation();
  const { handleServerMutation } = useContext(TransitionContext);
  async function deleteContact(contact: Contact) {
    handleServerMutation(async () => {
      const response = await handleDeleteContact(contact.id);
      if (response.contact) {
        // setMessages({
        //   type: 'success',
        //   summery: 'Users are added to Space successfully',
        //   title: 'Success ',
        // });
      }

      if (response?.error) {
        // setMessages({
        //   type: 'error',
        //   summery: response?.error,
        //   title: 'Error ',
        // });
      }
      handleRevalidate({
        path: '/contacts',
        tag: 'getContacts',
      });
    });
  }
  return (
    <section className="w-full ">
      <ConfirmComp className="px-4" />
      <div className="w-full px-1 md:px-2 lg:px-4 mx-full ">
        <div className="flex justify-between w-full  border-b border-secondary-500 my-4 pb-2">
          <Header2 title="Contacts" />
        </div>
        <div className="w-full my-2 p-2 overflow-x-auto bg-secondary-100 dark:bg-secondary-900">
          <Suspense fallback={<div>Loading..</div>}>
            <div className="flex flex-col">
              <table className="border-collapse  text-left text-sm ">
                <thead className="">
                  <tr>
                    <th scope="col" className="px-4 py-2 font-bold text-lg">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-2 font-bold text-lg">
                      Email
                    </th>
                    <th scope="col" className="px-4 py-2 font-bold text-lg">
                      Phone
                    </th>
                    <th scope="col" className="px-4 py-2 font-bold text-lg">
                      Subject
                    </th>
                    <th scope="col" className="px-4 py-2 font-bold text-lg">
                      Message
                    </th>
                    <th scope="col" className="px-4 py-2 font-bold text-lg">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-400 dark:divide-slate-800 border-t border-slate-400 dark:border-slate-800">
                  {contacts?.map((contact) => (
                    <tr
                      key={contact.id}
                      className="hover:bg-secondary-400 dark:hover:bg-secondary-800"
                    >
                      <td className="px-4 py-2 whitespace-nowrap">
                        {contact.name}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {contact.email}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {contact.phone}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {contact.subject}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {contact.message}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <button
                          className="btn-icon"
                          onClick={() =>
                            confirm(() => deleteContact(contact), {
                              title: 'Confirm to Delete',
                              summery: 'Do Yo Want to delete this?',
                            })
                          }
                        >
                          <MdDelete size={20} color="red" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
