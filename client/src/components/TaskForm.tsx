import { useState } from "react";
import api from "../services/api";
import type { Task } from "../types";

interface Props {
    onClose: () => void;
    onSuccess: () => void;
    existing?: Task;
}

export default function TaskForm({ onClose, onSuccess, existing }: Props) {
    const [form, setForm] = useState({
        title: existing?.title || "",
        description: existing?.description || "",
        status: existing?.status || "pending",
        priority: existing?.priority || "low",
        dueDate: existing?.dueDate?.slice(0, 10) || "",
    });

    const submit = async () => {
        if (existing) {
            await api.put(`/tasks/${existing._id}`, form);
        } else {
            await api.post("/tasks", form);
        }
        onSuccess();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow w-full max-w-md">
                <h2 className="text-xl mb-4">
                    {existing ? "Edit Task" : "Create Task"}
                </h2>
                <div className="space-y-3">
                    {[
                        "title",
                        "description",
                        "status",
                        "priority",
                        "dueDate",
                    ].map((field) => (
                        <div key={field} className="flex flex-col">
                            <label className="capitalize font-semibold mb-1">
                                {field}
                            </label>
                            {field === "status" || field === "priority" ? (
                                <select
                                    value={(form as any)[field]}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [field]: e.target.value,
                                        })
                                    }
                                    className="border p-2 rounded">
                                    {(field === "status"
                                        ? [
                                              "pending",
                                              "in-progress",
                                              "completed",
                                          ]
                                        : ["low", "medium", "high"]
                                    ).map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            ) : field === "dueDate" ? (
                                <input
                                    type="date"
                                    value={form.dueDate}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            dueDate: e.target.value,
                                        })
                                    }
                                    className="border p-2 rounded"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={(form as any)[field]}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [field]: e.target.value,
                                        })
                                    }
                                    className="border p-2 rounded"
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2">
                        Cancel
                    </button>
                    <button
                        onClick={submit}
                        className="bg-green-500 text-white px-4 py-2 rounded">
                        {existing ? "Update" : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
}
