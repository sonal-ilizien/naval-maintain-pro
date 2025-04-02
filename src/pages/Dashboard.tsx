
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Ship,
  Wrench,
  ShieldAlert,
  ArrowUp,
  ArrowDown,
  Bell,
  FileText,
  Check,
} from "lucide-react";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";

// Sample data for charts
const maintenanceData = [
  { month: "Jan", scheduled: 65, completed: 45 },
  { month: "Feb", scheduled: 59, completed: 49 },
  { month: "Mar", scheduled: 80, completed: 72 },
  { month: "Apr", scheduled: 81, completed: 60 },
  { month: "May", scheduled: 56, completed: 50 },
  { month: "Jun", scheduled: 55, completed: 45 },
  { month: "Jul", scheduled: 40, completed: 38 },
];

const defectData = [
  { name: "Critical", value: 10 },
  { name: "High", value: 25 },
  { name: "Medium", value: 45 },
  { name: "Low", value: 20 },
];

const shipStatusData = [
  { name: "Ready", value: 60 },
  { name: "Standby", value: 25 },
  { name: "Maintenance", value: 10 },
  { name: "Repair", value: 5 },
];

const COLORS = ["#0A2463", "#3E92CC", "#78C0E0", "#8FB8DE"];
const DEFECT_COLORS = ["#CC0000", "#FF6B6B", "#FFB347", "#CCEABB"];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-navy-900">Dashboard</h1>
        <p className="text-navy-500 text-sm">Last updated: 28 Aug 2023, 09:15 AM</p>
      </div>

      {/* Alert Banner */}
      <Alert className="bg-alert-subtle border-alert">
        <AlertCircle className="h-4 w-4 text-alert" />
        <AlertTitle>Critical Maintenance Required</AlertTitle>
        <AlertDescription>
          INS Vikramaditya (#VS-421) has 3 critical maintenance tasks pending. Required attention within 48 hours.
        </AlertDescription>
      </Alert>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ships under maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ship className="h-5 w-5 text-navy-600" />
                <span className="text-2xl font-bold">12</span>
              </div>
              <span className="text-sm text-green-600 flex items-center gap-1">
                <ArrowUp className="h-3 w-3" /> 2%
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              From total fleet of 45 ships
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending maintenance tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-navy-600" />
                <span className="text-2xl font-bold">187</span>
              </div>
              <span className="text-sm text-red-600 flex items-center gap-1">
                <ArrowUp className="h-3 w-3" /> 14%
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              24 tasks due within 7 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Reported defects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-navy-600" />
                <span className="text-2xl font-bold">53</span>
              </div>
              <span className="text-sm text-green-600 flex items-center gap-1">
                <ArrowDown className="h-3 w-3" /> 8%
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              10 critical defects pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Fleet readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-navy-600" />
                <span className="text-2xl font-bold">82%</span>
              </div>
              <span className="text-sm text-green-600 flex items-center gap-1">
                <ArrowUp className="h-3 w-3" /> 3%
              </span>
            </div>
            <Progress className="h-2 mt-2" value={82} />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Maintenance Performance</CardTitle>
            <CardDescription>
              Scheduled vs completed maintenance tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={maintenanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="scheduled" fill="#0A2463" name="Scheduled" />
                <Bar dataKey="completed" fill="#3E92CC" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Defect Severity</CardTitle>
            <CardDescription>
              Current defect reports by severity
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={defectData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {defectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={DEFECT_COLORS[index % DEFECT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="alerts">
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="alerts">
            <Bell className="h-4 w-4 mr-2" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="tasks">
            <FileText className="h-4 w-4 mr-2" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="reports">
            <Check className="h-4 w-4 mr-2" />
            Reports
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="alerts" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {[
                  {
                    title: "Critical Engine Failure",
                    description: "INS Vikramaditya - Engine room reported critical failure",
                    time: "2 hours ago",
                    priority: "critical"
                  },
                  {
                    title: "Scheduled Maintenance Due",
                    description: "INS Chennai - Quarterly radar system maintenance due",
                    time: "Today",
                    priority: "high"
                  },
                  {
                    title: "Inventory Alert",
                    description: "Low stock for essential spare parts (ID: SP-2145)",
                    time: "Yesterday",
                    priority: "medium"
                  },
                  {
                    title: "Crew Training Required",
                    description: "New maintenance protocol training required for crew",
                    time: "3 days ago",
                    priority: "low"
                  }
                ].map((alert, index) => (
                  <div key={index} className="p-4 flex items-start gap-3">
                    <div className={`h-2 w-2 rounded-full mt-2 ${
                      alert.priority === "critical" ? "bg-alert" :
                      alert.priority === "high" ? "bg-orange-500" :
                      alert.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                    }`} />
                    <div>
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      <p className="text-xs text-navy-400 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {[
                  {
                    title: "Review Maintenance Report",
                    description: "Review monthly maintenance report for INS Vikramaditya",
                    deadline: "Today, 5:00 PM",
                    progress: 75
                  },
                  {
                    title: "Approve Spare Parts Order",
                    description: "Approve requisition for engine spare parts",
                    deadline: "Tomorrow, 10:00 AM",
                    progress: 30
                  },
                  {
                    title: "Update Maintenance Schedule",
                    description: "Update Q3 maintenance schedule for destroyers",
                    deadline: "28 Aug, 2023",
                    progress: 50
                  }
                ].map((task, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{task.title}</h4>
                      <span className="text-xs bg-navy-100 text-navy-700 px-2 py-1 rounded-full">
                        Due: {task.deadline}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <Progress className="h-1" value={task.progress} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {[
                  {
                    title: "Monthly Maintenance Summary",
                    description: "Overall maintenance activities and compliance",
                    date: "31 Jul, 2023",
                    type: "pdf"
                  },
                  {
                    title: "Fleet Readiness Report",
                    description: "Combat readiness and operational status",
                    date: "15 Aug, 2023",
                    type: "xlsx"
                  },
                  {
                    title: "Defect Analysis Q2",
                    description: "Quarterly analysis of reported defects",
                    date: "30 Jun, 2023",
                    type: "pdf"
                  },
                  {
                    title: "Spare Parts Inventory",
                    description: "Complete inventory of available spare parts",
                    date: "10 Aug, 2023",
                    type: "xlsx"
                  }
                ].map((report, index) => (
                  <div key={index} className="p-4 flex items-start gap-3">
                    <div className="bg-navy-100 p-2 rounded">
                      <FileText className="h-5 w-5 text-navy-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-navy-400">{report.date}</p>
                        <span className="text-xs bg-navy-100 text-navy-700 px-2 py-0.5 rounded uppercase">
                          {report.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Ship Status Section */}
      <Card>
        <CardHeader>
          <CardTitle>Ship Status Overview</CardTitle>
          <CardDescription>
            Current operational status of the naval fleet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={shipStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {shipStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-navy-50">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-navy-700">Operating</p>
                      <h3 className="text-3xl font-bold text-navy-900 my-1">27</h3>
                      <p className="text-xs text-navy-600">Ships at sea</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-navy-50">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-navy-700">Docked</p>
                      <h3 className="text-3xl font-bold text-navy-900 my-1">18</h3>
                      <p className="text-xs text-navy-600">Ships at port</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card className="bg-navy-600 text-white">
                <CardContent className="p-4">
                  <h4 className="font-medium">Fleet Highlight</h4>
                  <p className="text-sm text-navy-100 mt-1">
                    INS Arihant successfully completed its maintenance cycle and is ready for deployment.
                  </p>
                  <div className="mt-3 text-right">
                    <span className="text-xs bg-navy-500 text-white px-2 py-1 rounded">
                      View Details
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
