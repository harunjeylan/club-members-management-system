import Footer from '@client/components/Footer';
import Header from '@client/components/ui/Header';
import Header2 from '@client/components/ui/Header2';
import getBlogs from '@client/libs/server/getBlogs';
import getCurrentUser from '@client/libs/server/getCurrentUser';
import getPublishedBlogs from '@client/libs/server/getPublishedBlogs';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import {
  Role,
  RoleCode,
  RoleScop
} from '@prisma/client';
import { BlogWithAll } from 'types/blog';
import BlogList from '../../components/Blog/BlogList';
import BlogsManager from './BlogsManager';

async function Page() {
  const user = await getCurrentUser();
  let blogs: BlogWithAll[];
  let userRoles: Partial<Role>[] = [];
  if (user) {
    userRoles = getUserAccessRoles(user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
      { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
    ]);
    blogs = await getBlogs();
  } else {
    blogs = await getPublishedBlogs();
  }

  if (!userRoles.length) {
    return (
      <>
        <section className="w-full ">
          <div className="w-full px-4 mx-full py-8 my-8">
            <div className="my-4">
              <Header title="Blogs" />
            </div>
            <BlogList blogs={blogs} />
          </div>
        </section>
        <Footer />
      </>
    );
  }
  return (
    <section className="w-full ">
      <div className="w-full px-4 mx-full ">
        <div className="flex justify-between w-full  border-b border-secondary-500 my-4 pb-2">
          <Header2 title="Blogs" />
        </div>
        <BlogsManager blogs={blogs} />
      </div>
    </section>
  );
}

export default Page;
