import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Ship, 
  SearchIcon, 
  Settings, 
  Plus, 
  FileText, 
  Download,
  Filter,
  ChevronDown,
  Layers,
  History,
  AlertTriangle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const shipFitData = [
  {
    id: "SFD-001",
    shipName: "INS Vikramaditya",
    class: "Aircraft Carrier",
    department: "Engineering",
    equipment: "Main Propulsion System",
    model: "GT-5700",
    manufacturer: "Bharat Heavy Electricals",
    installDate: "2013-11-16",
    lastMaintenance: "2023-06-12",
    status: "Operational",
    specifications: {
      weight: "5,200 kg",
      dimensions: "12m x 4m x 3m",
      power: "70,000 HP",
      fuelType: "Marine Diesel",
      coolingSystem: "Advanced Water Cooling",
      operatingTemp: "-10°C to 50°C"
    },
    maintenanceHistory: [
      { date: "2023-06-12", type: "Scheduled", description: "Regular maintenance and inspection", technician: "Lt. Cmdr. Sharma" },
      { date: "2022-12-15", type: "Corrective", description: "Fuel pump replacement", technician: "Chief Petty Officer Gupta" },
      { date: "2022-05-20", type: "Scheduled", description: "Full system overhaul", technician: "Engineering Team Alpha" }
    ],
    documents: [
      { name: "Technical Manual", type: "PDF", uploadDate: "2013-11-16" },
      { name: "Service Log", type: "PDF", uploadDate: "2023-06-15" },
      { name: "Troubleshooting Guide", type: "PDF", uploadDate: "2020-03-22" }
    ],
    componentHierarchy: [
      { name: "Propulsion Control System", status: "Operational", children: [
        { name: "Main Control Unit", status: "Operational" },
        { name: "Auxiliary Control System", status: "Operational" }
      ]},
      { name: "Turbine Assembly", status: "Operational", children: [
        { name: "Turbine Blades", status: "Operational" },
        { name: "Rotor Shaft", status: "Maintenance Required" }
      ]},
      { name: "Fuel Delivery System", status: "Operational", children: [
        { name: "Fuel Pumps", status: "Operational" },
        { name: "Fuel Lines", status: "Operational" },
        { name: "Fuel Filters", status: "Maintenance Required" }
      ]}
    ]
  },
  {
    id: "SFD-002",
    shipName: "INS Vikramaditya",
    class: "Aircraft Carrier",
    department: "Weapons",
    equipment: "CIWS",
    model: "AK-630",
    manufacturer: "Ordnance Factory Board",
    installDate: "2013-11-16",
    lastMaintenance: "2023-05-22",
    status: "Operational",
    specifications: {
      weight: "1,800 kg",
      dimensions: "3.2m x 2.1m x 1.9m",
      caliber: "30mm",
      firingRate: "5,000 rounds per minute",
      range: "3,000 meters",
      tracking: "Radar and optical"
    },
    maintenanceHistory: [
      { date: "2023-05-22", type: "Scheduled", description: "Barrel cleaning and system diagnostics", technician: "Weapons Specialist Singh" },
      { date: "2023-01-10", type: "Corrective", description: "Radar tracking system repair", technician: "Lt. Kumar" },
      { date: "2022-08-17", type: "Scheduled", description: "Annual maintenance", technician: "Weapons Team Bravo" }
    ],
    documents: [
      { name: "Operational Manual", type: "PDF", uploadDate: "2013-11-16" },
      { name: "Maintenance Protocol", type: "PDF", uploadDate: "2022-02-05" }
    ],
    componentHierarchy: [
      { name: "Weapon Mount", status: "Operational", children: [
        { name: "Rotation System", status: "Operational" },
        { name: "Elevation System", status: "Operational" }
      ]},
      { name: "Fire Control System", status: "Operational", children: [
        { name: "Radar Tracker", status: "Operational" },
        { name: "Optical Sight", status: "Operational" }
      ]},
      { name: "Ammunition Feed", status: "Operational", children: [
        { name: "Feed Mechanism", status: "Operational" },
        { name: "Ammo Storage", status: "Operational" }
      ]}
    ]
  },
  {
    id: "SFD-007",
    shipName: "INS Shivalik",
    class: "Frigate",
    department: "Engineering",
    equipment: "Integrated Platform Management System",
    model: "IPMS-9000",
    manufacturer: "Bharat Electronics Ltd",
    installDate: "2019-03-10",
    lastMaintenance: "2023-07-02",
    status: "Operational",
    specifications: {
      weight: "450 kg",
      dimensions: "2.5m x 1.8m x 0.9m",
      powerRequirement: "220V AC",
      interfaceType: "Digital Touch Interface",
      backupSystem: "Redundant Control Units",
      networkType: "Secure Ship Network"
    },
    maintenanceHistory: [
      { date: "2023-07-02", type: "Scheduled", description: "Software update and system check", technician: "IT Specialist Reddy" },
      { date: "2022-11-12", type: "Corrective", description: "Network interface card replacement", technician: "Engineer Patel" }
    ],
    documents: [
      { name: "System Architecture", type: "PDF", uploadDate: "2019-03-10" },
      { name: "Update History", type: "PDF", uploadDate: "2023-07-05" }
    ],
    componentHierarchy: [
      { name: "Main Control Server", status: "Operational", children: [
        { name: "Primary Server", status: "Operational" },
        { name: "Backup Server", status: "Operational" }
      ]},
      { name: "Control Stations", status: "Operational", children: [
        { name: "Bridge Station", status: "Operational" },
        { name: "Engineering Station", status: "Operational" },
        { name: "Damage Control Station", status: "Operational" }
      ]}
    ]
  },
  {
    id: "SFD-008",
    shipName: "INS Kochi",
    class: "Destroyer",
    department: "Communications",
    equipment: "Satellite Communication System",
    model: "SATCOM-500",
    manufacturer: "Bharat Electronics Ltd",
    installDate: "2020-05-18",
    lastMaintenance: "2023-06-30",
    status: "Operational",
    specifications: {
      weight: "380 kg",
      dimensions: "2.2m x 1.6m x 1.8m",
      frequency: "X-Band and Ka-Band",
      dataRate: "Up to 100 Mbps",
      encryption: "Military-grade AES-256",
      antennaType: "Stabilized Parabolic"
    },
    maintenanceHistory: [
      { date: "2023-06-30", type: "Scheduled", description: "Antenna alignment and signal testing", technician: "Comm Specialist Verma" },
      { date: "2022-12-18", type: "Corrective", description: "Waveguide replacement", technician: "Lt. Cmdr. Das" }
    ],
    documents: [
      { name: "Communication Protocols", type: "PDF", uploadDate: "2020-05-18" },
      { name: "Security Guidelines", type: "PDF", uploadDate: "2022-01-15" }
    ],
    componentHierarchy: [
      { name: "Antenna System", status: "Operational", children: [
        { name: "Main Dish", status: "Operational" },
        { name: "Positioning Motors", status: "Operational" }
      ]},
      { name: "Transceiver", status: "Operational", children: [
        { name: "RF Unit", status: "Operational" },
        { name: "Modem", status: "Operational" }
      ]},
      { name: "Encryption Module", status: "Operational", children: [
        { name: "Key Management", status: "Operational" },
        { name: "Cipher Engine", status: "Operational" }
      ]}
    ]
  }
];

const shipClasses = ["Aircraft Carrier", "Destroyer", "Frigate", "Corvette", "Submarine", "Patrol Vessel"];

const departments = ["Engineering", "Weapons", "Communications", "Navigation", "Medical", "Supply"];

interface EquipmentSpecifications {
  weight: string;
  dimensions: string;
  [key: string]: string;
}

interface MaintenanceRecord {
  date: string;
  type: string;
  description: string;
  technician: string;
}

interface Document {
  name: string;
  type: string;
  uploadDate: string;
}

interface ComponentNode {
  name: string;
  status: string;
  children?: ComponentNode[];
}

interface ShipEquipment {
  id: string;
  shipName: string;
  class: string;
  department: string;
  equipment: string;
  model: string;
  manufacturer: string;
  installDate: string;
  lastMaintenance: string;
  status: string;
  specifications?: EquipmentSpecifications;
  maintenanceHistory?: MaintenanceRecord[];
  documents?: Document[];
  componentHierarchy?: ComponentNode[];
}

const ShipFitDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShipClass, setSelectedShipClass] = useState<string | undefined>(undefined);
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>(undefined);
  const [filteredData, setFilteredData] = useState(shipFitData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<ShipEquipment | null>(null);
  const [newEquipment, setNewEquipment] = useState({
    shipName: "",
    class: "",
    department: "",
    equipment: "",
    model: "",
    manufacturer: "",
    installDate: "",
    status: "Operational"
  });

  const { toast } = useToast();

  const applyFilters = () => {
    const filtered = shipFitData.filter(item => {
      const matchesSearch = !searchTerm || 
        item.shipName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesShipClass = !selectedShipClass || item.class === selectedShipClass;
      const matchesDepartment = !selectedDepartment || item.department === selectedDepartment;
      
      return matchesSearch && matchesShipClass && matchesDepartment;
    });
    
    setFilteredData(filtered);
  };
  
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedShipClass(undefined);
    setSelectedDepartment(undefined);
    setFilteredData(shipFitData);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setTimeout(() => applyFilters(), 100);
  };
  
  const handleShipClassChange = (value: string) => {
    setSelectedShipClass(value);
    setTimeout(() => applyFilters(), 100);
  };
  
  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    setTimeout(() => applyFilters(), 100);
  };

  const handleEquipmentSelect = (equipment: ShipEquipment) => {
    setSelectedEquipment(equipment);
  };

  const handleNewEquipmentChange = (field: string, value: string) => {
    setNewEquipment({
      ...newEquipment,
      [field]: value
    });
  };

  const saveNewEquipment = () => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    if (!newEquipment.shipName || !newEquipment.equipment || !newEquipment.department) {
      toast({
        title: "Missing required fields",
        description: "Please fill all required fields marked with *",
        variant: "destructive",
      });
      return;
    }

    const newItem: ShipEquipment = {
      id: `SFD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      ...newEquipment,
      lastMaintenance: formattedDate,
      installDate: newEquipment.installDate || formattedDate,
      specifications: {
        weight: "N/A",
        dimensions: "N/A",
      },
      maintenanceHistory: [],
      documents: [],
      componentHierarchy: []
    };

    shipFitData.unshift(newItem);
    setFilteredData([newItem, ...filteredData]);
    
    setIsDialogOpen(false);
    toast({
      title: "Equipment added successfully",
      description: `${newEquipment.equipment} for ${newEquipment.shipName} has been added.`,
    });
    
    setNewEquipment({
      shipName: "",
      class: "",
      department: "",
      equipment: "",
      model: "",
      manufacturer: "",
      installDate: "",
      status: "Operational"
    });
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedShipClass, selectedDepartment]);

  const renderComponentHierarchy = (components?: ComponentNode[]) => {
    if (!components || components.length === 0) {
      return <p className="text-muted-foreground">No component data available.</p>;
    }

    return (
      <Accordion type="single" collapsible className="w-full">
        {components.map((component, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <span>{component.name}</span>
                <Badge variant={component.status === "Operational" ? "default" : "outline"}>
                  {component.status}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {component.children && component.children.length > 0 ? (
                <div className="pl-4 pt-2 border-l-2 border-gray-200">
                  {component.children.map((child, childIndex) => (
                    <div key={childIndex} className="mb-3">
                      <div className="flex items-center justify-between">
                        <span>{child.name}</span>
                        <Badge variant={child.status === "Operational" ? "default" : "outline"}>
                          {child.status}
                        </Badge>
                      </div>
                      {child.children && renderComponentHierarchy([child])}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No sub-components</p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Ship className="h-6 w-6 text-navy-600" />
          <h1 className="text-2xl font-bold text-navy-900">Ship Fit Details</h1>
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
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Equipment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Equipment</DialogTitle>
                <DialogDescription>
                  Enter the details of the new equipment to be added to the ship fit inventory.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="shipName" className="text-sm font-medium">
                    Ship Name *
                  </label>
                  <Input
                    id="shipName"
                    placeholder="Enter ship name"
                    value={newEquipment.shipName}
                    onChange={(e) => handleNewEquipmentChange("shipName", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="class" className="text-sm font-medium">
                    Ship Class *
                  </label>
                  <Select
                    value={newEquipment.class}
                    onValueChange={(value) => handleNewEquipmentChange("class", value)}
                  >
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {shipClasses.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="department" className="text-sm font-medium">
                    Department *
                  </label>
                  <Select
                    value={newEquipment.department}
                    onValueChange={(value) => handleNewEquipmentChange("department", value)}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="equipment" className="text-sm font-medium">
                    Equipment Name *
                  </label>
                  <Input
                    id="equipment"
                    placeholder="Enter equipment name"
                    value={newEquipment.equipment}
                    onChange={(e) => handleNewEquipmentChange("equipment", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="model" className="text-sm font-medium">
                    Model Number
                  </label>
                  <Input
                    id="model"
                    placeholder="Enter model number"
                    value={newEquipment.model}
                    onChange={(e) => handleNewEquipmentChange("model", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="manufacturer" className="text-sm font-medium">
                    Manufacturer
                  </label>
                  <Input
                    id="manufacturer"
                    placeholder="Enter manufacturer"
                    value={newEquipment.manufacturer}
                    onChange={(e) => handleNewEquipmentChange("manufacturer", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="installDate" className="text-sm font-medium">
                    Installation Date
                  </label>
                  <Input
                    id="installDate"
                    type="date"
                    value={newEquipment.installDate}
                    onChange={(e) => handleNewEquipmentChange("installDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm font-medium">
                    Status
                  </label>
                  <Select
                    value={newEquipment.status}
                    onValueChange={(value) => handleNewEquipmentChange("status", value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Operational">Operational</SelectItem>
                      <SelectItem value="Maintenance Required">Maintenance Required</SelectItem>
                      <SelectItem value="Non-Operational">Non-Operational</SelectItem>
                      <SelectItem value="Decommissioned">Decommissioned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveNewEquipment}>
                  Save Equipment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Ship Equipment Inventory</CardTitle>
          <CardDescription>
            View and manage detailed equipment inventory across the naval fleet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search by ship name, equipment or model..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedShipClass} onValueChange={handleShipClassChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ship Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {shipClasses.map((cls) => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
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
                  <TableHead>Ship Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Last Maintenance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.id} onClick={() => handleEquipmentSelect(item)} className="cursor-pointer">
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.shipName}</TableCell>
                      <TableCell>{item.class}</TableCell>
                      <TableCell>{item.department}</TableCell>
                      <TableCell>{item.equipment}</TableCell>
                      <TableCell>{item.model}</TableCell>
                      <TableCell>{item.lastMaintenance}</TableCell>
                      <TableCell>
                        <Badge variant={
                          item.status === "Operational" ? "default" : 
                          item.status === "Maintenance Required" ? "outline" : "destructive"
                        }>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                              <Settings className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEquipmentSelect(item)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                            <DropdownMenuItem>View History</DropdownMenuItem>
                            <DropdownMenuItem>Schedule Maintenance</DropdownMenuItem>
                            <DropdownMenuItem>Generate Report</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                      No equipment found matching the current filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Equipment Details</CardTitle>
          <CardDescription>
            {selectedEquipment ? `Detailed information for ${selectedEquipment.equipment}` : "Select an equipment from the table above to view details"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="specifications">
            <TabsList>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="hierarchy">Component Hierarchy</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance History</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specifications" className="pt-4">
              {selectedEquipment && selectedEquipment.specifications ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(selectedEquipment.specifications).map(([key, value]) => (
                    <div key={key} className="border rounded p-3">
                      <div className="text-sm text-muted-foreground capitalize">{key}</div>
                      <div className="font-medium">{value}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Select an equipment from the table above to view detailed specifications.
                </p>
              )}
            </TabsContent>

            <TabsContent value="hierarchy" className="pt-4">
              {selectedEquipment ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Component Structure</h3>
                  </div>
                  {renderComponentHierarchy(selectedEquipment.componentHierarchy)}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Select an equipment to view component hierarchy.
                </p>
              )}
            </TabsContent>
            
            <TabsContent value="maintenance" className="pt-4">
              {selectedEquipment && selectedEquipment.maintenanceHistory && selectedEquipment.maintenanceHistory.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <History className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Maintenance Log</h3>
                  </div>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Technician</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedEquipment.maintenanceHistory.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell>{record.date}</TableCell>
                            <TableCell>
                              <Badge variant={record.type === "Scheduled" ? "default" : "secondary"}>
                                {record.type}
                              </Badge>
                            </TableCell>
                            <TableCell>{record.description}</TableCell>
                            <TableCell>{record.technician}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <History className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    No maintenance history available for this equipment.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="documents" className="pt-4">
              {selectedEquipment && selectedEquipment.documents && selectedEquipment.documents.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Documentation</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedEquipment.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between border rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-blue-500" />
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-xs text-muted-foreground">Uploaded: {doc.uploadDate}</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    No documents available for this equipment.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-yellow-50 border-b border-yellow-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-yellow-800">Safety Information</CardTitle>
          </div>
          <CardDescription>
            Important safety notices and handling procedures for ship equipment
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {selectedEquipment ? (
            <div className="space-y-3">
              <h3 className="font-medium text-lg">Safety Guidelines for {selectedEquipment.equipment}</h3>
              <p>All maintenance personnel must adhere to standard safety protocols when working with this equipment.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Always wear appropriate PPE when handling components.</li>
                <li>Follow lockout/tagout procedures before beginning maintenance.</li>
                <li>Consult the manufacturer's safety manual before disassembly.</li>
                <li>Report any safety concerns immediately to the department lead.</li>
              </ul>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Select equipment to view safety guidelines and warnings.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipFitDetails;
