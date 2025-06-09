import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Navbar from "./components/NavBar";

export default function App() {
    const { tasks, fetchTasks } = useTasks();
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-3xl mx-auto">
                <Navbar tasks={tasks} />
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Task Management</h1>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => setShowForm(true)}>
                        + New Task
                    </button>
                </div>
                {showForm && (
                    <TaskForm
                        onClose={() => setShowForm(false)}
                        onSuccess={() => {
                            setShowForm(false);
                            fetchTasks();
                        }}
                    />
                )}
                <TaskList tasks={tasks} onUpdate={fetchTasks} />
            </div>
        </div>
    );
}
