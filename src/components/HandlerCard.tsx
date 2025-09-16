import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, User, MapPin } from "lucide-react";

interface HandlerCardProps {
  id: string;
  name: string;
  phone: string;
  location: string;
  status: "available" | "busy" | "unavailable";
  experience?: string;
  specialization?: string;
}

const statusConfig = {
  available: { 
    color: "bg-success text-success-foreground", 
    label: "Available" 
  },
  busy: { 
    color: "bg-warning text-warning-foreground", 
    label: "Busy" 
  },
  unavailable: { 
    color: "bg-muted text-muted-foreground", 
    label: "Unavailable" 
  }
};

export const HandlerCard = ({
  name,
  phone,
  location,
  status,
  experience,
  specialization
}: HandlerCardProps) => {
  const config = statusConfig[status];

  const handleCall = () => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank');
  };

  return (
    <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="bg-accent p-2 rounded-full">
              <User className="h-4 w-4 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{name}</h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {location}
              </div>
            </div>
          </div>
          <Badge className={config.color}>
            {config.label}
          </Badge>
        </div>

        {experience && (
          <p className="text-sm text-muted-foreground mb-1">
            Experience: {experience}
          </p>
        )}
        
        {specialization && (
          <p className="text-sm text-muted-foreground mb-3">
            Specialization: {specialization}
          </p>
        )}

        <div className="flex space-x-2">
          <Button 
            variant="default" 
            size="sm"
            onClick={handleCall}
            disabled={status === 'unavailable'}
            className="flex-1"
          >
            <Phone className="h-3 w-3 mr-1" />
            Call
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleWhatsApp}
            disabled={status === 'unavailable'}
            className="flex-1"
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            WhatsApp
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};