import { useState } from "react";
import { Header } from "@/components/Header";
import { SnakeCard } from "@/components/SnakeCard";
import { SearchBar } from "@/components/SearchBar";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, CheckCircle } from "lucide-react";

// Mock data
const mockSnakes = [
  {
    id: "1",
    name: "Indian Cobra",
    image: "https://images.unsplash.com/photo-1516728778615-2d590ea18ee2?w=300&h=200&fit=crop",
    dangerLevel: "extreme" as const,
    venomType: "Neurotoxic"
  },
  {
    id: "2", 
    name: "Russell's Viper",
    image: "https://images.unsplash.com/photo-1603662857013-adcb4c2f8e85?w=300&h=200&fit=crop",
    dangerLevel: "high" as const,
    venomType: "Hemotoxic"
  },
  {
    id: "3",
    name: "Indian Python", 
    image: "https://images.unsplash.com/photo-1544535323e02-1fab9b84b42a?w=300&h=200&fit=crop",
    dangerLevel: "low" as const,
    venomType: "Non-venomous"
  },
  {
    id: "4",
    name: "Common Krait",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop", 
    dangerLevel: "extreme" as const,
    venomType: "Neurotoxic"
  },
  {
    id: "5",
    name: "Rat Snake",
    image: "https://images.unsplash.com/photo-1544835796-1f40ad6e53c6?w=300&h=200&fit=crop",
    dangerLevel: "low" as const,
    venomType: "Non-venomous"
  },
  {
    id: "6",
    name: "Bamboo Pit Viper", 
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    dangerLevel: "medium" as const,
    venomType: "Hemotoxic"
  }
];

const mythBusters = [
  {
    id: "1",
    myth: "All snakes are dangerous and should be killed",
    truth: "Most snakes are harmless and play a vital role in controlling rodent populations. Only about 15% of snake species in India are venomous."
  },
  {
    id: "2", 
    myth: "Snakes drink milk and are attracted to it",
    truth: "Snakes are lactose intolerant and cannot digest milk. This is a complete myth popularized by movies and folklore."
  },
  {
    id: "3",
    myth: "Snake charmers' snakes have their fangs removed", 
    truth: "While some unethical practices exist, many snake charmers work with non-venomous species. However, the practice is harmful to snakes and should be discouraged."
  },
  {
    id: "4",
    myth: "Cutting and sucking venom from a bite helps",
    truth: "This is extremely dangerous and can cause more harm. It can introduce bacteria and spread venom. Only antivenom at a hospital can neutralize snake venom."
  },
  {
    id: "5", 
    myth: "Snakes chase humans to attack them",
    truth: "Snakes are naturally afraid of humans and will only attack when threatened or cornered. They prefer to flee rather than fight."
  },
  {
    id: "6",
    myth: "Baby snakes are more venomous than adults",
    truth: "While baby snakes may inject more venom proportionally, adult snakes deliver much larger amounts of venom and are generally more dangerous."
  }
];

export default function KnowledgeHub() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSnakes = mockSnakes.filter(snake =>
    snake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    snake.venomType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMyths = mythBusters.filter(myth =>
    myth.myth.toLowerCase().includes(searchTerm.toLowerCase()) ||
    myth.truth.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Knowledge Hub" 
        tagline="Learn. Stay Safe. Respect Snakes."
      />
      
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="mb-8">
          <SearchBar
            placeholder="Search snakes or myths..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>

        {/* Snake Information Section */}
        <section className="mb-12">
          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Snake Information</CardTitle>
              <p className="text-muted-foreground">
                Learn about different snake species, their characteristics, and safety information.
              </p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSnakes.map(snake => (
              <SnakeCard
                key={snake.id}
                {...snake}
                onClick={(id) => {
                  // Navigate to detailed snake info or show modal
                  console.log(`Show details for snake ${id}`);
                }}
              />
            ))}
          </div>

          {filteredSnakes.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No snakes found matching "{searchTerm}"</p>
            </div>
          )}
        </section>

        {/* Myth Busters Section */}
        <section>
          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Myth Busters</CardTitle>
              <p className="text-muted-foreground">
                Separate fact from fiction with science-based information about snakes.
              </p>
            </CardHeader>
          </Card>

          <Card className="shadow-medium">
            <CardContent className="p-6">
              <Accordion type="multiple" className="space-y-2">
                {filteredMyths.map(item => (
                  <AccordionItem key={item.id} value={item.id} className="border border-border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-start space-x-3 text-left">
                        <X className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                        <div>
                          <Badge variant="destructive" className="mb-2">Myth</Badge>
                          <p className="text-foreground">{item.myth}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                        <div>
                          <Badge className="bg-success text-success-foreground mb-2">Truth</Badge>
                          <p className="text-muted-foreground">{item.truth}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredMyths.length === 0 && searchTerm && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No myths found matching "{searchTerm}"</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}