import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import axios from "axios";

export default function AdminSuccess() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");

    const loadAdmin = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const res = await api.get("/admin");

            setMessage(String(res.data));
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                const status = e.response?.status;

                if (status === 401) {
                    localStorage.removeItem("token");
                    navigate("/");
                    return;
                }

                if (status === 403) {
                    navigate("/success");
                    return;
                }
            }

            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    function handleSignOut() {
        localStorage.removeItem("token");
        navigate("/");
    }

    useEffect(() => {
        loadAdmin();
    }, [loadAdmin]);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur sm:p-8">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 border border-indigo-400/20">
                        <span className="text-indigo-300">★</span>
                    </div>

                    <div className="flex-1">
                        <h1 className="text-xl font-semibold tracking-tight">
                            Admin dashboard
                        </h1>

                        {loading ? (
                            <p className="mt-1 text-sm text-zinc-300">
                                Checking admin access...
                            </p>
                        ) : error ? (
                            <p className="mt-1 text-sm text-rose-300">
                                {error}
                            </p>
                        ) : (
                            <p className="mt-1 text-sm text-zinc-300">
                                Access granted:{" "}
                                <span className="font-medium text-zinc-100">
                                    {message || "Admin only"}
                                </span>
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                        type="button"
                        onClick={() => navigate("/success")}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-zinc-200 hover:bg-white/10"
                    >
                        Go to user success
                    </button>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="rounded-xl bg-indigo-500 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-400 active:scale-[0.99]"
                    >
                        Sign out
                    </button>
                </div>

                <p className="mt-4 text-xs text-zinc-500">
                    Only ADMIN users can stay on this page.
                </p>
            </div>
        </div>
    );
}
