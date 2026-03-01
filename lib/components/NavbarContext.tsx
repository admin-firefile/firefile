"use client";
import { usePathname } from "next/navigation";

export default function NavbarContext() {
  const pathname = usePathname();

  const getAddButtonText = () => {
    if (pathname === "/employees") return "Add Employee";
    if (pathname === "/equipment") return "Add Equipment";
    return null;
  };

  const handleAddClick = () => {
    if (pathname === "/employees") {
      (
        document.getElementById("add_employee_modal") as HTMLDialogElement
      )?.showModal();
    } else if (pathname === "/equipment") {
      (
        document.getElementById("add_equipment_modal") as HTMLDialogElement
      )?.showModal();
    }
  };

  const addButtonText = getAddButtonText();

  return (
    <div className="flex w-full items-center flex-row justify-between px-2">
      <div>
        <div className="breadcrumbs text-sm px-4">
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
        {addButtonText && (
          <button className="btn" onClick={handleAddClick}>
            {addButtonText}
          </button>
        )}
      </div>
    </div>
  );
}
