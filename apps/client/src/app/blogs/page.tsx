import Header2 from '@client/components/ui/Header2';
import getBlogs from '@client/libs/server/getBlogs';
import getCategories from '@client/libs/server/getCategories';
import getCurrentUser from '@client/libs/server/getCurrentUser';
import { Category, Blog, Role, RoleCode, RoleScop } from '@prisma/client';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import getPublishedBlogs from '@client/libs/server/getPublishedBlogs';
import BlogList from '../../components/Blog/BlogList';
import BlogsManager from './BlogsManager';

async function Page() {
  const user = await getCurrentUser();
  let blogs: (Blog & { category: Category })[] = [];
  let userRoles: Partial<Role>[] = [];
  if (user) {
    userRoles = getUserAccessRoles(user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
    blogs = await getBlogs();
    
  } else {
    blogs = await getPublishedBlogs();
  }
  console.log({userRoles});
  
  if (!userRoles.length) {
    return (
      <section className="w-full ">
        <div className="w-full px-1 md:px-2 lg:px-4 mx-full ">
          <BlogList blogs={blogs} />
        </div>
      </section>
    );
  }
  return (
    <section className="w-full ">
      <div className="w-full px-1 md:px-2 lg:px-4 mx-full ">
        <div className="flex justify-between w-full  border-b border-secondary-500 my-4 pb-2">
          <Header2 title="Blogs" />
        </div>
        <BlogsManager blogs={blogs}  />
      </div>
    </section>
  );
}

export default Page;
