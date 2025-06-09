import type { Task } from "../types";

interface Props {
    tasks: Task[];
}

export default function Navbar({ tasks }: Props) {
    const pending = tasks.filter((t) => t.status !== "completed").length;
    const completed = tasks.filter((t) => t.status === "completed").length;

    return (
        <nav className="bg-white shadow mb-4 rounded">
            <div className="max-w-3xl mx-auto p-4 flex justify-between">
                <span className="font-semibold">Pending: {pending}</span>
                <span className="font-semibold">Completed: {completed}</span>
            </div>
        </nav>
    );
}
