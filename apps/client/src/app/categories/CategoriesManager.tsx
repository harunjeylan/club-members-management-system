'use client';

import CreateCategoryForm from '@client/components/Forms/CreateCategoryForm';
import Model from '@client/components/ui/Model';
import { TransitionContext } from '@client/context/TransitionContext';
import handleDeleteCategory from '@client/libs/client/category/handleDeleteCategory';
import { Category } from '@prisma/client';
import { Suspense, useContext, useState } from 'react';
import { MdDelete } from 'react-icons/md';
type PropsType = {
  categories: {
    id: string;
    name: string;
    categoryId: string | null;
    categories: Category[];
  }[];
};
function CategoriesManager({ categories }: PropsType) {
  const { handleServerMutation } = useContext(TransitionContext);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<Category[]>([]);
  async function deleteRoles(categoryId: string) {
    handleServerMutation(async () => {
      const response = await handleDeleteCategory(categoryId);
      if (response.category) {
        // setMessage({
        //   type: 'success',
        //   summery: 'Users are added to Space successfully',
        //   title: 'Success ',
        // });
      }


      if (response?.error) {
        // setMessage({
        //   type: 'error',
        //   summery: response?.error,
        //   title: 'Error ',
        // });
      }
    });
  }
  return (
    <div>
      <Model
        show={show}
        setShow={setShow}
        className=" p-4 bg-secondary-100 dark:bg-secondary-900 rounded"
      >
        <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
          <div className="text-xl font-bold">Create Role Form</div>
          <CreateCategoryForm
            categories={categories as unknown as Category[]}
          />
        </div>
      </Model>

      <div className="flex justify-between w-full ">
        <div></div>

        <button
          onClick={() => setShow(true)}
          className="btn-primary py-2 px-4 whitespace-nowrap h-fit"
        >
          Add Category
        </button>
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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-400 dark:divide-slate-800 border-t border-slate-400 dark:border-slate-800">
                {categories?.map((category, index) => (
                  <>
                    <tr
                      key={`${category.id}--${index}`}
                      className=" hover:bg-secondary-400 dark:hover:bg-secondary-800"
                    >
                      <td className="px-4 py-2">{category.name}</td>
                      <td className="px-4 py-2 ">
                        <button
                          className="btn-icon"
                          onClick={() => deleteRoles(category.id)}
                        >
                          <MdDelete size={20} color="red" />
                        </button>
                      </td>
                    </tr>
                    {category.categories.map((subcategory) => (
                      <tr
                        key={subcategory.id}
                        className=" hover:bg-secondary-400 dark:hover:bg-secondary-800"
                      >
                        <td className="px-4 py-2 ">
                          <div className="border-l ml-4 px-4 py-2 ">
                            {subcategory.name}
                          </div>
                        </td>
                        <td className="px-4 py-2 ">
                          <button
                            className="btn-icon"
                            onClick={() => deleteRoles(category.id)}
                          >
                            <MdDelete size={20} color="red" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default CategoriesManager;
