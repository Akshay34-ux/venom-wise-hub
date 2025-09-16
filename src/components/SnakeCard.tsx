import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Info } from "lucide-react";

interface SnakeCardProps {
  id: string;
  name: string;
  image: string;
  dangerLevel: "low" | "medium" | "high" | "extreme";
  venomType?: string;
  onClick?: (id: string) => void;
}

const dangerConfig = {
  low: { 
    color: "bg-success text-success-foreground", 
    icon: Shield,
    label: "Low Risk" 
  },
  medium: { 
    color: "bg-warning text-warning-foreground", 
    icon: Info,
    label: "Caution" 
  },
  high: { 
    color: "bg-destructive text-destructive-foreground", 
    icon: AlertTriangle,
    label: "Dangerous" 
  },
  extreme: { 
    color: "bg-destructive text-destructive-foreground", 
    icon: AlertTriangle,
    label: "Extremely Dangerous" 
  }
};

export const SnakeCard = ({ 
  id, 
  name, 
  image, 
  dangerLevel, 
  venomType,
  onClick 
}: SnakeCardProps) => {
  const config = dangerConfig[dangerLevel];
  const IconComponent = config.icon;

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-medium hover:scale-105 bg-card"
      onClick={() => onClick?.(id)}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={name}
            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <Badge className={config.color}>
              <IconComponent className="h-3 w-3 mr-1" />
              {config.label}
            </Badge>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-foreground mb-1">{name}</h3>
          {venomType && (
            <p className="text-sm text-muted-foreground">{venomType}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};