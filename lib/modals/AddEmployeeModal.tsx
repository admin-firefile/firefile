"use client";
import { useState } from "react";
import axios from "axios";
import { useUserStore } from "@/lib/store/user";

export default function AddEmployeeModal() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state) => state.user);

  const createEmployee = async () => {
    if (!user?.token || !name || !job) return;
    setLoading(true);
    try {
      await axios.post(
        "http://127.0.0.1:3001/employees",
        { name, job, notes },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      setName("");
      setJob("");
      setNotes("");
      // Dispatch custom event to notify tables to refetch
      window.dispatchEvent(new CustomEvent("employeeAdded"));
    } catch (error) {
      console.error("Error creating employee:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEmployee();
  };

  return (
    <dialog id="add_employee_modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Add New Employee</h3>
        <form onSubmit={handleSubmit} className="py-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Employee name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Job</span>
            </label>
            <input
              type="text"
              placeholder="Job title"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Notes (optional)</span>
            </label>
            <input
              type="text"
              placeholder="Additional notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input input-bordered"
            />
          </div>
        </form>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Cancel</button>
          </form>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading || !name || !job}
          >
            {loading ? "Adding..." : "Add Employee"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
