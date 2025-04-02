
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  AlertCircle,
  FileText, 
  Download,
  Filter,
  ChevronDown,
  Plus,
  CalendarDays,
  Clock,
  Settings,
  Search,
  Ship,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

// Sample data for defects
const defectsData = [
  {
    id: "DEF-001",
    shipName: "INS Vikramaditya",
    title: "Hydraulic Leak in Main Engine Room",
    description: "Hydraulic fluid leakage detected in the port side of main engine room near pump #3.",
    reportedBy: "Lt. Cmdr. Sharma",
    reportedDate: "2023-11-15",
    severity: "Critical",
    status: "In Progress",
    assignedTo: "Engineering Division",
    resolution: "",
    resolutionDate: "",
    images: ["image1.jpg"],
    comments: [
      {
        author: "Cmdr. Verma",
        date: "2023-11-16",
        text: "Inspection completed. Parts ordered for replacement."
      }
    ]
  },
  {
    id: "DEF-002",
    shipName: "INS Chennai",
    title: "Radar System Intermittent Failure",
    description: "Main radar system experiencing intermittent signal loss during rough sea conditions.",
    reportedBy: "Lt. Agarwal",
    reportedDate: "2023-11-10",
    severity: "Major",
    status: "Pending",
    assignedTo: "Electronics Division",
    resolution: "",
    resolutionDate: "",
    images: [],
    comments: []
  },
  {
    id: "DEF-003",
    shipName: "INS Kolkata",
    title: "Corrosion on Port Side Hull Section",
    description: "Significant corrosion detected on port side hull below waterline during routine inspection.",
    reportedBy: "CPO Reddy",
    reportedDate: "2023-10-28",
    severity: "Major",
    status: "Resolved",
    assignedTo: "Hull Maintenance Team",
    resolution: "Affected area cleaned, treated with anti-corrosion agent and repainted.",
    resolutionDate: "2023-11-05",
    images: ["image2.jpg", "image3.jpg"],
    comments: [
      {
        author: "Lt. Nair",
        date: "2023-10-29",
        text: "Inspection completed. Approx 2 sq meters affected."
      },
      {
        author: "CPO Reddy",
        date: "2023-11-05",
        text: "Repair completed and inspected. Recommending quarterly checks for this section."
      }
    ]
  },
  {
    id: "DEF-004",
    shipName: "INS Vikrant",
    title: "Communication System Echo Issue",
    description: "Internal communication system experiencing echo during broadcasts.",
    reportedBy: "Lt. Kumar",
    reportedDate: "2023-11-12",
    severity: "Minor",
    status: "In Progress",
    assignedTo: "Communications Team",
    resolution: "",
    resolutionDate: "",
    images: [],
    comments: [
      {
        author: "PO Singh",
        date: "2023-11-13",
        text: "Initial diagnostics indicate possible feedback issue in the amplifier system."
      }
    ]
  },
  {
    id: "DEF-005",
    shipName: "INS Kamorta",
    title: "Backup Generator Overheating",
    description: "Secondary generator overheating after 30 minutes of operation.",
    reportedBy: "Lt. Cmdr. Saxena",
    reportedDate: "2023-11-08",
    severity: "Major",
    status: "Resolved",
    assignedTo: "Power Systems Team",
    resolution: "Cooling system malfunction identified and repaired. Faulty temperature sensor replaced.",
    resolutionDate: "2023-11-11",
    images: ["image4.jpg"],
    comments: []
  },
  {
    id: "DEF-006",
    shipName: "INS Vikramaditya",
    title: "Galley Equipment Failure",
    description: "Main cooking equipment in galley showing electrical faults.",
    reportedBy: "PO Rao",
    reportedDate: "2023-11-14",
    severity: "Minor",
    status: "Pending",
    assignedTo: "Logistics Team",
    resolution: "",
    resolutionDate: "",
    images: [],
    comments: []
  }
];

// Sample data for routine inspections
const routineData = [
  {
    id: "RTN-001",
    shipName: "INS Vikramaditya",
    title: "Quarterly Hull Inspection",
    description: "Standard quarterly inspection of hull integrity and protective coatings.",
    scheduledDate: "2023-12-15",
    frequency: "Quarterly",
    status: "Scheduled",
    assignedTo: "Hull Inspection Team",
    lastCompleted: "2023-09-15",
    completionRate: 0,
    checklistItems: [
      { task: "Inspect hull below waterline", completed: false },
      { task: "Check propeller shaft seals", completed: false },
      { task: "Inspect rudder assembly", completed: false },
      { task: "Check hull anodes", completed: false },
      { task: "Inspect sonar dome", completed: false }
    ]
  },
  {
    id: "RTN-002",
    shipName: "INS Chennai",
    title: "Monthly Weapons Systems Check",
    description: "Routine inspection and testing of weapons systems and mountings.",
    scheduledDate: "2023-11-30",
    frequency: "Monthly",
    status: "In Progress",
    assignedTo: "Weapons Division",
    lastCompleted: "2023-10-30",
    completionRate: 60,
    checklistItems: [
      { task: "Inspect missile launcher mechanisms", completed: true },
      { task: "Test fire control systems", completed: true },
      { task: "Check ammunition storage conditions", completed: true },
      { task: "Inspect gun barrels and mechanisms", completed: false },
      { task: "Test targeting systems", completed: false }
    ]
  },
  {
    id: "RTN-003",
    shipName: "INS Kolkata",
    title: "Annual Engine Overhaul",
    description: "Comprehensive inspection and maintenance of main propulsion systems.",
    scheduledDate: "2024-02-10",
    frequency: "Annual",
    status: "Scheduled",
    assignedTo: "Engineering Division",
    lastCompleted: "2023-02-12",
    completionRate: 0,
    checklistItems: [
      { task: "Disassemble and inspect main bearings", completed: false },
      { task: "Replace filters and fluids", completed: false },
      { task: "Inspect fuel injection systems", completed: false },
      { task: "Check and calibrate governor", completed: false },
      { task: "Test engine at various loads", completed: false }
    ]
  },
  {
    id: "RTN-004",
    shipName: "INS Vikrant",
    title: "Weekly Navigation Equipment Check",
    description: "Routine inspection of navigation systems and equipment.",
    scheduledDate: "2023-11-20",
    frequency: "Weekly",
    status: "Completed",
    assignedTo: "Navigation Team",
    lastCompleted: "2023-11-20",
    completionRate: 100,
    checklistItems: [
      { task: "Check GPS systems", completed: true },
      { task: "Inspect radar equipment", completed: true },
      { task: "Test depth sounders", completed: true },
      { task: "Verify compass calibration", completed: true },
      { task: "Check navigation lights", completed: true }
    ]
  },
  {
    id: "RTN-005",
    shipName: "INS Kamorta",
    title: "Bi-annual Communication Systems Audit",
    description: "Comprehensive inspection and testing of all communication equipment.",
    scheduledDate: "2024-01-15",
    frequency: "Bi-annual",
    status: "Scheduled",
    assignedTo: "Communications Division",
    lastCompleted: "2023-07-18",
    completionRate: 0,
    checklistItems: [
      { task: "Test internal communication systems", completed: false },
      { task: "Check external radio equipment", completed: false },
      { task: "Inspect satellite communication systems", completed: false },
      { task: "Test emergency communication protocols", completed: false },
      { task: "Verify encryption systems", completed: false }
    ]
  }
];

// Ship names for dropdown selection
const shipNames = [
  "INS Vikramaditya",
  "INS Chennai",
  "INS Kolkata",
  "INS Vikrant",
  "INS Kamorta",
  "INS Teg",
  "INS Tarkash"
];

// Severity options
const severityOptions = ["Critical", "Major", "Minor"];

// Status options for defects
const defectStatusOptions = ["Pending", "In Progress", "Resolved"];

// Status options for routine inspections
const routineStatusOptions = ["Scheduled", "In Progress", "Completed", "Overdue"];

// Department options for assignment
const departmentOptions = [
  "Engineering Division",
  "Weapons Division",
  "Electronics Division",
  "Hull Maintenance Team",
  "Navigation Team",
  "Communications Team",
  "Power Systems Team",
  "Logistics Team"
];

// Frequency options for routine inspections
const frequencyOptions = ["Daily", "Weekly", "Monthly", "Quarterly", "Bi-annual", "Annual"];

const DefectsAndRoutine = () => {
  const [activeTab, setActiveTab] = useState("defects");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShip, setSelectedShip] = useState<string | undefined>(undefined);
  const [selectedSeverity, setSelectedSeverity] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [filteredDefects, setFilteredDefects] = useState(defectsData);
  const [filteredRoutines, setFilteredRoutines] = useState(routineData);
  
  const [isDefectDialogOpen, setIsDefectDialogOpen] = useState(false);
  const [isRoutineDialogOpen, setIsRoutineDialogOpen] = useState(false);
  
  const [selectedDefect, setSelectedDefect] = useState<any | null>(null);
  const [selectedRoutine, setSelectedRoutine] = useState<any | null>(null);
  
  // New defect/routine form states
  const [newDefect, setNewDefect] = useState({
    title: "",
    shipName: "",
    description: "",
    severity: "Major",
    assignedTo: ""
  });
  
  const [newRoutine, setNewRoutine] = useState({
    title: "",
    shipName: "",
    description: "",
    frequency: "Monthly",
    scheduledDate: format(new Date(), "yyyy-MM-dd"),
    assignedTo: ""
  });
  
  const { toast } = useToast();

  // Filter defects based on search and dropdowns
  const filterDefects = () => {
    const filtered = defectsData.filter(item => {
      const matchesSearch = !searchTerm || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesShip = !selectedShip || item.shipName === selectedShip;
      const matchesSeverity = !selectedSeverity || item.severity === selectedSeverity;
      const matchesStatus = !selectedStatus || item.status === selectedStatus;
      
      return matchesSearch && matchesShip && matchesSeverity && matchesStatus;
    });
    
    setFilteredDefects(filtered);
  };
  
  // Filter routines based on search and dropdowns
  const filterRoutines = () => {
    const filtered = routineData.filter(item => {
      const matchesSearch = !searchTerm || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesShip = !selectedShip || item.shipName === selectedShip;
      const matchesStatus = !selectedStatus || item.status === selectedStatus;
      
      return matchesSearch && matchesShip && matchesStatus;
    });
    
    setFilteredRoutines(filtered);
  };
  
  // Handle search input changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setTimeout(() => {
      if (activeTab === "defects") {
        filterDefects();
      } else {
        filterRoutines();
      }
    }, 300);
  };
  
  // Handle ship filter changes
  const handleShipChange = (value: string) => {
    setSelectedShip(value);
    setTimeout(() => {
      if (activeTab === "defects") {
        filterDefects();
      } else {
        filterRoutines();
      }
    }, 100);
  };
  
  // Handle severity filter changes
  const handleSeverityChange = (value: string) => {
    setSelectedSeverity(value);
    setTimeout(() => {
      filterDefects();
    }, 100);
  };
  
  // Handle status filter changes
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setTimeout(() => {
      if (activeTab === "defects") {
        filterDefects();
      } else {
        filterRoutines();
      }
    }, 100);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedShip(undefined);
    setSelectedSeverity(undefined);
    setSelectedStatus(undefined);
    setFilteredDefects(defectsData);
    setFilteredRoutines(routineData);
  };
  
  // Handle defect form input changes
  const handleDefectChange = (field: string, value: string) => {
    setNewDefect({
      ...newDefect,
      [field]: value
    });
  };
  
  // Handle routine form input changes
  const handleRoutineChange = (field: string, value: string) => {
    setNewRoutine({
      ...newRoutine,
      [field]: value
    });
  };
  
  // Save new defect
  const saveNewDefect = () => {
    // Basic form validation
    if (!newDefect.title || !newDefect.shipName || !newDefect.description || !newDefect.assignedTo) {
      toast({
        title: "Missing required fields",
        description: "Please fill all required fields marked with *",
        variant: "destructive",
      });
      return;
    }
    
    // Create new defect entry
    const today = new Date();
    const formattedDate = format(today, 'yyyy-MM-dd');
    
    const newDefectEntry = {
      id: `DEF-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      ...newDefect,
      reportedBy: "Current User", // In a real app, this would be the logged-in user
      reportedDate: formattedDate,
      status: "Pending",
      resolution: "",
      resolutionDate: "",
      images: [],
      comments: []
    };
    
    // Add to the defects list (in a real app, this would be an API call)
    defectsData.unshift(newDefectEntry);
    setFilteredDefects([newDefectEntry, ...filteredDefects]);
    
    // Show success message
    toast({
      title: "Defect reported successfully",
      description: `Defect ID: ${newDefectEntry.id} has been created.`,
    });
    
    // Close dialog and reset form
    setIsDefectDialogOpen(false);
    setNewDefect({
      title: "",
      shipName: "",
      description: "",
      severity: "Major",
      assignedTo: ""
    });
  };
  
  // Save new routine
  const saveNewRoutine = () => {
    // Basic form validation
    if (!newRoutine.title || !newRoutine.shipName || !newRoutine.description || !newRoutine.scheduledDate || !newRoutine.assignedTo) {
      toast({
        title: "Missing required fields",
        description: "Please fill all required fields marked with *",
        variant: "destructive",
      });
      return;
    }
    
    // Create checklist items (in a real app, these would be configurable)
    const checklistItems = [
      { task: "Initial inspection", completed: false },
      { task: "Systems check", completed: false },
      { task: "Documentation review", completed: false },
      { task: "Equipment testing", completed: false },
      { task: "Final verification", completed: false }
    ];
    
    // Create new routine entry
    const today = new Date();
    const formattedDate = format(today, 'yyyy-MM-dd');
    
    const newRoutineEntry = {
      id: `RTN-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      ...newRoutine,
      status: "Scheduled",
      lastCompleted: "",
      completionRate: 0,
      checklistItems
    };
    
    // Add to the routines list (in a real app, this would be an API call)
    routineData.unshift(newRoutineEntry);
    setFilteredRoutines([newRoutineEntry, ...filteredRoutines]);
    
    // Show success message
    toast({
      title: "Routine inspection created",
      description: `Routine ID: ${newRoutineEntry.id} has been scheduled.`,
    });
    
    // Close dialog and reset form
    setIsRoutineDialogOpen(false);
    setNewRoutine({
      title: "",
      shipName: "",
      description: "",
      frequency: "Monthly",
      scheduledDate: format(new Date(), "yyyy-MM-dd"),
      assignedTo: ""
    });
  };
  
  // View defect details
  const viewDefectDetails = (defect: any) => {
    setSelectedDefect(defect);
  };
  
  // View routine details
  const viewRoutineDetails = (routine: any) => {
    setSelectedRoutine(routine);
  };
  
  // Close defect details
  const closeDefectDetails = () => {
    setSelectedDefect(null);
  };
  
  // Close routine details
  const closeRoutineDetails = () => {
    setSelectedRoutine(null);
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSelectedSeverity(undefined); // Reset severity since it's only for defects
    
    // Apply appropriate filters based on the active tab
    if (value === "defects") {
      filterDefects();
    } else {
      filterRoutines();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-6 w-6 text-navy-600" />
          <h1 className="text-2xl font-bold text-navy-900">Defects and Routine (DART)</h1>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Export
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export as Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Add Defect Button */}
          <Dialog open={isDefectDialogOpen} onOpenChange={setIsDefectDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={activeTab !== "defects"}>
                <Plus className="h-4 w-4 mr-2" />
                Report Defect
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Report New Defect</DialogTitle>
                <DialogDescription>
                  Enter the details of the defect to be reported.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Defect Title *
                  </label>
                  <Input
                    id="title"
                    placeholder="Enter defect title"
                    value={newDefect.title}
                    onChange={(e) => handleDefectChange("title", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="shipName" className="text-sm font-medium">
                    Ship Name *
                  </label>
                  <Select
                    value={newDefect.shipName}
                    onValueChange={(value) => handleDefectChange("shipName", value)}
                  >
                    <SelectTrigger id="shipName">
                      <SelectValue placeholder="Select ship" />
                    </SelectTrigger>
                    <SelectContent>
                      {shipNames.map((ship) => (
                        <SelectItem key={ship} value={ship}>
                          {ship}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 col-span-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description *
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe the defect in detail"
                    value={newDefect.description}
                    onChange={(e) => handleDefectChange("description", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="severity" className="text-sm font-medium">
                    Severity *
                  </label>
                  <Select
                    value={newDefect.severity}
                    onValueChange={(value) => handleDefectChange("severity", value)}
                  >
                    <SelectTrigger id="severity">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      {severityOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="assignedTo" className="text-sm font-medium">
                    Assign To *
                  </label>
                  <Select
                    value={newDefect.assignedTo}
                    onValueChange={(value) => handleDefectChange("assignedTo", value)}
                  >
                    <SelectTrigger id="assignedTo">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentOptions.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDefectDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveNewDefect}>
                  Report Defect
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Add Routine Button */}
          <Dialog open={isRoutineDialogOpen} onOpenChange={setIsRoutineDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={activeTab !== "routines"}>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Routine
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Schedule Routine Inspection</DialogTitle>
                <DialogDescription>
                  Enter the details for the new routine inspection.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="routineTitle" className="text-sm font-medium">
                    Inspection Title *
                  </label>
                  <Input
                    id="routineTitle"
                    placeholder="Enter inspection title"
                    value={newRoutine.title}
                    onChange={(e) => handleRoutineChange("title", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="routineShip" className="text-sm font-medium">
                    Ship Name *
                  </label>
                  <Select
                    value={newRoutine.shipName}
                    onValueChange={(value) => handleRoutineChange("shipName", value)}
                  >
                    <SelectTrigger id="routineShip">
                      <SelectValue placeholder="Select ship" />
                    </SelectTrigger>
                    <SelectContent>
                      {shipNames.map((ship) => (
                        <SelectItem key={ship} value={ship}>
                          {ship}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 col-span-2">
                  <label htmlFor="routineDescription" className="text-sm font-medium">
                    Description *
                  </label>
                  <Textarea
                    id="routineDescription"
                    placeholder="Describe the routine inspection"
                    value={newRoutine.description}
                    onChange={(e) => handleRoutineChange("description", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="frequency" className="text-sm font-medium">
                    Frequency *
                  </label>
                  <Select
                    value={newRoutine.frequency}
                    onValueChange={(value) => handleRoutineChange("frequency", value)}
                  >
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {frequencyOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="scheduledDate" className="text-sm font-medium">
                    Scheduled Date *
                  </label>
                  <Input
                    id="scheduledDate"
                    type="date"
                    value={newRoutine.scheduledDate}
                    onChange={(e) => handleRoutineChange("scheduledDate", e.target.value)}
                    min={format(new Date(), "yyyy-MM-dd")}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="routineAssignedTo" className="text-sm font-medium">
                    Assign To *
                  </label>
                  <Select
                    value={newRoutine.assignedTo}
                    onValueChange={(value) => handleRoutineChange("assignedTo", value)}
                  >
                    <SelectTrigger id="routineAssignedTo">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentOptions.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRoutineDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveNewRoutine}>
                  Schedule Inspection
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs defaultValue="defects" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="defects">Defects</TabsTrigger>
          <TabsTrigger value="routines">Routine Inspections</TabsTrigger>
        </TabsList>
        
        {/* Defects Tab Content */}
        <TabsContent value="defects">
          <Card>
            <CardHeader>
              <CardTitle>Defect Reports</CardTitle>
              <CardDescription>
                View and manage defects reported across the naval fleet
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      placeholder="Search by title, description or ID..."
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
                      {shipNames.map((ship) => (
                        <SelectItem key={ship} value={ship}>{ship}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedSeverity} onValueChange={handleSeverityChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Severities</SelectItem>
                      {severityOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedStatus} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Statuses</SelectItem>
                      {defectStatusOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" onClick={resetFilters}>
                    <Filter className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
              
              {/* Defects Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Ship</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Reported On</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDefects.length > 0 ? (
                      filteredDefects.map((defect) => (
                        <TableRow key={defect.id} className="cursor-pointer" onClick={() => viewDefectDetails(defect)}>
                          <TableCell className="font-medium">{defect.id}</TableCell>
                          <TableCell>{defect.shipName}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{defect.title}</TableCell>
                          <TableCell>{defect.reportedDate}</TableCell>
                          <TableCell>
                            <Badge variant={
                              defect.severity === "Critical" ? "destructive" : 
                              defect.severity === "Major" ? "default" : "outline"
                            }>
                              {defect.severity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              defect.status === "Resolved" ? "outline" : 
                              defect.status === "In Progress" ? "default" : 
                              "secondary"
                            }>
                              {defect.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{defect.assignedTo}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={(e) => { 
                              e.stopPropagation(); 
                              viewDefectDetails(defect);
                            }}>
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                          No defects found matching the current filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Routines Tab Content */}
        <TabsContent value="routines">
          <Card>
            <CardHeader>
              <CardTitle>Routine Inspections</CardTitle>
              <CardDescription>
                Manage and track scheduled routine inspections across the fleet
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      placeholder="Search by title, description or ID..."
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
                      {shipNames.map((ship) => (
                        <SelectItem key={ship} value={ship}>{ship}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedStatus} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Statuses</SelectItem>
                      {routineStatusOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" onClick={resetFilters}>
                    <Filter className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
              
              {/* Routines Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Ship</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRoutines.length > 0 ? (
                      filteredRoutines.map((routine) => (
                        <TableRow key={routine.id} className="cursor-pointer" onClick={() => viewRoutineDetails(routine)}>
                          <TableCell className="font-medium">{routine.id}</TableCell>
                          <TableCell>{routine.shipName}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{routine.title}</TableCell>
                          <TableCell>{routine.scheduledDate}</TableCell>
                          <TableCell>{routine.frequency}</TableCell>
                          <TableCell>
                            <Badge variant={
                              routine.status === "Completed" ? "outline" : 
                              routine.status === "In Progress" ? "default" : 
                              routine.status === "Overdue" ? "destructive" : "secondary"
                            }>
                              {routine.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={routine.completionRate} className="h-2 w-[60px]" />
                              <span className="text-xs">{routine.completionRate}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={(e) => { 
                              e.stopPropagation(); 
                              viewRoutineDetails(routine);
                            }}>
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                          No routine inspections found matching the current filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Defect Details Modal */}
      {selectedDefect && (
        <Dialog open={!!selectedDefect} onOpenChange={() => closeDefectDetails()}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Defect Details: {selectedDefect.id}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Ship</p>
                <p className="flex items-center gap-1">
                  <Ship className="h-4 w-4 text-muted-foreground" />
                  {selectedDefect.shipName}
                </p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Status</p>
                <Badge variant={
                  selectedDefect.status === "Resolved" ? "outline" : 
                  selectedDefect.status === "In Progress" ? "default" : 
                  "secondary"
                }>
                  {selectedDefect.status}
                </Badge>
              </div>
              
              <div className="space-y-1 col-span-2">
                <p className="text-sm font-medium">Title</p>
                <p className="font-medium text-lg">{selectedDefect.title}</p>
              </div>
              
              <div className="space-y-1 col-span-2">
                <p className="text-sm font-medium">Description</p>
                <p className="text-sm">{selectedDefect.description}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Severity</p>
                <Badge variant={
                  selectedDefect.severity === "Critical" ? "destructive" : 
                  selectedDefect.severity === "Major" ? "default" : "outline"
                }>
                  {selectedDefect.severity}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Assigned To</p>
                <p>{selectedDefect.assignedTo}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Reported By</p>
                <p>{selectedDefect.reportedBy}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Reported Date</p>
                <p className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  {selectedDefect.reportedDate}
                </p>
              </div>
              
              {selectedDefect.status === "Resolved" && (
                <>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Resolution</p>
                    <p>{selectedDefect.resolution}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Resolution Date</p>
                    <p>{selectedDefect.resolutionDate}</p>
                  </div>
                </>
              )}
              
              {/* Comments Section */}
              {selectedDefect.comments && selectedDefect.comments.length > 0 && (
                <div className="col-span-2 space-y-2 mt-2">
                  <h3 className="text-md font-medium">Comments</h3>
                  {selectedDefect.comments.map((comment: any, index: number) => (
                    <div key={index} className="rounded-md bg-muted p-2 space-y-1">
                      <div className="flex justify-between text-sm">
                        <p className="font-medium">{comment.author}</p>
                        <p className="text-muted-foreground">{comment.date}</p>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={closeDefectDetails}>
                Close
              </Button>
              {selectedDefect.status !== "Resolved" && (
                <Button>
                  Update Status
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Routine Details Modal */}
      {selectedRoutine && (
        <Dialog open={!!selectedRoutine} onOpenChange={() => closeRoutineDetails()}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Routine Inspection: {selectedRoutine.id}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Ship</p>
                <p className="flex items-center gap-1">
                  <Ship className="h-4 w-4 text-muted-foreground" />
                  {selectedRoutine.shipName}
                </p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Status</p>
                <Badge variant={
                  selectedRoutine.status === "Completed" ? "outline" : 
                  selectedRoutine.status === "In Progress" ? "default" : 
                  selectedRoutine.status === "Overdue" ? "destructive" : "secondary"
                }>
                  {selectedRoutine.status}
                </Badge>
              </div>
              
              <div className="space-y-1 col-span-2">
                <p className="text-sm font-medium">Title</p>
                <p className="font-medium text-lg">{selectedRoutine.title}</p>
              </div>
              
              <div className="space-y-1 col-span-2">
                <p className="text-sm font-medium">Description</p>
                <p className="text-sm">{selectedRoutine.description}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Frequency</p>
                <p>{selectedRoutine.frequency}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Scheduled Date</p>
                <p className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  {selectedRoutine.scheduledDate}
                </p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Assigned To</p>
                <p>{selectedRoutine.assignedTo}</p>
              </div>
              
              {selectedRoutine.lastCompleted && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Last Completed</p>
                  <p>{selectedRoutine.lastCompleted}</p>
                </div>
              )}
              
              <div className="space-y-1 col-span-2">
                <p className="text-sm font-medium">Completion Progress</p>
                <div className="flex items-center gap-2">
                  <Progress value={selectedRoutine.completionRate} className="h-2 flex-1" />
                  <span className="text-xs">{selectedRoutine.completionRate}%</span>
                </div>
              </div>
              
              {/* Checklist Items */}
              {selectedRoutine.checklistItems && selectedRoutine.checklistItems.length > 0 && (
                <div className="col-span-2 space-y-2 mt-2">
                  <h3 className="text-md font-medium">Inspection Checklist</h3>
                  <div className="rounded-md border p-2">
                    {selectedRoutine.checklistItems.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div className="flex items-center gap-2">
                          {item.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-gray-300" />
                          )}
                          <p className="text-sm">{item.task}</p>
                        </div>
                        <Badge variant={item.completed ? "outline" : "secondary"}>
                          {item.completed ? "Completed" : "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={closeRoutineDetails}>
                Close
              </Button>
              {selectedRoutine.status !== "Completed" && (
                <Button>
                  Update Progress
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
    </div>
  );
};

export default DefectsAndRoutine;
