import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Calendar,
  CalendarDays,
  ChevronDown,
  ListTodo,
  Menu,
  Plus,
  Repeat,
  Star,
  UserSquare2,
} from "lucide-react";
import avatar from "../assets/image.png"
const navigationItems = [
  { icon: <ListTodo className="w-6 h-6" />, label: "All Tasks" },
  { icon: <CalendarDays className="w-6 h-6" />, label: "Today", active: true },
  { icon: <Star className="w-6 h-6" />, label: "Important" },
  { icon: <Calendar className="w-6 h-6" />, label: "Planned" },
  { icon: <UserSquare2 className="w-6 h-6" />, label: "Assigned to me" },
];

export default function Home() {
  const [pendingTasks, setPendingTasks] = useState([
    "Buy groceries",
    "Finish project report",
    "Call the bank",
    "Schedule dentist appointment",
    "Plan weekend trip",
  ]);
  const [completedTasks, setCompletedTasks] = useState([
    "Read a book",
    "Clean the house",
    "Prepare presentation",
    "Update blog",
  ]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setPendingTasks([...pendingTasks, newTask.trim()]);
      setNewTask("");
    }
  };

  const handleTaskCompletion = (task) => {
    setPendingTasks(pendingTasks.filter((t) => t !== task));
    setCompletedTasks([...completedTasks, task]);
  };

  const handleTaskRevert = (task) => {
    setCompletedTasks(completedTasks.filter((t) => t !== task));
    setPendingTasks([...pendingTasks, task]);
  };

  return (
    <div className="flex flex-col min-h-[900px] bg-[#fbfdfb]">
      <header className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-6">
          <Menu className="w-6 h-6" />
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 bg-[#3f9142] rounded-lg" />
            <span className="font-bold text-2xl text-[#3f9142]">DoIt</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-[280px] bg-[#eef6ef] p-4 flex flex-col gap-4">
          <div className="text-center">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <p className="font-medium text-[#1a271b]">Hey, ABCD</p>
          </div>

          <nav className="space-y-1">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant={item.active ? "secondary" : "ghost"}
                className={`w-full justify-start gap-4 ${
                  item.active ? "bg-[#34783729] text-[#347937]" : ""
                }`}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </nav>

          <Separator />

          <Button variant="ghost" className="w-full justify-start gap-4">
            <Plus className="w-6 h-6" />
            Add list
          </Button>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Today Tasks</CardTitle>
              <p className="text-3xl font-medium">{pendingTasks.length}</p>
            </CardHeader>
          </Card>
        </aside>

        <main className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#142e159e]">To Do</span>
            <ChevronDown className="w-6 h-6" />
          </div>

          <Card className="mb-6">
            <CardContent className="p-4">
              <Input
                placeholder="Add A Task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="mb-4 outline-none "
              />
              <div className="flex gap-4">
                <Button
                  className="bg-[#34783729] text-[#347937] hover:bg-[#34783740]"
                  onClick={handleAddTask}
                >
                  ADD TASK
                </Button>
              </div>
            </CardContent>
          </Card>

          <ScrollArea className="flex-1">
            {pendingTasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-4 border-t"
              >
                <div className="flex items-center gap-4">
                  <Checkbox onChange={() => handleTaskCompletion(task)} />
                  <span className="text-[#1a271b]">{task}</span>
                </div>
                <Star className="w-6 h-6" />
              </div>
            ))}

            <div className="mt-8 mb-4 font-medium">Completed</div>

            {completedTasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-4 border-t"
              >
                <div className="flex items-center gap-4">
                  <Checkbox checked onChange={() => handleTaskRevert(task)} />
                  <span className="text-[#1a271b] line-through">{task}</span>
                </div>
                <Star className="w-6 h-6" />
              </div>
            ))}
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
