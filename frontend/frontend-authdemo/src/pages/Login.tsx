import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { AxiosError } from "axios";

export default function Login() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    async function handleLogin() {
        try {
            setLoading(true);
            setError("");

            if (!username.trim() || !password.trim()) {
                setError("Please fill in username and password.");
                return;
            }

            const res = await api.post("/auth/login", { username, password });

            const { token, username: loggedUser, role } = res.data;

            if (!token) {
                setError("Login failed: missing token.");
                return;
            }

            const finalUsername = loggedUser ?? username;

            localStorage.setItem("token", token);
            localStorage.setItem("username", finalUsername);

            if (role) {
                localStorage.setItem("role", role);
            }

            if (role === "ADMIN") {
                navigate("/admin/success");
            } else {
                navigate("/success");
            }
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 401) {
                    setError("Invalid credentials.");
                } else {
                    setError("Could not sign in. Try again.");
                }
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
                        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                        Auth Demo
                    </div>

                    <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight">
                        Manage your app securely with JWT.
                    </h1>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-300">
                        A clean fullstack demo with protected routes, role-based
                        access, and token validation — built to look
                        professional on desktop and still feel great on mobile.
                    </p>

                    <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-sm font-medium">JWT Auth</p>
                            <p className="mt-1 text-xs text-zinc-300">
                                Bearer token on requests
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-sm font-medium">Roles</p>
                            <p className="mt-1 text-xs text-zinc-300">
                                USER / ADMIN access
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
                        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                        Auth Demo
                    </div>
                </div>

                <h2 className="text-2xl font-semibold tracking-tight">
                    Welcome back
                </h2>
                <p className="mt-1 text-sm text-zinc-300">
                    Sign in to continue
                </p>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                    className="mt-6 space-y-4"
                >
                    <div className="space-y-2">
                        <label className="text-sm text-zinc-200">
                            Username
                        </label>
                        <input
                            className="w-full rounded-xl border border-white/10 bg-zinc-950/40 px-4 py-3 text-sm outline-none placeholder:text-zinc-500 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"
                            placeholder="Enter your username"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-zinc-200">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="w-full rounded-xl border border-white/10 bg-zinc-950/40 px-4 py-3 pr-12 text-sm outline-none placeholder:text-zinc-500 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"
                                placeholder="Enter your password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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

                    {error && <p className="text-sm text-red-300">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full rounded-xl bg-indigo-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-400 active:scale-[0.99]"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>

                    <p className="text-center text-xs text-zinc-400">
                        Don&apos;t have an account?{" "}
                        <a
                            className="text-indigo-300 hover:text-indigo-200 underline underline-offset-4"
                            href="/register"
                        >
                            Create one
                        </a>
                    </p>
                </form>

                <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="text-center text-xs text-zinc-500">
                        By continuing, you agree to our Terms & Privacy Policy.
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}
