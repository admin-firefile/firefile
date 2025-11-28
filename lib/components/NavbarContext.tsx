export default function NavbarContext() {
  return (
    <div className='flex w-full items-center flex-row justify-between px-2'>
      <div>
        <div className='breadcrumbs text-sm px-4'>
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Documents</a>
            </li>
            <li>Add Document</li>
          </ul>
        </div>
      </div>
      <div>
        <button className='btn'>Add Employee</button>
      </div>
    </div>
  );
}
