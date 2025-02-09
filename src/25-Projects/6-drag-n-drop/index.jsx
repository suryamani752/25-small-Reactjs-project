import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { MdDelete } from "react-icons/md";

const DragAndDrop = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dragTask, setDragTask] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (
      tasks.length > 0 &&
      tasks.every((task) => task.status === "completed")
    ) {
      fireConfetti();
    }
  }, [tasks]);

  const fireConfetti = () => {
    const count = 200;
    const defaults = { origin: { y: 0.7 }, zIndex: 1000 };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          content: newTask,
          status: "tasks",
        },
      ]);
      setNewTask("");
    }
  };

  const handleDragStart = (e, task) => {
    setDragTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, status) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (dragTask && dragTask.status !== newStatus) {
      setTasks(
        tasks.map((task) =>
          task.id === dragTask.id ? { ...task, status: newStatus } : task
        )
      );
    }
    setDragTask(null);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.content);
  };

  const saveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingId ? { ...task, content: editText } : task
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            className="flex-1 p-2 border rounded"
            placeholder="Enter new task"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>

        {tasks.length > 0 && tasks.every((t) => t.status === "completed") && (
          <div className="text-center mb-8 animate-bounce">
            <p className="text-2xl font-bold text-green-600">
              🎉 All tasks completed! Great job! 🎉
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["tasks", "progress", "completed"].map((status) => (
            <div
              key={status}
              className="bg-white p-4 rounded shadow relative min-h-[300px]"
              onDragOver={(e) => handleDragOver(e, status)}
              onDrop={(e) => handleDrop(e, status)}
            >
              <h2 className="text-xl font-bold mb-4 capitalize">{status}</h2>

              {tasks.length === 0 && status === "tasks" && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  You haven't added any tasks yet.
                </div>
              )}

              <div className="min-h-[200px]">
                {getTasksByStatus(status).map((task) => (
                  <div
                    key={task.id}
                    draggable={editingId !== task.id}
                    onDragStart={(e) => handleDragStart(e, task)}
                    className="bg-gray-50 p-3 mb-2 rounded shadow-sm relative
                      cursor-move hover:bg-gray-100 transition-colors"
                  >
                    {editingId === task.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                        autoFocus
                        className="w-full bg-transparent outline-none"
                      />
                    ) : (
                      <span
                        onClick={() =>
                          status !== "completed" && startEditing(task)
                        }
                      >
                        {task.content}
                      </span>
                    )}

                    {status === "completed" && (
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="absolute right-2 top-2 text-2xl text-red-500 hover:text-red-700 cursor-pointer bg-gray-300 rounded-full p-1"
                      >
                        <MdDelete />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
