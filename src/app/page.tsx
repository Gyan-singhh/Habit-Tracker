"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
  FaTint,
  FaMoon,
  FaMobileAlt,
  FaChartLine,
  FaPlus,
  FaMinus,
  FaFire,
} from "react-icons/fa";

type Habit = {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  color: string;
  icon: React.ReactNode;
  weeklyData: { day: string; value: number }[];
};

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [todayProgress, setTodayProgress] = useState<Record<string, number>>(
    {}
  );

  const userData = {
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  useEffect(() => {
    const mockHabits: Habit[] = [
      {
        id: "water",
        name: "Water Intake",
        target: 5,
        current: 2.5,
        unit: "liters",
        color: "bg-emerald-100",
        icon: <FaTint className="text-emerald-500" />,
        weeklyData: [
          { day: "Mon", value: 3 },
          { day: "Tue", value: 4 },
          { day: "Wed", value: 2.5 },
          { day: "Thu", value: 3.5 },
          { day: "Fri", value: 4.5 },
          { day: "Sat", value: 3 },
          { day: "Sun", value: 4 },
        ],
      },
      {
        id: "sleep",
        name: "Sleep",
        target: 8,
        current: 6.5,
        unit: "hours",
        color: "bg-green-100",
        icon: <FaMoon className="text-green-500" />,
        weeklyData: [
          { day: "Mon", value: 7.5 },
          { day: "Tue", value: 6.8 },
          { day: "Wed", value: 7.2 },
          { day: "Thu", value: 6.5 },
          { day: "Fri", value: 8 },
          { day: "Sat", value: 7 },
          { day: "Sun", value: 8.5 },
        ],
      },
      {
        id: "screen",
        name: "Screen Time",
        target: 4,
        current: 2.5,
        unit: "hours",
        color: "bg-teal-100",
        icon: <FaMobileAlt className="text-teal-500" />,
        weeklyData: [
          { day: "Mon", value: 3.5 },
          { day: "Tue", value: 4.2 },
          { day: "Wed", value: 5 },
          { day: "Thu", value: 6 },
          { day: "Fri", value: 3.5 },
          { day: "Sat", value: 6 },
          { day: "Sun", value: 2 },
        ],
      },
    ];

    setHabits(mockHabits);
    setCurrentStreak(6);
    setTodayProgress({
      water: 2.5,
      sleep: 6.5,
      screen: 2.5,
    });
  }, []);

  const updateProgress = (habitId: string, value: number) => {
    const newValue = Math.max(
      0,
      Math.min(value, habits.find((h) => h.id === habitId)?.target || value)
    );
    setTodayProgress((prev) => ({
      ...prev,
      [habitId]: newValue,
    }));
  };

  const calculateCompletion = () => {
    const total = habits.reduce((sum, habit) => sum + habit.target, 0);
    const completed = habits.reduce(
      (sum, habit) => sum + (todayProgress[habit.id] || 0),
      0
    );
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <motion.h1
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-bold text-green-600 flex items-center"
          >
            <FaChartLine className="mr-2 text-green-500 text-3xl" />
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Habit-Tracker
            </span>
          </motion.h1>
          <div className="h-9 w-9 rounded-full border-2 border-transparent hover:border-indigo-300">
            <img
              src={userData.avatar}
              alt="User avatar"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-lg p-8 mb-10 border border-gray-200"
        >
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-3xl mb-2 font-semibold text-green-800">
                  Hello, {userData.name}!
                </h2>
                <p className="text-gray-500">
                  Keep up the good work on your habits
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <div className="grid grid-cols-2 gap-4">
               
                <motion.div
                  whileHover={{ y: -2 }}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition-all"
                >
                  <h3 className="text-sm font-semibold text-gray-700 mb-1 tracking-wider">
                    Today's Progress
                  </h3>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {calculateCompletion()}%
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${calculateCompletion()}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-gradient-to-r from-emerald-400 to-green-600 h-2 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition-all relative overflow-hidden"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 2,
                    }}
                    className="absolute inset-0 bg-orange-100 rounded-xl"
                  />

                  <h3 className="text-sm font-semibold text-gray-700 mb-1 tracking-wider">
                    Current Streak
                  </h3>
                  <div className="flex items-center mt-3">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <FaFire className="text-orange-500 text-2xl mr-2" />
                    </motion.div>
                    <span className="text-3xl font-bold text-orange-500">
                      {currentStreak}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {habits.map((habit, index) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -2, scale: 1.01 }}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-100"
            >
              <div
                className={`p-4 ${habit.color} rounded-t-xl flex justify-between items-center`}
              >
                <div>
                  <h3 className="text-lg font-bold text-green-800 flex items-center">
                    <span className="mr-2 text-xl">{habit.icon}</span>
                    {habit.name}
                  </h3>
                  <p className="text-sm text-green-700">
                    Target: {habit.target} {habit.unit}
                  </p>
                </div>
                <div className="text-center bg-white text-green-600 font-bold px-3 py-1 rounded-full shadow-sm">
                  {Math.round(
                    ((todayProgress[habit.id] || 0) / habit.target) * 100
                  )}
                  %
                </div>
              </div>

              <div className="p-5">
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>
                      {todayProgress[habit.id] || 0}/{habit.target} {habit.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${
                          Math.min(
                            (todayProgress[habit.id] || 0) / habit.target,
                            1
                          ) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      updateProgress(
                        habit.id,
                        (todayProgress[habit.id] || 0) - 0.5
                      )
                    }
                    disabled={(todayProgress[habit.id] || 0) <= 0}
                    className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium disabled:opacity-30 transition flex items-center justify-center"
                  >
                    <FaMinus className="mr-1" />
                  </button>
                  <button
                    onClick={() =>
                      updateProgress(
                        habit.id,
                        (todayProgress[habit.id] || 0) + 0.5
                      )
                    }
                    disabled={(todayProgress[habit.id] || 0) >= habit.target}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm font-medium disabled:opacity-30 transition flex items-center justify-center"
                  >
                    <FaPlus className="mr-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 sm:mb-6 text-center">
            Weekly Habit Trends
          </h3>

          <div className="w-full h-72 sm:h-80 px-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={habits[0]?.weeklyData.map((dayData, index) => ({
                  day: dayData.day,
                  "Water Intake":
                    habits.find((h) => h.id === "water")?.weeklyData[index]
                      ?.value || 0,
                  "Sleep":
                    habits.find((h) => h.id === "sleep")?.weeklyData[index]
                      ?.value || 0,
                  "Screen Time":
                    habits.find((h) => h.id === "screen")?.weeklyData[index]
                      ?.value || 0,
                }))}
                margin={{ top: 10, right: 10, left: -40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />

                <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#e5e7eb",
                    borderRadius: "0.5rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    fontSize: "0.875rem",
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "10px", fontSize: "0.875rem" }}
                />
                <Line
                  type="monotone"
                  dataKey="Water Intake"
                  stroke="#10b981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="Sleep"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="Screen Time"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </main>

      <footer className="bg-white border-t py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center gap-2">
          <FaChartLine className="text-green-500 text-xl" />
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Habit-Tracker • Where progress meets
            consistency.
          </p>
        </div>
      </footer>
    </div>
  );
}
