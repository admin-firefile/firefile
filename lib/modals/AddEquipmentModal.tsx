"use client";
import { useState } from "react";
import axios from "axios";
import { useUserStore } from "@/lib/store/user";

export default function AddEquipmentModal() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state) => state.user);

  const createEquipment = async () => {
    if (!user?.token || !name || !type) return;
    setLoading(true);
    try {
      await axios.post(
        "http://127.0.0.1:3001/equipment",
        { name, type, notes },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      setName("");
      setType("");
      setNotes("");
      // Dispatch custom event to notify tables to refetch
      window.dispatchEvent(new CustomEvent("equipmentAdded"));
    } catch (error) {
      console.error("Error creating equipment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEquipment();
  };

  return (
    <dialog id="add_equipment_modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Add New Equipment</h3>
        <form onSubmit={handleSubmit} className="py-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Equipment name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Type</span>
            </label>
            <input
              type="text"
              placeholder="Equipment type"
              value={type}
              onChange={(e) => setType(e.target.value)}
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
            disabled={loading || !name || !type}
          >
            {loading ? "Adding..." : "Add Equipment"}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
