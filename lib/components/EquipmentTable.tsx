"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserStore } from "@/lib/store/user";

interface Equipment {
  id: string;
  name: string;
  type: string;
  notes?: string;
  user_id: number;
}

export default function EquipmentTable() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useUserStore((state) => state.user);

  const fetchEquipment = async () => {
    if (!user?.token) return;
    try {
      const response = await axios.get("http://127.0.0.1:3001/equipment", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setEquipment(response.data);
    } catch (error) {
      console.error("Error fetching equipment:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, [user?.token]);

  useEffect(() => {
    const handleEquipmentAdded = () => {
      fetchEquipment();
    };

    window.addEventListener("equipmentAdded", handleEquipmentAdded);

    return () => {
      window.removeEventListener("equipmentAdded", handleEquipmentAdded);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Equipment</h2>

      {/* Equipment Table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.notes || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
