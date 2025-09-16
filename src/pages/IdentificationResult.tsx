import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Phone, MessageCircle, MapPin, Heart } from "lucide-react";
import { Header } from "@/components/Header";
import { HandlerCard } from "@/components/HandlerCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data - replace with real API
const mockSnakeData = {
  "1": {
    name: "Indian Cobra",
    scientificName: "Naja naja",
    image: "https://images.unsplash.com/photo-1516728778615-2d590ea18ee2?w=500&h=300&fit=crop",
    dangerLevel: "extreme" as const,
    venomType: "Neurotoxic",
    traits: ["Black body with white spectacle marks", "Hood when threatened", "3-5 feet long"],
    habitat: "Agricultural areas, forests, grasslands",
    firstAid: [
      "Keep victim calm and still",
      "Remove jewelry and tight clothing",
      "Immobilize the affected limb",
      "Get to hospital IMMEDIATELY",
      "Do NOT cut, suck, or apply ice"
    ]
  }
};

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
    name: "Suresh Wildlife",
    phone: "+91-9876543211",
    location: "Whitefield",
    status: "busy" as const,
    experience: "8 years", 
    specialization: "Cobra specialist"
  }
];

const mockHospitals = [
  { name: "Victoria Hospital", location: "Fort Area", distance: "2.5 km", phone: "+91-80-26700447" },
  { name: "Manipal Hospital", location: "HAL Airport Road", distance: "5.2 km", phone: "+91-80-25024444" }
];

export default function IdentificationResult() {
  const { snakeId } = useParams();
  const navigate = useNavigate();
  
  const snake = mockSnakeData[snakeId as keyof typeof mockSnakeData];
  
  if (!snake) {
    return (
      <div className="min-h-screen bg-background">
        <Header showLanguageToggle={false} />
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Snake Not Found</h2>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const dangerColor = snake.dangerLevel === "extreme" ? "bg-destructive text-destructive-foreground" : 
                     snake.dangerLevel === "high" ? "bg-destructive text-destructive-foreground" :
                     snake.dangerLevel === "medium" ? "bg-warning text-warning-foreground" :
                     "bg-success text-success-foreground";

  return (
    <div className="min-h-screen bg-background">
      <Header showLanguageToggle={false} />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="shadow-medium">
            <CardContent className="p-0">
              <img 
                src={snake.image} 
                alt={snake.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-bold text-foreground">{snake.name}</h1>
                  <Badge className={dangerColor}>
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {snake.dangerLevel.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-muted-foreground italic">{snake.scientificName}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Snake Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium text-foreground mb-1">Venom Type</h4>
                  <p className="text-muted-foreground">{snake.venomType}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-foreground mb-2">Key Traits</h4>
                  <ul className="space-y-1">
                    {snake.traits.map((trait, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {trait}
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-foreground mb-1">Habitat</h4>
                  <p className="text-muted-foreground">{snake.habitat}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {snake.dangerLevel === "extreme" || snake.dangerLevel === "high" ? (
          <Card className="mb-6 border-destructive shadow-medium">
            <CardHeader>
              <CardTitle className="text-lg text-destructive flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Emergency First Aid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-destructive/10 p-4 rounded-lg mb-4">
                <p className="font-medium text-destructive mb-2">⚠️ VENOMOUS SNAKE - SEEK IMMEDIATE MEDICAL ATTENTION</p>
              </div>
              <ul className="space-y-2">
                {snake.firstAid.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ) : null}

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Nearest Hospitals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockHospitals.map((hospital, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">{hospital.name}</h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {hospital.location} • {hospital.distance}
                    </div>
                  </div>
                  <Button size="sm" onClick={() => window.location.href = `tel:${hospital.phone}`}>
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Snake Handlers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockHandlers.map(handler => (
                <HandlerCard key={handler.id} {...handler} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}