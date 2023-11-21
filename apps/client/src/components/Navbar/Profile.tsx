"use client";
import handleLogout from "@client/libs/client/handleLogout";
import { selectCurrentUser, selectToken } from "@client/libs/features/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const [show, setShow] = useState(false);
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);

  const dispatch = useDispatch();
  const router = useRouter();
  
  return (
    <div className="relative">
      <div>
        <button
          onClick={() => setShow((prev) => !prev)}
          className="flex btn-icon"
        >
          <BsPerson size={20} />
        </button>
      </div>
      {show && (
        <div
          onClick={() => setShow(false)}
          className={`fixed inset-0 bg-transparent `}
        ></div>
      )}
      <div
        className={`absolute w-72 right-0 gap-2 bg-secondary-100 dark:bg-secondary-900 drop-shadow p-4	${
          show ? "flex flex-col " : "hidden"
        }`}
      >
        {token && user ? (
          <Link href={"/profile"} className="">
            <figure className="p-2 flex gap-2 items-center">
              {}
              {/* <Image
                src=""
                width={100}
                height={100}
                alt="user avatar"
                className="rounded-full overflow-hidden bg-secondary-500 w-10 h-10"
              /> */}
              <div>
                <div>{user.username}</div>
                <small>{user.email}</small>
              </div>
            </figure>
          </Link>
        ) : (
          ""
        )}

        <ul className="flex flex-col gap-1">
          {token && user ? (
            <>
              <li className="py-1 px-4 hover:bg-secondary-200 dark:hover:bg-secondary-700">
                <Link href={"/shop"}>Profiles</Link>
              </li>
              
              <li className="flex py-1 px-1">
                <button
                  onClick={() =>
                    handleLogout(dispatch, () => router.push("auth/login"))
                  }
                  className="w-full btn-primary  py-1"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="flex py-1 px-1">
                <Link href={"/auth/login"} className="w-full btn-primary py-1">
                  Login
                </Link>
              </li>
              <li className="flex py-1 px-1">
                <Link
                  href={"/auth/register"}
                  className="w-full btn-primary py-1"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
