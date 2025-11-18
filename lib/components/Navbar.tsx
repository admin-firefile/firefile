import { GoSidebarCollapse } from "react-icons/go";

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
      <div className='px-4'>FireFile</div>
    </nav>
  );
}
