import Footer from '@client/components/Footer';
import getCurrentUser from '@client/libs/server/getCurrentUser';
import getForumDetails from '@client/libs/server/getForumDetails';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { Role, RoleCode, RoleScop } from '@prisma/client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

async function Page({ params }: { params: { forumId: string } }) {
  const user = await getCurrentUser();
  let userRoles: Partial<Role>[] = [];
  if (user) {
    userRoles = getUserAccessRoles(user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
      { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
    ]);
  }
  if (!userRoles.length) {
    return redirect('/auth/login');
  }
  const forum = await getForumDetails(params.forumId);
  console.log({forum});
  
  return (
    <>
      <main className="w-full my-8">
        <div className="flex justify-start px-4">
          <Link
            href={`/blogs`}
            className=" py-2 px-4 flex gap-2 items-center text-primary-500"
          >
            <AiOutlineArrowLeft />
            Back
          </Link>
        </div>
        <div className="max-w-6xl mx-auto w-full px-2 md:px-4">
          <Suspense fallback={<div>Loading..</div>}></Suspense>
        </div>
      </main>
    </>
  );
}

export default Page;
