
import { useState } from "react";
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
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

// Sample ship fit data
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
    status: "Operational"
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
    status: "Operational"
  },
  {
    id: "SFD-003",
    shipName: "INS Vikrant",
    class: "Aircraft Carrier",
    department: "Communications",
    equipment: "Integrated Bridge System",
    model: "NCS-30",
    manufacturer: "Bharat Electronics Ltd",
    installDate: "2022-09-02",
    lastMaintenance: "2023-07-15",
    status: "Operational"
  },
  {
    id: "SFD-004",
    shipName: "INS Chennai",
    class: "Destroyer",
    department: "Weapons",
    equipment: "Surface-to-Air Missile System",
    model: "Barak-8",
    manufacturer: "DRDO/IAI",
    installDate: "2016-11-21",
    lastMaintenance: "2023-04-18",
    status: "Maintenance Required"
  },
  {
    id: "SFD-005",
    shipName: "INS Kolkata",
    class: "Destroyer",
    department: "Engineering",
    equipment: "Gas Turbine Engine",
    model: "LM2500",
    manufacturer: "General Electric",
    installDate: "2014-08-16",
    lastMaintenance: "2023-02-10",
    status: "Operational"
  },
  {
    id: "SFD-006",
    shipName: "INS Kamorta",
    class: "Corvette",
    department: "Navigation",
    equipment: "Radar System",
    model: "Revathi",
    manufacturer: "Bharat Electronics Ltd",
    installDate: "2014-08-23",
    lastMaintenance: "2023-05-30",
    status: "Maintenance Required"
  }
];

// Sample ship classes
const shipClasses = ["Aircraft Carrier", "Destroyer", "Frigate", "Corvette", "Submarine", "Patrol Vessel"];

// Sample departments
const departments = ["Engineering", "Weapons", "Communications", "Navigation", "Medical", "Supply"];

const ShipFitDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShipClass, setSelectedShipClass] = useState<string | undefined>(undefined);
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>(undefined);
  const [filteredData, setFilteredData] = useState(shipFitData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  // Filter function
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
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedShipClass(undefined);
    setSelectedDepartment(undefined);
    setFilteredData(shipFitData);
  };
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    applyFilters();
  };
  
  // Handle ship class change
  const handleShipClassChange = (value: string) => {
    setSelectedShipClass(value);
    setTimeout(applyFilters, 100);
  };
  
  // Handle department change
  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    setTimeout(applyFilters, 100);
  };

  // Handle new equipment form
  const handleNewEquipmentChange = (field: string, value: string) => {
    setNewEquipment({
      ...newEquipment,
      [field]: value
    });
  };

  // Save new equipment
  const saveNewEquipment = () => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    // Form validation (basic)
    if (!newEquipment.shipName || !newEquipment.equipment || !newEquipment.department) {
      toast({
        title: "Missing required fields",
        description: "Please fill all required fields marked with *",
        variant: "destructive",
      });
      return;
    }

    // We would normally send this to the backend
    const newItem = {
      id: `SFD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      ...newEquipment,
      lastMaintenance: formattedDate,
      installDate: newEquipment.installDate || formattedDate
    };

    // Add to the list (in a real app, this would be an API call)
    shipFitData.unshift(newItem);
    setFilteredData([newItem, ...filteredData]);
    
    // Close dialog and show success message
    setIsDialogOpen(false);
    toast({
      title: "Equipment added successfully",
      description: `${newEquipment.equipment} for ${newEquipment.shipName} has been added.`,
    });
    
    // Reset form
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
                  <SelectItem value="">All Classes</SelectItem>
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
                  <SelectItem value="">All Departments</SelectItem>
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
          
          <div className="rounded-md border">
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
                    <TableRow key={item.id}>
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
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
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
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="specifications">
            <TabsList>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance History</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="specifications" className="pt-4">
              <p className="text-muted-foreground mb-4">
                Select an equipment from the table above to view detailed specifications.
              </p>
            </TabsContent>
            <TabsContent value="maintenance" className="pt-4">
              <p className="text-muted-foreground mb-4">
                Maintenance records will appear here when an equipment is selected.
              </p>
            </TabsContent>
            <TabsContent value="documents" className="pt-4">
              <p className="text-muted-foreground mb-4">
                Technical documentation and manuals related to the selected equipment.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipFitDetails;
