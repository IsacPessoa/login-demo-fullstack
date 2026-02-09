import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Success() {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    async function loadMe() {
        try {
            setLoading(true);
            setError("");

            const res = await api.get("/me");

            setUsername(String(res.data));
        } catch {
            setError("Session expired or invalid token");
        } finally {
            setLoading(false);
        }
    }

    function handleSingOut() {
        localStorage.removeItem("token");
        navigate("/");
    }

    useEffect(() => {
        loadMe();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
                <div className="absolute bottom-[-140px] right-[-140px] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.10),transparent_60%)]" />
            </div>

            <div className="relative mx-auto flex min-h-screen w-full items-center justify-center px-6 py-10">
                <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-emerald-500/10">
                            <span className="text-2xl">✅</span>
                        </div>

                        <div className="flex-1">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login successful
                            </h1>

                            {loading ? (
                                <p className="mt-1 text-sm text-zinc-300">
                                    loading your profile...
                                </p>
                            ) : error ? (
                                <p className="mt-1 text-sm text-rose-300">
                                    {error}
                                </p>
                            ) : (
                                <p className="mt-1 text-sm text-zinc-300">
                                    Welcome back,{" "}
                                    <span className="font-medium text-zinc-100">
                                        {username ?? "User"}
                                    </span>
                                    .
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="w-full rounded-xl bg-indigo-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-400 active:scale-[0.99]"
                        >
                            Back to login
                        </button>

                        <button
                            type="button"
                            onClick={handleSingOut}
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-zinc-200 transition hover:bg-white/10 active:scale-[0.99]"
                        >
                            Sign out
                        </button>
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-4">
                        <p className="text-xs text-zinc-500">
                            Tip: “Sign out” clears the local data so another
                            user can log in.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
