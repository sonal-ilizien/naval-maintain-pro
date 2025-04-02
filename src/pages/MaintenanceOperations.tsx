
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Wrench, SearchIcon, Plus, Filter, CheckCircle, Clock, AlertCircle, FileText } from "lucide-react";

// Sample data for maintenance operations
const scheduledMaintenance = [
  {
    id: "SCH-001",
    shipName: "INS Vikramaditya",
    equipmentId: "EQ-234",
    equipmentName: "Main Propulsion System",
    maintenanceType: "Quarterly Inspection",
    dueDate: "2023-08-30",
    assignedTo: "Lt. Cmdr. Sharma",
    status: "Scheduled",
    priority: "High"
  },
  {
    id: "SCH-002",
    shipName: "INS Chennai",
    equipmentId: "EQ-567",
    equipmentName: "Radar System",
    maintenanceType: "Monthly Calibration",
    dueDate: "2023-08-25",
    assignedTo: "Lt. Verma",
    status: "In Progress",
    priority: "Medium"
  },
  {
    id: "SCH-003",
    shipName: "INS Kolkata",
    equipmentId: "EQ-789",
    equipmentName: "Gas Turbine Engine",
    maintenanceType: "Annual Overhaul",
    dueDate: "2023-09-15",
    assignedTo: "Cmdr. Patil",
    status: "Scheduled",
    priority: "Critical"
  },
  {
    id: "SCH-004",
    shipName: "INS Vikrant",
    equipmentId: "EQ-321",
    equipmentName: "Integrated Bridge System",
    maintenanceType: "Weekly Check",
    dueDate: "2023-08-21",
    assignedTo: "Lt. Kumar",
    status: "Completed",
    priority: "Low"
  }
];

const unscheduledMaintenance = [
  {
    id: "UNSCH-001",
    shipName: "INS Vikramaditya",
    equipmentId: "EQ-456",
    equipmentName: "Auxiliary Power Unit",
    issueDescription: "Unexpected power fluctuations during operation",
    reportedBy: "Chief Engineer Officer",
    reportDate: "2023-08-18",
    status: "Assigned",
    assignedTo: "Lt. Cmdr. Nair",
    priority: "High"
  },
  {
    id: "UNSCH-002",
    shipName: "INS Kamorta",
    equipmentId: "EQ-789",
    equipmentName: "Communication System",
    issueDescription: "Signal interference in certain frequencies",
    reportedBy: "Communications Officer",
    reportDate: "2023-08-17",
    status: "Pending",
    assignedTo: "",
    priority: "Medium"
  },
  {
    id: "UNSCH-003",
    shipName: "INS Kolkata",
    equipmentId: "EQ-123",
    equipmentName: "Fire Control System",
    issueDescription: "Targeting calibration error detected during drill",
    reportedBy: "Weapons Officer",
    reportDate: "2023-08-16",
    status: "In Progress",
    assignedTo: "Lt. Singh",
    priority: "Critical"
  }
];

// Sample data for assignment options
const personnel = [
  "Cmdr. Patil",
  "Lt. Cmdr. Sharma",
  "Lt. Cmdr. Nair",
  "Lt. Verma",
  "Lt. Kumar",
  "Lt. Singh",
  "PO Das",
  "CPO Reddy"
];

// Sample ship names
const ships = [
  "INS Vikramaditya",
  "INS Vikrant",
  "INS Chennai",
  "INS Kolkata",
  "INS Kamorta",
  "INS Delhi",
  "INS Mumbai",
  "INS Shivalik"
];

// Sample maintenance types
const maintenanceTypes = [
  "Weekly Check",
  "Monthly Calibration",
  "Quarterly Inspection",
  "Semi-Annual Service",
  "Annual Overhaul",
  "Emergency Repair"
];

const MaintenanceOperations = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("scheduled");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShip, setSelectedShip] = useState<string | undefined>(undefined);
  const [selectedPriority, setSelectedPriority] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [scheduledFiltered, setScheduledFiltered] = useState(scheduledMaintenance);
  const [unscheduledFiltered, setUnscheduledFiltered] = useState(unscheduledMaintenance);
  
  // New maintenance form state
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [newScheduled, setNewScheduled] = useState({
    shipName: "",
    equipmentId: "",
    equipmentName: "",
    maintenanceType: "",
    dueDate: "",
    assignedTo: "",
    priority: "Medium",
    status: "Scheduled",
  });
  const [newUnscheduled, setNewUnscheduled] = useState({
    shipName: "",
    equipmentId: "",
    equipmentName: "",
    issueDescription: "",
    reportedBy: "",
    priority: "Medium",
    status: "Pending",
  });

  // Apply filters function
  const applyFilters = () => {
    // Filter scheduled maintenance
    const filteredScheduled = scheduledMaintenance.filter(item => {
      const matchesSearch = !searchTerm || 
        item.shipName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.maintenanceType.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesShip = !selectedShip || item.shipName === selectedShip;
      const matchesPriority = !selectedPriority || item.priority === selectedPriority;
      const matchesStatus = !selectedStatus || item.status === selectedStatus;
      
      return matchesSearch && matchesShip && matchesPriority && matchesStatus;
    });
    
    // Filter unscheduled maintenance
    const filteredUnscheduled = unscheduledMaintenance.filter(item => {
      const matchesSearch = !searchTerm || 
        item.shipName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.issueDescription.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesShip = !selectedShip || item.shipName === selectedShip;
      const matchesPriority = !selectedPriority || item.priority === selectedPriority;
      const matchesStatus = !selectedStatus || item.status === selectedStatus;
      
      return matchesSearch && matchesShip && matchesPriority && matchesStatus;
    });
    
    setScheduledFiltered(filteredScheduled);
    setUnscheduledFiltered(filteredUnscheduled);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedShip(undefined);
    setSelectedPriority(undefined);
    setSelectedStatus(undefined);
    setScheduledFiltered(scheduledMaintenance);
    setUnscheduledFiltered(unscheduledMaintenance);
  };
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setTimeout(applyFilters, 300);
  };
  
  // Handle filter changes
  const handleShipChange = (value: string) => {
    setSelectedShip(value);
    setTimeout(applyFilters, 100);
  };
  
  const handlePriorityChange = (value: string) => {
    setSelectedPriority(value);
    setTimeout(applyFilters, 100);
  };
  
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setTimeout(applyFilters, 100);
  };

  // Handle form field changes
  const handleScheduledChange = (field: string, value: string) => {
    setNewScheduled({
      ...newScheduled,
      [field]: value
    });
  };
  
  const handleUnscheduledChange = (field: string, value: string) => {
    setNewUnscheduled({
      ...newUnscheduled,
      [field]: value
    });
  };

  // Date selection
  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    if (date) {
      handleScheduledChange("dueDate", format(date, "yyyy-MM-dd"));
    }
  };

  // Save new scheduled maintenance
  const saveScheduledMaintenance = () => {
    // Validation
    if (!newScheduled.shipName || !newScheduled.equipmentName || !newScheduled.maintenanceType || !newScheduled.dueDate) {
      toast({
        title: "Missing required fields",
        description: "Please fill all required fields marked with *",
        variant: "destructive"
      });
      return;
    }

    // Generate ID and prepare new record
    const newId = `SCH-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    const newRecord = {
      id: newId,
      ...newScheduled,
      status: "Scheduled"
    };

    // Add to data (in a real app, this would be an API call)
    scheduledMaintenance.unshift(newRecord);
    setScheduledFiltered([newRecord, ...scheduledFiltered]);
    
    // Show success message and close dialog
    toast({
      title: "Maintenance scheduled successfully",
      description: `${newScheduled.maintenanceType} for ${newScheduled.shipName} has been scheduled.`
    });
    
    setIsScheduleDialogOpen(false);
    
    // Reset form
    setNewScheduled({
      shipName: "",
      equipmentId: "",
      equipmentName: "",
      maintenanceType: "",
      dueDate: "",
      assignedTo: "",
      priority: "Medium",
      status: "Scheduled",
    });
    setDate(undefined);
  };

  // Save new unscheduled maintenance
  const saveUnscheduledMaintenance = () => {
    // Validation
    if (!newUnscheduled.shipName || !newUnscheduled.equipmentName || !newUnscheduled.issueDescription) {
      toast({
        title: "Missing required fields",
        description: "Please fill all required fields marked with *",
        variant: "destructive"
      });
      return;
    }

    // Generate ID and prepare new record
    const newId = `UNSCH-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    const today = new Date();
    const formattedDate = format(today, "yyyy-MM-dd");
    
    const newRecord = {
      id: newId,
      ...newUnscheduled,
      reportDate: formattedDate,
      assignedTo: "",
      status: "Pending"
    };

    // Add to data (in a real app, this would be an API call)
    unscheduledMaintenance.unshift(newRecord);
    setUnscheduledFiltered([newRecord, ...unscheduledFiltered]);
    
    // Show success message and close dialog
    toast({
      title: "Maintenance issue reported successfully",
      description: `Unscheduled maintenance for ${newUnscheduled.shipName} has been reported.`
    });
    
    setIsReportDialogOpen(false);
    
    // Reset form
    setNewUnscheduled({
      shipName: "",
      equipmentId: "",
      equipmentName: "",
      issueDescription: "",
      reportedBy: "",
      priority: "Medium",
      status: "Pending",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Wrench className="h-6 w-6 text-navy-600" />
          <h1 className="text-2xl font-bold text-navy-900">Maintenance Operations</h1>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Maintenance
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Schedule New Maintenance</DialogTitle>
                <DialogDescription>
                  Plan and schedule a new maintenance activity
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="shipName" className="text-sm font-medium">
                    Ship Name *
                  </label>
                  <Select
                    value={newScheduled.shipName}
                    onValueChange={(value) => handleScheduledChange("shipName", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select ship" />
                    </SelectTrigger>
                    <SelectContent>
                      {ships.map((ship) => (
                        <SelectItem key={ship} value={ship}>
                          {ship}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="equipmentId" className="text-sm font-medium">
                    Equipment ID
                  </label>
                  <Input
                    id="equipmentId"
                    placeholder="Enter equipment ID"
                    value={newScheduled.equipmentId}
                    onChange={(e) => handleScheduledChange("equipmentId", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="equipmentName" className="text-sm font-medium">
                    Equipment Name *
                  </label>
                  <Input
                    id="equipmentName"
                    placeholder="Enter equipment name"
                    value={newScheduled.equipmentName}
                    onChange={(e) => handleScheduledChange("equipmentName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="maintenanceType" className="text-sm font-medium">
                    Maintenance Type *
                  </label>
                  <Select
                    value={newScheduled.maintenanceType}
                    onValueChange={(value) => handleScheduledChange("maintenanceType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {maintenanceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="dueDate" className="text-sm font-medium">
                    Due Date *
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label htmlFor="assignedTo" className="text-sm font-medium">
                    Assign To
                  </label>
                  <Select
                    value={newScheduled.assignedTo}
                    onValueChange={(value) => handleScheduledChange("assignedTo", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select personnel" />
                    </SelectTrigger>
                    <SelectContent>
                      {personnel.map((person) => (
                        <SelectItem key={person} value={person}>
                          {person}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="priority" className="text-sm font-medium">
                    Priority
                  </label>
                  <Select
                    value={newScheduled.priority}
                    onValueChange={(value) => handleScheduledChange("priority", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveScheduledMaintenance}>
                  Schedule Maintenance
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <AlertCircle className="h-4 w-4 mr-2" />
                Report Issue
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Report Maintenance Issue</DialogTitle>
                <DialogDescription>
                  Report an unscheduled maintenance issue or defect
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="shipName" className="text-sm font-medium">
                    Ship Name *
                  </label>
                  <Select
                    value={newUnscheduled.shipName}
                    onValueChange={(value) => handleUnscheduledChange("shipName", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select ship" />
                    </SelectTrigger>
                    <SelectContent>
                      {ships.map((ship) => (
                        <SelectItem key={ship} value={ship}>
                          {ship}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="equipmentId" className="text-sm font-medium">
                    Equipment ID
                  </label>
                  <Input
                    id="equipmentId"
                    placeholder="Enter equipment ID"
                    value={newUnscheduled.equipmentId}
                    onChange={(e) => handleUnscheduledChange("equipmentId", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="equipmentName" className="text-sm font-medium">
                    Equipment Name *
                  </label>
                  <Input
                    id="equipmentName"
                    placeholder="Enter equipment name"
                    value={newUnscheduled.equipmentName}
                    onChange={(e) => handleUnscheduledChange("equipmentName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="reportedBy" className="text-sm font-medium">
                    Reported By
                  </label>
                  <Input
                    id="reportedBy"
                    placeholder="Enter name or designation"
                    value={newUnscheduled.reportedBy}
                    onChange={(e) => handleUnscheduledChange("reportedBy", e.target.value)}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="issueDescription" className="text-sm font-medium">
                    Issue Description *
                  </label>
                  <Input
                    id="issueDescription"
                    placeholder="Describe the issue or defect"
                    value={newUnscheduled.issueDescription}
                    onChange={(e) => handleUnscheduledChange("issueDescription", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="priority" className="text-sm font-medium">
                    Priority
                  </label>
                  <Select
                    value={newUnscheduled.priority}
                    onValueChange={(value) => handleUnscheduledChange("priority", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveUnscheduledMaintenance}>
                  Submit Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Management</CardTitle>
          <CardDescription>
            Track and manage scheduled and unscheduled maintenance activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="scheduled" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full md:w-[400px]">
              <TabsTrigger value="scheduled">Scheduled Maintenance</TabsTrigger>
              <TabsTrigger value="unscheduled">Unscheduled Maintenance</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col md:flex-row gap-4 my-6">
              <div className="flex-1">
                <div className="relative">
                  <SearchIcon className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder={activeTab === "scheduled" ? "Search by ship, equipment, type..." : "Search by ship, equipment, issue..."}
                    className="pl-10"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedShip} onValueChange={handleShipChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Ships</SelectItem>
                    {ships.map((ship) => (
                      <SelectItem key={ship} value={ship}>{ship}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedPriority} onValueChange={handlePriorityChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Priorities</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedStatus} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Assigned">Assigned</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" onClick={resetFilters}>
                  <Filter className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
            
            <TabsContent value="scheduled" className="pt-2">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Ship Name</TableHead>
                      <TableHead>Equipment</TableHead>
                      <TableHead>Maintenance Type</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledFiltered.length > 0 ? (
                      scheduledFiltered.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.shipName}</TableCell>
                          <TableCell>{item.equipmentName}</TableCell>
                          <TableCell>{item.maintenanceType}</TableCell>
                          <TableCell>{item.dueDate}</TableCell>
                          <TableCell>{item.assignedTo || "-"}</TableCell>
                          <TableCell>
                            <Badge variant={
                              item.status === "Completed" ? "default" : 
                              item.status === "In Progress" ? "outline" :
                              "secondary"
                            }>
                              {item.status === "Completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                              {item.status === "In Progress" && <Clock className="h-3 w-3 mr-1" />}
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              item.priority === "Low" ? "outline" :
                              item.priority === "Medium" ? "secondary" :
                              item.priority === "High" ? "default" :
                              "destructive"
                            }>
                              {item.priority}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                          No scheduled maintenance found matching the current filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="unscheduled" className="pt-2">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Ship Name</TableHead>
                      <TableHead>Equipment</TableHead>
                      <TableHead>Issue Description</TableHead>
                      <TableHead>Report Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Priority</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unscheduledFiltered.length > 0 ? (
                      unscheduledFiltered.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.shipName}</TableCell>
                          <TableCell>{item.equipmentName}</TableCell>
                          <TableCell>{item.issueDescription}</TableCell>
                          <TableCell>{item.reportDate}</TableCell>
                          <TableCell>
                            <Badge variant={
                              item.status === "Pending" ? "secondary" : 
                              item.status === "In Progress" ? "outline" :
                              item.status === "Completed" ? "default" :
                              "destructive"
                            }>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.assignedTo || "-"}</TableCell>
                          <TableCell>
                            <Badge variant={
                              item.priority === "Low" ? "outline" :
                              item.priority === "Medium" ? "secondary" :
                              item.priority === "High" ? "default" :
                              "destructive"
                            }>
                              {item.priority}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                          No unscheduled maintenance found matching the current filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Performance Metrics</CardTitle>
          <CardDescription>
            Tracking and analysis of maintenance operations efficiency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Scheduled Compliance Rate</h3>
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-24 h-24">
                      <circle
                        className="text-muted stroke-current"
                        strokeWidth="5"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="48"
                        cy="48"
                      />
                      <circle
                        className="text-navy-600 stroke-current"
                        strokeWidth="5"
                        strokeDasharray={2 * Math.PI * 45}
                        strokeDashoffset={2 * Math.PI * 45 * (1 - 0.84)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="48"
                        cy="48"
                      />
                    </svg>
                    <span className="absolute text-2xl font-bold">84%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    3% increase from last month
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Average Resolution Time</h3>
                  <div className="flex items-center justify-center">
                    <Clock className="h-6 w-6 text-navy-600" />
                    <span className="text-2xl font-bold ml-2">2.3 days</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    For critical priority issues
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Open Tasks</h3>
                  <div className="flex items-center justify-center">
                    <Wrench className="h-6 w-6 text-navy-600" />
                    <span className="text-2xl font-bold ml-2">27</span>
                  </div>
                  <div className="flex justify-center gap-4 mt-3">
                    <div className="text-center">
                      <span className="text-xs text-muted-foreground">Critical</span>
                      <p className="text-sm font-medium">8</p>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-muted-foreground">High</span>
                      <p className="text-sm font-medium">12</p>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-muted-foreground">Other</span>
                      <p className="text-sm font-medium">7</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              View Full Reports
            </Button>
            <Button variant="outline" size="sm">
              <Wrench className="h-4 w-4 mr-2" />
              Maintenance History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceOperations;
