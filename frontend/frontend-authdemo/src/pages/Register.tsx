import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"USER" | "ADMIN">("USER");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        try {
            setLoading(true);
            setError("");
            setSuccess("");

            if (!username.trim() || !password.trim()) {
                setError("Please fill in username and password.");
                return;
            }

            await api.post("/auth/register", { username, password, role });

            setSuccess("Account created successfully. You can sign in now!");

            setTimeout(() => navigate("/"), 600);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                const msg =
                    e?.response?.data ||
                    "Could not create account. Try another username.";
                setError(String(msg));
            } else {
                setError("Could not create account. Try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout
            left={
                <>
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-400/80" />
                        Create account
                    </div>

                    <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight">
                        Start with a secure identity.
                    </h1>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-300">
                        Create your account to test protected routes and
                        role-based access in the demo.
                    </p>

                    <div className="mt-8 grid max-w-md gap-3">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-sm font-medium">Tip</p>
                            <p className="mt-1 text-xs text-zinc-300">
                                Use a simple username and password for local
                                testing.
                            </p>
                        </div>
                    </div>

                    <p className="mt-10 text-xs text-zinc-500">
                        © 2026 Auth Demo
                    </p>
                </>
            }
        >
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur sm:p-8">
                <div className="mb-6 lg:hidden">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-400/80" />
                        Create account
                    </div>
                </div>

                <h2 className="text-2xl font-semibold tracking-tight">
                    Create your account
                </h2>
                <p className="mt-1 text-sm text-zinc-300">
                    It takes less than a minute
                </p>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleRegister();
                    }}
                    className="mt-6 space-y-4"
                >
                    <div className="space-y-2">
                        <label className="text-sm text-zinc-200">
                            Username
                        </label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-zinc-950/40 px-4 py-3 text-sm outline-none placeholder:text-zinc-500 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"
                            placeholder="Choose a username"
                            autoComplete="username"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-zinc-200">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-zinc-950/40 px-4 py-3 pr-12 text-sm outline-none placeholder:text-zinc-500 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"
                                placeholder="Create a password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 hover:bg-white/10"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-zinc-200">Role</label>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setRole("USER")}
                                className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                                    role === "USER"
                                        ? "border-indigo-400/60 bg-indigo-500/20 text-indigo-100"
                                        : "border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
                                }`}
                            >
                                USER
                            </button>

                            <button
                                type="button"
                                onClick={() => setRole("ADMIN")}
                                className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                                    role === "ADMIN"
                                        ? "border-indigo-400/60 bg-indigo-500/20 text-indigo-100"
                                        : "border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
                                }`}
                            >
                                ADMIN
                            </button>
                        </div>

                        <p className="text-xs text-zinc-500">
                            For demo purposes only.
                        </p>
                    </div>

                    {error && <p className="text-sm text-rose-300">{error}</p>}
                    {success && (
                        <p className="text-sm text-emerald-300">{success}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full rounded-xl bg-indigo-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-400 active:scale-[0.99]"
                    >
                        {loading ? "Creating..." : "Create account"}
                    </button>

                    <p className="text-center text-xs text-zinc-400">
                        Already have an account?{" "}
                        <a
                            className="text-indigo-300 hover:text-indigo-200 underline underline-offset-4"
                            href="/"
                        >
                            Sign in
                        </a>
                    </p>
                </form>

                <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="text-center text-xs text-zinc-500">
                        By creating an account, you agree to our Terms & Privacy
                        Policy.
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}
