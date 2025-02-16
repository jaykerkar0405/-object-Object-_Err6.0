"use client";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Activity, Brain, Users, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Chatbot from "@/components/chatbot";
import FcmProvider from "@/components/fcm-provider";

const Dashboard = () => {
  const practiceData = [
    { date: "Mon", minutes: 45, accuracy: 85 },
    { date: "Tue", minutes: 30, accuracy: 82 },
    { date: "Wed", minutes: 60, accuracy: 88 },
    { date: "Thu", minutes: 45, accuracy: 90 },
    { date: "Fri", minutes: 50, accuracy: 87 },
    { date: "Sat", minutes: 75, accuracy: 92 },
    { date: "Sun", minutes: 40, accuracy: 85 },
  ];

  const topPoses = [
    { name: "Downward Dog", count: 145 },
    { name: "Warrior I", count: 120 },
    { name: "Tree Pose", count: 98 },
    { name: "Child's Pose", count: 95 },
    { name: "Cobra", count: 87 },
  ];

  return (
    <>
      <FcmProvider />

      <div className="p-6 space-y-6 bg-background">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Your yoga journey at a glance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Practice
                  </p>
                  <h3 className="text-2xl font-bold">345 mins</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    +12% from last week
                  </p>
                </div>
                <Activity className="h-8 w-8 text-blue-500 opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg. Accuracy
                  </p>
                  <h3 className="text-2xl font-bold">87%</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    +5% improvement
                  </p>
                </div>
                <Brain className="h-8 w-8 text-green-500 opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Community Rank
                  </p>
                  <h3 className="text-2xl font-bold">#42</h3>
                  <p className="text-xs text-muted-foreground mt-1">Top 5%</p>
                </div>
                <Users className="h-8 w-8 text-purple-500 opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Achievements
                  </p>
                  <h3 className="text-2xl font-bold">12</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    2 new this week
                  </p>
                </div>
                <Award className="h-8 w-8 text-yellow-500 opacity-75" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="poses">Poses</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Practice Overview</CardTitle>
                <CardDescription>
                  Your practice duration and accuracy over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={practiceData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="minutes"
                        stroke="#2563eb"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="accuracy"
                        stroke="#16a34a"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="poses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Most Practiced Poses</CardTitle>
                <CardDescription>
                  Your top asanas by practice frequency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topPoses}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#2563eb" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Chatbot />
    </>
  );
};

export default Dashboard;
