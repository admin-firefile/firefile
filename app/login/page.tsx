"use client";
import { useState } from "react";
import axios from "axios";
import { useUserStore } from "@/lib/store/user";
import { useRouter } from "next/navigation";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  async function login() {
    axios
      .post("http://127.0.0.1:3001/login", { email, password })
      .then((res) => {
        if (res.status === 200) {
          const { user, token } = res.data;
          setUser({ id: user.id, token });
          document.cookie = `authToken=${token}; path=/; max-age=86400`;
          router.replace("/");
          router.refresh();
        }
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">Login</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              placeholder="Email"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>

          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered"
              placeholder="Password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>

          <div className="form-control mt-4">
            <button
              className="btn btn-primary w-full text-red-500"
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
