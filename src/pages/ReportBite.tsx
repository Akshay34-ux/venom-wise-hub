import { useState, useEffect } from "react";
import { MapPin, Phone, MessageCircle, AlertTriangle, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { HandlerCard } from "@/components/HandlerCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const mockHandlers = [
  {
    id: "1",
    name: "Emergency Snake Response",
    phone: "+91-9876543210",
    location: "Bangalore Central", 
    status: "available" as const,
    experience: "24/7 Emergency",
    specialization: "Bite rescue specialist"
  },
  {
    id: "2", 
    name: "Dr. Suresh Wildlife",
    phone: "+91-9876543211",
    location: "Nearby Area",
    status: "available" as const,
    experience: "15 years",
    specialization: "Venom treatment"
  }
];

const mockHospitals = [
  { name: "Victoria Hospital Emergency", location: "Fort Area", distance: "2.5 km", phone: "+91-80-26700447" },
  { name: "Manipal Hospital ER", location: "HAL Airport Road", distance: "5.2 km", phone: "+91-80-25024444" },
  { name: "Apollo Hospital", location: "Bannerghatta Road", distance: "8.1 km", phone: "+91-80-26304050" }
];

export default function ReportBite() {
  const [formData, setFormData] = useState({
    victimName: "",
    age: "",
    symptoms: "",
    timeOfBite: "",
    location: ""
  });
  const [gpsLocation, setGpsLocation] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Auto-capture GPS location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setGpsLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          setGpsLocation("Location not available");
        }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Emergency Report Submitted",
      description: "Help is on the way. Emergency contacts have been notified.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header showLanguageToggle={false} title="Emergency Response" />
        
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <Card className="mb-6 border-success shadow-medium">
            <CardHeader>
              <CardTitle className="text-lg text-success flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Emergency Report Submitted Successfully
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Your emergency report has been submitted. Emergency responders have been notified of your location.
              </p>
              <div className="bg-success/10 p-4 rounded-lg">
                <p className="font-medium text-success">
                  📍 Location: {gpsLocation || "GPS coordinates captured"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Report ID: EMR-{Date.now()}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg text-destructive">Emergency Hospitals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockHospitals.map((hospital, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">{hospital.name}</h4>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {hospital.location} • {hospital.distance}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="destructive" onClick={() => window.location.href = `tel:${hospital.phone}`}>
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Emergency Snake Handlers</CardTitle>
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

  return (
    <div className="min-h-screen bg-background">
      <Header showLanguageToggle={false} title="Report Snake Bite" tagline="Emergency Response" />
      
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Card className="border-destructive shadow-medium">
          <CardHeader>
            <CardTitle className="text-lg text-destructive flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Emergency Snake Bite Report
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Fill out this form quickly. Emergency help will be dispatched immediately.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="victimName">Victim Name *</Label>
                  <Input
                    id="victimName"
                    value={formData.victimName}
                    onChange={(e) => handleInputChange("victimName", e.target.value)}
                    required
                    placeholder="Enter full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    required
                    placeholder="Enter age"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeOfBite">Time of Bite *</Label>
                <Select onValueChange={(value) => handleInputChange("timeOfBite", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="When did the bite occur?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="just-now">Just now (0-5 minutes)</SelectItem>
                    <SelectItem value="5-15-min">5-15 minutes ago</SelectItem>
                    <SelectItem value="15-30-min">15-30 minutes ago</SelectItem>
                    <SelectItem value="30-60-min">30-60 minutes ago</SelectItem>
                    <SelectItem value="1-hour-plus">Over 1 hour ago</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Current Symptoms</Label>
                <Textarea
                  id="symptoms"
                  value={formData.symptoms}
                  onChange={(e) => handleInputChange("symptoms", e.target.value)}
                  placeholder="Describe any pain, swelling, numbness, difficulty breathing, etc."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Additional Location Details</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Landmark, building name, etc."
                />
              </div>

              <div className="bg-accent/50 p-3 rounded-lg">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium">GPS Location: </span>
                  <span className="text-muted-foreground ml-1">
                    {gpsLocation || "Capturing location..."}
                  </span>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90">
                <Clock className="h-4 w-4 mr-2" />
                Submit Emergency Report
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}