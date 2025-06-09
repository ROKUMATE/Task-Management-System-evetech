import { useState, useEffect } from "react";
import api from "../services/api";
import type { Task } from "../types";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const fetchTasks = async (filters = {}) => {
        const { data } = await api.get("/tasks", { params: filters });
        setTasks(data.data);
    };
    useEffect(() => {
        fetchTasks();
    }, []);
    return { tasks, fetchTasks };
}
