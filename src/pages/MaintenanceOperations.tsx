
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { 
  Wrench, 
  Plus, 
  Calendar as CalendarIcon, 
  SearchIcon, 
  AlertTriangle, 
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Calendar as CalendarLucide,
  Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample maintenance data
const maintenanceData = [
  {
    id: "WO-2023-001",
    shipName: "INS Vikramaditya",
    equipmentId: "SFD-001",
    equipmentName: "Main Propulsion System",
    maintenanceType: "Scheduled",
    priority: "Medium",
    status: "Completed",
    scheduledDate: "2023-08-15",
    completedDate: "2023-08-15",
    assignedTo: "Lt. Cmdr. Sharma",
    description: "Quarterly maintenance check on main propulsion system.",
    tasks: [
      { id: 1, description: "Inspect turbine blades", status: "Completed" },
      { id: 2, description: "Check fuel system", status: "Completed" },
      { id: 3, description: "Verify cooling system operation", status: "Completed" }
    ],
    materials: [
      { id: 1, name: "Lubricant A-423", quantity: 5, unit: "Liters" },
      { id: 2, name: "Filter Set F-102", quantity: 2, unit: "Sets" }
    ],
    notes: "Maintenance completed as scheduled. All systems operating within normal parameters."
  },
  {
    id: "WO-2023-002",
    shipName: "INS Chennai",
    equipmentId: "SFD-004",
    equipmentName: "Surface-to-Air Missile System",
    maintenanceType: "Corrective",
    priority: "High",
    status: "In Progress",
    scheduledDate: "2023-09-10",
    completedDate: null,
    assignedTo: "Lt. Arjun Singh",
    description: "Repair radar tracking system due to intermittent failures during recent exercises.",
    tasks: [
      { id: 1, description: "Diagnose radar tracking issue", status: "Completed" },
      { id: 2, description: "Replace faulty components", status: "In Progress" },
      { id: 3, description: "Calibrate tracking system", status: "Pending" },
      { id: 4, description: "Run full diagnostic test", status: "Pending" }
    ],
    materials: [
      { id: 1, name: "Radar PCB Board", quantity: 1, unit: "Piece" },
      { id: 2, name: "Signal Cable", quantity: 10, unit: "Meters" }
    ],
    notes: "Intermittent fault determined to be with primary circuit board. New part has been ordered."
  },
  {
    id: "WO-2023-003",
    shipName: "INS Vikrant",
    equipmentId: "SFD-003",
    equipmentName: "Integrated Bridge System",
    maintenanceType: "Scheduled",
    priority: "Low",
    status: "Pending",
    scheduledDate: "2023-09-25",
    completedDate: null,
    assignedTo: "Lt. Priya Patel",
    description: "Routine software update and calibration of bridge systems.",
    tasks: [
      { id: 1, description: "Update navigation software", status: "Pending" },
      { id: 2, description: "Calibrate positioning systems", status: "Pending" },
      { id: 3, description: "Test all displays", status: "Pending" }
    ],
    materials: [
      { id: 1, name: "Software Update Package", quantity: 1, unit: "Set" }
    ],
    notes: "Scheduled during port visit to minimize operational impact."
  },
  {
    id: "WO-2023-004",
    shipName: "INS Kolkata",
    equipmentId: "SFD-005",
    equipmentName: "Gas Turbine Engine",
    maintenanceType: "Corrective",
    priority: "Critical",
    status: "Completed",
    scheduledDate: "2023-08-02",
    completedDate: "2023-08-03",
    assignedTo: "Cmdr. Raj Kumar",
    description: "Emergency repair due to unusual vibration detected in port turbine.",
    tasks: [
      { id: 1, description: "Inspect turbine for damage", status: "Completed" },
      { id: 2, description: "Replace damaged bearings", status: "Completed" },
      { id: 3, description: "Balance rotor assembly", status: "Completed" },
      { id: 4, description: "Conduct post-repair test", status: "Completed" }
    ],
    materials: [
      { id: 1, name: "High-Speed Bearings", quantity: 4, unit: "Sets" },
      { id: 2, name: "Special Lubricant", quantity: 3, unit: "Liters" }
    ],
    notes: "Bearings showed excessive wear. Recommended more frequent inspections for this unit."
  },
  {
    id: "WO-2023-005",
    shipName: "INS Kamorta",
    equipmentId: "SFD-006",
    equipmentName: "Radar System",
    maintenanceType: "Scheduled",
    priority: "Medium",
    status: "Overdue",
    scheduledDate: "2023-07-15",
    completedDate: null,
    assignedTo: "Lt. Cmdr. Anil Verma",
    description: "Six-monthly comprehensive inspection of radar systems.",
    tasks: [
      { id: 1, description: "Check all mechanical components", status: "Pending" },
      { id: 2, description: "Verify power systems", status: "Pending" },
      { id: 3, description: "Calibrate radar accuracy", status: "Pending" },
      { id: 4, description: "Test all operating modes", status: "Pending" }
    ],
    materials: [
      { id: 1, name: "Calibration Kit", quantity: 1, unit: "Set" },
      { id: 2, name: "Maintenance Manual", quantity: 1, unit: "Book" }
    ],
    notes: "Maintenance delayed due to operational commitments. Must be rescheduled urgently."
  },
  {
    id: "WO-2023-006",
    shipName: "INS Shivalik",
    equipmentId: "SFD-007",
    equipmentName: "Integrated Platform Management System",
    maintenanceType: "Preventive",
    priority: "Low",
    status: "Scheduled",
    scheduledDate: "2023-09-30",
    completedDate: null,
    assignedTo: "Lt. Sunil Mehta",
    description: "Regular preventive maintenance on IPMS systems.",
    tasks: [
      { id: 1, description: "Check system redundancy", status: "Pending" },
      { id: 2, description: "Test alarm conditions", status: "Pending" },
      { id: 3, description: "Verify all sensors", status: "Pending" }
    ],
    materials: [
      { id: 1, name: "Diagnostic Software", quantity: 1, unit: "Package" }
    ],
    notes: "Annual preventive maintenance to ensure reliable operation."
  },
  {
    id: "WO-2023-007",
    shipName: "INS Kochi",
    equipmentId: "SFD-008",
    equipmentName: "Satellite Communication System",
    maintenanceType: "Scheduled",
    priority: "Medium",
    status: "Scheduled",
    scheduledDate: "2023-10-05",
    completedDate: null,
    assignedTo: "Lt. Cmdr. Das",
    description: "Quarterly maintenance of all SATCOM equipment.",
    tasks: [
      { id: 1, description: "Check antenna alignment", status: "Pending" },
      { id: 2, description: "Test all frequencies", status: "Pending" },
      { id: 3, description: "Verify encryption modules", status: "Pending" }
    ],
    materials: [
      { id: 1, name: "Alignment Tool", quantity: 1, unit: "Set" },
      { id: 2, name: "Signal Analyzer", quantity: 1, unit: "Unit" }
    ],
    notes: "Special attention needed on encryption modules due to recent security update."
  }
];

// Personnel for assignments
const personnel = [
  "Lt. Cmdr. Sharma",
  "Lt. Arjun Singh",
  "Lt. Priya Patel",
  "Cmdr. Raj Kumar",
  "Lt. Cmdr. Anil Verma",
  "Lt. Sunil Mehta",
  "Lt. Cmdr. Das",
  "Chief Petty Officer Gupta",
  "Petty Officer Mirza"
];

// Ship names
const ships = [
  "INS Vikramaditya",
  "INS Chennai",
  "INS Vikrant",
  "INS Kolkata",
  "INS Kamorta",
  "INS Shivalik",
  "INS Kochi"
];

// Main component
const MaintenanceOperations = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShip, setSelectedShip] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const [filteredData, setFilteredData] = useState(maintenanceData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<any | null>(null);
  const [newWorkOrder, setNewWorkOrder] = useState({
    shipName: "",
    equipmentName: "",
    maintenanceType: "",
    priority: "",
    scheduledDate: format(new Date(), "yyyy-MM-dd"),
    assignedTo: "",
    description: ""
  });

  const { toast } = useToast();

  // Apply filters
  const applyFilters = () => {
    let filtered = maintenanceData;
    
    // Filter by active tab
    if (activeTab !== "all") {
      filtered = filtered.filter(item => 
        activeTab === "completed" ? item.status === "Completed" :
        activeTab === "pending" ? ["Pending", "Scheduled"].includes(item.status) :
        activeTab === "inProgress" ? item.status === "In Progress" :
        activeTab === "overdue" ? item.status === "Overdue" : true
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.id.toLowerCase().includes(term) ||
        item.shipName.toLowerCase().includes(term) ||
        item.equipmentName.toLowerCase().includes(term) ||
        item.assignedTo.toLowerCase().includes(term)
      );
    }
    
    // Filter by ship
    if (selectedShip && selectedShip !== "all") {
      filtered = filtered.filter(item => item.shipName === selectedShip);
    }
    
    // Filter by status
    if (selectedStatus && selectedStatus !== "all") {
      filtered = filtered.filter(item => item.status === selectedStatus);
    }
    
    // Filter by maintenance type
    if (selectedType && selectedType !== "all") {
      filtered = filtered.filter(item => item.maintenanceType === selectedType);
    }
    
    setFilteredData(filtered);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedShip(undefined);
    setSelectedStatus(undefined);
    setSelectedType(undefined);
    setFilteredData(maintenanceData);
  };
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setTimeout(() => applyFilters(), 100);
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setTimeout(() => applyFilters(), 100);
  };
  
  // Select work order for details view
  const selectWorkOrder = (workOrder: any) => {
    setSelectedWorkOrder(workOrder);
  };
  
  // Handle new work order form change
  const handleNewWorkOrderChange = (field: string, value: string) => {
    setNewWorkOrder({
      ...newWorkOrder,
      [field]: value
    });
  };
  
  // Save new work order
  const saveNewWorkOrder = () => {
    // Form validation
    if (!newWorkOrder.shipName || !newWorkOrder.equipmentName || !newWorkOrder.maintenanceType || !newWorkOrder.assignedTo) {
      toast({
        title: "Missing required fields",
        description: "Please fill all required fields marked with *",
        variant: "destructive",
      });
      return;
    }
    
    // Create new work order
    const newOrder = {
      id: `WO-2023-${String(maintenanceData.length + 1).padStart(3, '0')}`,
      equipmentId: `SFD-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      status: "Scheduled",
      completedDate: null,
      tasks: [],
      materials: [],
      notes: "",
      ...newWorkOrder
    };
    
    // Add to the list (in a real app, this would be an API call)
    maintenanceData.unshift(newOrder);
    setFilteredData([newOrder, ...filteredData]);
    
    // Close dialog and show success message
    setIsAddDialogOpen(false);
    toast({
      title: "Work order created successfully",
      description: `Work order ${newOrder.id} has been scheduled for ${newOrder.scheduledDate}.`,
    });
    
    // Reset form
    setNewWorkOrder({
      shipName: "",
      equipmentName: "",
      maintenanceType: "",
      priority: "",
      scheduledDate: format(new Date(), "yyyy-MM-dd"),
      assignedTo: "",
      description: ""
    });
  };
  
  // Apply filters on dependency changes
  useEffect(() => {
    applyFilters();
  }, [activeTab, searchTerm, selectedShip, selectedStatus, selectedType]);
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge variant="default" className="bg-green-500">{status}</Badge>;
      case "In Progress":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">{status}</Badge>;
      case "Pending":
      case "Scheduled":
        return <Badge variant="outline">{status}</Badge>;
      case "Overdue":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Critical":
        return <Badge variant="destructive">{priority}</Badge>;
      case "High":
        return <Badge variant="outline" className="border-red-500 text-red-500">{priority}</Badge>;
      case "Medium":
        return <Badge variant="outline" className="border-orange-500 text-orange-500">{priority}</Badge>;
      case "Low":
        return <Badge variant="outline" className="border-green-500 text-green-500">{priority}</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Wrench className="h-6 w-6 text-navy-600" />
          <h1 className="text-2xl font-bold text-navy-900">Maintenance Operations</h1>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Work Order
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Work Order</DialogTitle>
              <DialogDescription>
                Enter the details for the new maintenance work order.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="ship" className="text-sm font-medium">
                  Ship Name *
                </label>
                <Select
                  value={newWorkOrder.shipName}
                  onValueChange={(value) => handleNewWorkOrderChange("shipName", value)}
                >
                  <SelectTrigger id="ship">
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
                <label htmlFor="equipmentName" className="text-sm font-medium">
                  Equipment Name *
                </label>
                <Input
                  id="equipmentName"
                  placeholder="Enter equipment name"
                  value={newWorkOrder.equipmentName}
                  onChange={(e) => handleNewWorkOrderChange("equipmentName", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="maintenanceType" className="text-sm font-medium">
                  Maintenance Type *
                </label>
                <Select
                  value={newWorkOrder.maintenanceType}
                  onValueChange={(value) => handleNewWorkOrderChange("maintenanceType", value)}
                >
                  <SelectTrigger id="maintenanceType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Preventive">Preventive</SelectItem>
                    <SelectItem value="Corrective">Corrective</SelectItem>
                    <SelectItem value="Condition-Based">Condition-Based</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="priority" className="text-sm font-medium">
                  Priority *
                </label>
                <Select
                  value={newWorkOrder.priority}
                  onValueChange={(value) => handleNewWorkOrderChange("priority", value)}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="scheduledDate" className="text-sm font-medium">
                  Scheduled Date *
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newWorkOrder.scheduledDate ? (
                        format(new Date(newWorkOrder.scheduledDate), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(day: Date | undefined) => {
                        setDate(day);
                        if (day) {
                          handleNewWorkOrderChange("scheduledDate", format(day, "yyyy-MM-dd"));
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="assignedTo" className="text-sm font-medium">
                  Assigned To *
                </label>
                <Select
                  value={newWorkOrder.assignedTo}
                  onValueChange={(value) => handleNewWorkOrderChange("assignedTo", value)}
                >
                  <SelectTrigger id="assignedTo">
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
              
              <div className="space-y-2 col-span-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Input
                  id="description"
                  placeholder="Enter work order description"
                  value={newWorkOrder.description}
                  onChange={(e) => handleNewWorkOrderChange("description", e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveNewWorkOrder}>
                Create Work Order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-green-100 p-3 mb-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-700">{maintenanceData.filter(item => item.status === "Completed").length}</h3>
            <p className="text-green-600">Completed</p>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-blue-100 p-3 mb-3">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-blue-700">{maintenanceData.filter(item => item.status === "In Progress").length}</h3>
            <p className="text-blue-600">In Progress</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-gray-100 p-3 mb-3">
              <CalendarLucide className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">{maintenanceData.filter(item => ["Pending", "Scheduled"].includes(item.status)).length}</h3>
            <p className="text-gray-600">Scheduled</p>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 border-red-200">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-red-100 p-3 mb-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-red-700">{maintenanceData.filter(item => item.status === "Overdue").length}</h3>
            <p className="text-red-600">Overdue</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Work Orders</CardTitle>
          <CardDescription>
            Manage and track maintenance work orders across the fleet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="inProgress">In Progress</TabsTrigger>
              <TabsTrigger value="pending">Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex flex-col md:flex-row gap-4 my-6">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, ship, equipment or personnel..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedShip} onValueChange={(value) => {
                setSelectedShip(value);
                setTimeout(() => applyFilters(), 100);
              }}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select Ship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ships</SelectItem>
                  {ships.map((ship) => (
                    <SelectItem key={ship} value={ship}>{ship}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={(value) => {
                setSelectedStatus(value);
                setTimeout(() => applyFilters(), 100);
              }}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedType} onValueChange={(value) => {
                setSelectedType(value);
                setTimeout(() => applyFilters(), 100);
              }}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Preventive">Preventive</SelectItem>
                  <SelectItem value="Corrective">Corrective</SelectItem>
                  <SelectItem value="Condition-Based">Condition-Based</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" onClick={resetFilters}>
                <Filter className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Ship</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Scheduled</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.id} className="cursor-pointer" onClick={() => selectWorkOrder(item)}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.shipName}</TableCell>
                      <TableCell>{item.equipmentName}</TableCell>
                      <TableCell>{item.maintenanceType}</TableCell>
                      <TableCell>{getPriorityBadge(item.priority)}</TableCell>
                      <TableCell>{item.scheduledDate}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {item.assignedTo}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm">
                              <span className="sr-only">Actions</span>
                              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                                <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => selectWorkOrder(item)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Edit Work Order
                            </DropdownMenuItem>
                            {item.status !== "Completed" && (
                              <DropdownMenuItem>
                                Mark as Complete
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              Print Work Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                      No work orders found matching the current filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Work Order Details */}
      <Card>
        <CardHeader>
          <CardTitle>Work Order Details</CardTitle>
          <CardDescription>
            {selectedWorkOrder ? `Details for work order ${selectedWorkOrder.id}` : "Select a work order to view details"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedWorkOrder ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Ship</h3>
                  <p className="text-lg">{selectedWorkOrder.shipName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Equipment</h3>
                  <p className="text-lg">{selectedWorkOrder.equipmentName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                  <div>{getStatusBadge(selectedWorkOrder.status)}</div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Priority</h3>
                  <div>{getPriorityBadge(selectedWorkOrder.priority)}</div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Assigned To</h3>
                  <p>{selectedWorkOrder.assignedTo}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Maintenance Type</h3>
                  <p>{selectedWorkOrder.maintenanceType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Scheduled Date</h3>
                  <p>{selectedWorkOrder.scheduledDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Completion Date</h3>
                  <p>{selectedWorkOrder.completedDate || "Not completed"}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                <p className="text-md border rounded-md p-3 bg-gray-50">{selectedWorkOrder.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Tasks</h3>
                {selectedWorkOrder.tasks && selectedWorkOrder.tasks.length > 0 ? (
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Task</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedWorkOrder.tasks.map((task: any, index: number) => (
                          <TableRow key={task.id}>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>
                              <Badge variant={task.status === "Completed" ? "default" : "outline"}>
                                {task.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No tasks defined for this work order.</p>
                )}
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Required Materials</h3>
                {selectedWorkOrder.materials && selectedWorkOrder.materials.length > 0 ? (
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Material</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Unit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedWorkOrder.materials.map((material: any, index: number) => (
                          <TableRow key={material.id}>
                            <TableCell>{material.name}</TableCell>
                            <TableCell>{material.quantity}</TableCell>
                            <TableCell>{material.unit}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No materials specified for this work order.</p>
                )}
              </div>
              
              {selectedWorkOrder.notes && (
                <div>
                  <h3 className="font-medium mb-2">Notes</h3>
                  <div className="border rounded-md p-3 bg-yellow-50">
                    <p>{selectedWorkOrder.notes}</p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-2 pt-4">
                {selectedWorkOrder.status !== "Completed" && (
                  <Button variant="default">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Complete
                  </Button>
                )}
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Wrench className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium mb-1">No Work Order Selected</h3>
              <p className="text-muted-foreground max-w-md">
                Select a work order from the table above to view detailed information, tasks, and materials.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceOperations;
