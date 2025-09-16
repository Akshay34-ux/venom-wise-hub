import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, AlertTriangle, Users, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { HandlerCard } from "@/components/HandlerCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Mock data
const mockHandlers = [
  {
    id: "1",
    name: "Rajesh Kumar",
    phone: "+91-9876543210",
    location: "Bangalore Central",
    status: "available" as const,
    experience: "15 years",
    specialization: "Venomous snakes"
  },
  {
    id: "2",
    name: "Suresh Wildlife Rescue",
    phone: "+91-9876543211", 
    location: "Whitefield",
    status: "busy" as const,
    experience: "8 years",
    specialization: "Cobra specialist"
  },
  {
    id: "3",
    name: "Karnataka Forest Dept",
    phone: "+91-9876543212",
    location: "HSR Layout",
    status: "available" as const,
    experience: "Government service",
    specialization: "All species"
  },
  {
    id: "4",
    name: "Wildlife SOS",
    phone: "+91-9876543213",
    location: "Marathahalli",
    status: "unavailable" as const,
    experience: "10 years",
    specialization: "Rescue & relocation"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Simulate identification process
      setTimeout(() => {
        navigate("/identify/1"); // Mock navigation to identified snake
      }, 1500);
    }
  };

  const handleCameraCapture = () => {
    // In a real app, this would open the camera
    navigate("/identify/1"); // Mock navigation
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-gradient-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Safe with VenomVision
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Instantly identify snakes, access emergency help, and learn life-saving safety practices. 
            Your pocket-sized snake safety expert.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Main Action Card */}
        <Card className="mb-8 shadow-strong border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground mb-2">
              Identify Snake Species
            </CardTitle>
            <p className="text-muted-foreground">
              Capture or upload a clear photo of the snake for instant identification
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button 
                size="lg" 
                onClick={handleCameraCapture}
                className="h-16 bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                <Camera className="h-6 w-6 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Capture Photo</div>
                  <div className="text-sm opacity-90">Use camera</div>
                </div>
              </Button>
              
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-16 w-full border-2 border-primary/30 hover:border-primary/50"
                  asChild
                >
                  <span className="cursor-pointer">
                    <Upload className="h-6 w-6 mr-3" />
                    <div className="text-left">
                      <div className="font-semibold">Upload Photo</div>
                      <div className="text-sm text-muted-foreground">From gallery</div>
                    </div>
                  </span>
                </Button>
              </label>
            </div>

            {imageFile && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center text-primary">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                  Analyzing image...
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card 
            className="cursor-pointer hover:shadow-medium transition-shadow border-destructive/20"
            onClick={() => navigate("/report-bite")}
          >
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-destructive p-3 rounded-lg mr-4">
                  <AlertTriangle className="h-6 w-6 text-destructive-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Report Snake Bite</h3>
                  <p className="text-sm text-muted-foreground">Emergency response & first aid</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-medium transition-shadow border-primary/20"
            onClick={() => navigate("/knowledge-hub")}
          >
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-primary p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Knowledge Hub</h3>
                  <p className="text-sm text-muted-foreground">Learn & bust myths</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Snake Handlers Section */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Available Snake Handlers
            </CardTitle>
            <p className="text-muted-foreground">
              Connect with certified snake handlers in your area
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {mockHandlers.map(handler => (
                <HandlerCard key={handler.id} {...handler} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
