"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserStore } from "@/lib/store/user";

interface Employee {
  id: string;
  name: string;
  job: string;
  notes?: string;
  user_id: number;
}

export default function EmployeesTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useUserStore((state) => state.user);

  const fetchEmployees = async () => {
    if (!user?.token) return;
    try {
      const response = await axios.get("http://127.0.0.1:3001/employees", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [user?.token]);

  useEffect(() => {
    const handleEmployeeAdded = () => {
      fetchEmployees();
    };

    window.addEventListener("employeeAdded", handleEmployeeAdded);

    return () => {
      window.removeEventListener("employeeAdded", handleEmployeeAdded);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr
              key={employee.id}
              className={index % 2 === 0 ? "bg-base-200" : ""}
            >
              <th>{index + 1}</th>
              <td>{employee.name}</td>
              <td>{employee.job}</td>
              <td>{employee.notes || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
