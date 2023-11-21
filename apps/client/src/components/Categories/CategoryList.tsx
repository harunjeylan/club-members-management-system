import getCategories from '@client/libs/server/getCategories';
import Link from 'next/link';

async function CategoryList() {
  const categories = await getCategories();
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {categories.map((category, ind) => (
        <div
          key={ind}
          className=" w-full flex flex-col gap-2 bottom-0  p-3 rounded-b-3xl"
        >
          <Link
            href={`/category/${category.name}`}
            className="font-bold text-md"
          >
            {category.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
