type Role = "USER" | "ADMIN";

type Props = {
    value: Role;
    onChange: (role: Role) => void;
};

export default function RolePicker({ value, onChange }: Props) {
    return (
        <div className="space-y-2">
            <label className="text-sm text-zinc-200">Role</label>

            <div className="grid grid-cols-2 gap-2">
                <button
                    type="button"
                    onClick={() => onChange("USER")}
                    className={[
                        "rounded-xl border px-4 py-3 text-sm font-medium transition",
                        "focus:outline-none focus:ring-2 focus:ring-indigo-500/20",
                        value === "USER"
                            ? "border-indigo-500/60 bg-indigo-500/15 text-indigo-100"
                            : "border-white/10 bg-zinc-950/40 text-zinc-200 hover:bg-white/5",
                    ].join(" ")}
                >
                    USER
                </button>

                <button
                    type="button"
                    onClick={() => onChange("ADMIN")}
                    className={[
                        "rounded-xl border px-4 py-3 text-sm font-medium transition",
                        "focus:outline-none focus:ring-2 focus:ring-indigo-500/20",
                        value === "ADMIN"
                            ? "border-indigo-500/60 bg-indigo-500/15 text-indigo-100"
                            : "border-white/10 bg-zinc-950/40 text-zinc-200 hover:bg-white/5",
                    ].join(" ")}
                >
                    ADMIN
                </button>
            </div>

            <p className="text-xs text-zinc-500">For demo purposes only.</p>
        </div>
    );
}
