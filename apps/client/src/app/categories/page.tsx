import Header2 from '@client/components/ui/Header2';
import getCategories from '@client/libs/server/getCategories';
import CategoriesManager from './CategoriesManager';

async function Page() {
  const categories = await getCategories();
  return (
    <section className="w-full ">
      <div className="w-full px-1 md:px-2 lg:px-4 mx-full ">
        <div className="flex justify-between w-full border-b border-secondary-500  my-4 pb-2">
          <Header2 title="Categories" />
        </div>
        <CategoriesManager categories={categories} />
      </div>
    </section>
  );
}

export default Page;
