import { GoSidebarCollapse } from "react-icons/go";
import NavbarContext from "./NavbarContext";

export default function Navbar() {
  return (
    <nav className='navbar w-full bg-base-300'>
      <label
        htmlFor='my-drawer-4'
        aria-label='open sidebar'
        className='btn btn-square btn-ghost'
      >
        {/* Sidebar toggle icon */}
        <GoSidebarCollapse />
      </label>
      <NavbarContext />
    </nav>
  );
}
