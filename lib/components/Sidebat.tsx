"use client";
import {
  FaUsers,
  FaFire,
  FaWrench,
  FaFileAlt,
  FaUserCog,
} from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import Link from "next/link";
import { useUserStore } from "@/lib/store/user";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "authToken=; path=/; max-age=0";
    clearUser();
    router.replace("/login");
    router.refresh();
  };

  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        {/* Sidebar content here */}
        <ul className="menu w-full grow">
          {/* List item */}
          <li>
            <Link
              href={"/employees"}
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right "
              data-tip="Employees"
            >
              {/* Home icon */}
              <FaUsers className="w-4 h-4 my-1.5" />
              <span className="is-drawer-close:hidden">Employees</span>
            </Link>
          </li>

          {/* List item */}
          <li>
            <Link
              href={"/crews"}
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right "
              data-tip="Crews"
            >
              <FaFire className="w-4 h-4 my-1.5" />
              <span className="is-drawer-close:hidden">Crews</span>
            </Link>
          </li>

          <li>
            <Link
              href={"/equipment"}
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Equipment"
            >
              <FaWrench className="w-4 h-4 my-1.5" />
              <span className="is-drawer-close:hidden">Equipment</span>
            </Link>
          </li>

          <li>
            <Link
              href={"/manifest"}
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Manifest"
            >
              <FaFileAlt className="w-4 h-4 my-1.5" />
              <span className="is-drawer-close:hidden">Manifest</span>
            </Link>
          </li>

          <li className="mt-auto">
            <Link
              href={"/account"}
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Account"
            >
              <FaUserCog className="w-4 h-4 my-1.5" />
              <span className="is-drawer-close:hidden">Account</span>
            </Link>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Logout"
            >
              <MdAccountCircle className="w-4 h-4 my-1.5" />
              <span className="is-drawer-close:hidden">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
