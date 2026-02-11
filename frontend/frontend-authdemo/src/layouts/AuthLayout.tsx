import type { ReactNode } from "react";

type Props = {
    left?: ReactNode;
    children: ReactNode;
};

export default function AuthLayout({ left, children }: Props) {
    return (
        <div className="relative mx-auto flex min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
                <div className="absolute bottom-[-140px] right-[-140px] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.10),transparent_60%)]" />
            </div>

            <div className="relative mx-auto flex min-h-screen w-full items-center justify-center px-6 py-10">
                <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
                    <div className="hidden lg:flex lg:flex-col lg:justify-center">
                        {left}
                    </div>

                    <div className="flex items-center justify-center">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
