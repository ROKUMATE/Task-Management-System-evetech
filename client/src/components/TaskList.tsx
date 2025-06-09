import type { Task } from "../types";
import api from "../services/api";
import TaskForm from "./TaskForm";
import { useState } from "react";

interface Props {
    tasks: Task[];
    onUpdate: () => void;
}

export default function TaskList({ tasks, onUpdate }: Props) {
    const [editing, setEditing] = useState<string | null>(null);

    const toggleStatus = async (task: Task) => {
        const newStatus = task.status === "completed" ? "pending" : "completed";
        await api.put(`/tasks/${task._id}`, { status: newStatus });
        onUpdate();
    };

    const deleteTask = async (id: string) => {
        await api.delete(`/tasks/${id}`);
        onUpdate();
    };

    return (
        <div className="space-y-2">
            {tasks.map((task) => (
                <div
                    key={task._id}
                    className={`p-4 bg-white rounded shadow flex justify-between items-center space-x-4 ${
                        task.status === "completed"
                            ? "line-through opacity-50"
                            : ""
                    }`}>
                    <div className="flex-1">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={task.status === "completed"}
                                onChange={() => toggleStatus(task)}
                            />
                            <span className="font-semibold">{task.title}</span>
                        </div>
                        <p>{task.description}</p>
                        <p className="text-sm text-gray-500">
                            Priority: {task.priority}
                        </p>
                        <p className="text-sm text-gray-500">
                            Due: {task.dueDate?.slice(0, 10)}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setEditing(task._id)}
                            className="p-2">
                            ✏️
                        </button>
                        <button
                            onClick={() => deleteTask(task._id)}
                            className="p-2 text-red-600">
                            🗑️
                        </button>
                    </div>
                    {editing === task._id && (
                        <TaskForm
                            existing={task}
                            onClose={() => setEditing(null)}
                            onSuccess={() => {
                                setEditing(null);
                                onUpdate();
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
