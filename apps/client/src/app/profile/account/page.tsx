import UserProfileForm from "@client/components/Forms/UpdateCurrentUserForm";
import getCurrentUser from "@client/libs/server/getCurrentUser";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

async function Page() {
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/auth/login');
  }
  return (
    <section className="w-full ">
      <div className="flex justify-start">
        <Link
          href={'/users'}
          className=" py-2 px-4 flex gap-2 items-center text-primary-500"
        >
          <AiOutlineArrowLeft />
          Back
        </Link>
      </div>
      <div className="w-full px-4 mx-auto mt-4">
        <div className="max-w-4xl mx-auto flex flex-col w-full gap-4 p-8 bg-secondary-100 dark:bg-secondary-900 rounded">
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">User Creation Form</div>
            <UserProfileForm user={user} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page