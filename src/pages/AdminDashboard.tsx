import { useState } from "react";
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Database, 
  Users, 
  Building2, 
  BookOpen, 
  HelpCircle,
  Plus,
  Edit,
  Trash2,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sidebarItems = [
  { title: "Snakes", url: "snakes", icon: Database },
  { title: "Handlers", url: "handlers", icon: Users },
  { title: "Hospitals", url: "hospitals", icon: Building2 },
  { title: "Snake Info", url: "snake-info", icon: BookOpen },
  { title: "Myths", url: "myths", icon: HelpCircle },
  { title: "Settings", url: "settings", icon: Settings },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("snakes");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { toast } = useToast();

  const handleSave = (section: string) => {
    toast({
      title: "Success",
      description: `${section} data saved successfully`,
    });
  };

  const renderContent = () => {
    switch (activeSection) {
      case "snakes":
        return <SnakesSection onSave={() => handleSave("Snake")} />;
      case "handlers":
        return <HandlersSection onSave={() => handleSave("Handler")} />;
      case "hospitals":
        return <HospitalsSection onSave={() => handleSave("Hospital")} />;
      case "snake-info":
        return <SnakeInfoSection onSave={() => handleSave("Snake Info")} />;
      case "myths":
        return <MythsSection onSave={() => handleSave("Myth")} />;
      case "settings":
        return <SettingsSection onSave={() => handleSave("Settings")} />;
      default:
        return <SnakesSection onSave={() => handleSave("Snake")} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className={`${isCollapsed ? "w-14" : "w-64"} border-r border-border`} collapsible="icon">
          <SidebarTrigger 
            className="m-2 self-end" 
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
          
          <SidebarContent>
            <div className="p-4 border-b border-border">
              {!isCollapsed && (
                <h2 className="text-lg font-bold text-foreground">VenomVision Admin</h2>
              )}
            </div>
            
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        onClick={() => setActiveSection(item.url)}
                        className={`${activeSection === item.url ? "bg-accent text-accent-foreground" : ""}`}
                      >
                        <item.icon className="h-4 w-4 mr-2" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

function SnakesSection({ onSave }: { onSave: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Manage Snakes</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Snake
        </Button>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Add New Snake</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="snakeName">Snake Name</Label>
              <Input id="snakeName" placeholder="e.g., Indian Cobra" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scientificName">Scientific Name</Label>
              <Input id="scientificName" placeholder="e.g., Naja naja" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="snakeImage">Snake Image URL</Label>
            <Input id="snakeImage" placeholder="https://..." />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dangerLevel">Danger Level</Label>
              <select className="w-full p-2 border border-input rounded-md bg-background">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="extreme">Extreme</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="venomType">Venom Type</Label>
              <Input id="venomType" placeholder="e.g., Neurotoxic" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="traits">Key Traits (one per line)</Label>
            <Textarea id="traits" placeholder="Black body with white spectacle marks&#10;Hood when threatened&#10;3-5 feet long" rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="habitat">Habitat</Label>
            <Textarea id="habitat" placeholder="Agricultural areas, forests, grasslands" rows={2} />
          </div>

          <Button onClick={onSave} className="w-full">
            Save Snake Information
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function HandlersSection({ onSave }: { onSave: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Manage Snake Handlers</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Handler
        </Button>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Add New Handler</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="handlerName">Handler Name</Label>
              <Input id="handlerName" placeholder="e.g., Rajesh Kumar" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="handlerPhone">Phone Number</Label>
              <Input id="handlerPhone" placeholder="+91-9876543210" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="handlerLocation">Location</Label>
              <Input id="handlerLocation" placeholder="e.g., Bangalore Central" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="handlerStatus">Status</Label>
              <select className="w-full p-2 border border-input rounded-md bg-background">
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Input id="experience" placeholder="e.g., 15 years" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input id="specialization" placeholder="e.g., Venomous snakes" />
            </div>
          </div>

          <Button onClick={onSave} className="w-full">
            Save Handler Information
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function HospitalsSection({ onSave }: { onSave: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Manage Hospitals</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Hospital
        </Button>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Add New Hospital</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hospitalName">Hospital Name</Label>
              <Input id="hospitalName" placeholder="e.g., Victoria Hospital" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hospitalPhone">Emergency Phone</Label>
              <Input id="hospitalPhone" placeholder="+91-80-26700447" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hospitalLocation">Location</Label>
            <Input id="hospitalLocation" placeholder="e.g., Fort Area, Bangalore" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input id="latitude" placeholder="12.9716" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input id="longitude" placeholder="77.5946" />
            </div>
          </div>

          <Button onClick={onSave} className="w-full">
            Save Hospital Information
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function SnakeInfoSection({ onSave }: { onSave: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Manage Snake Information</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Information
        </Button>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Add Snake Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="infoTitle">Information Title</Label>
            <Input id="infoTitle" placeholder="e.g., First Aid for Snake Bites" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="infoContent">Content</Label>
            <Textarea 
              id="infoContent" 
              placeholder="Detailed information content..." 
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select className="w-full p-2 border border-input rounded-md bg-background">
              <option value="first-aid">First Aid</option>
              <option value="prevention">Prevention</option>
              <option value="identification">Identification</option>
              <option value="behavior">Snake Behavior</option>
            </select>
          </div>

          <Button onClick={onSave} className="w-full">
            Save Information
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function MythsSection({ onSave }: { onSave: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Manage Myths & Facts</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Myth
        </Button>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Add New Myth & Truth</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="myth">❌ Myth</Label>
            <Textarea 
              id="myth" 
              placeholder="Enter the common myth or misconception..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="truth">✅ Truth</Label>
            <Textarea 
              id="truth" 
              placeholder="Enter the factual correction with scientific backing..."
              rows={4}
            />
          </div>

          <Button onClick={onSave} className="w-full">
            Save Myth & Truth
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsSection({ onSave }: { onSave: () => void }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">System Settings</h1>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="appName">Application Name</Label>
            <Input id="appName" defaultValue="VenomVision" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyNumber">Emergency Contact Number</Label>
            <Input id="emergencyNumber" defaultValue="108" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxHandlers">Max Handlers to Display</Label>
            <Input id="maxHandlers" type="number" defaultValue="5" />
          </div>

          <Button onClick={onSave} className="w-full">
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}