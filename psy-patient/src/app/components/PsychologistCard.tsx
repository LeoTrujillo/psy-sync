import { Card, CardContent, CardFooter } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { MapPin, Star, Calendar, DollarSign } from "lucide-react";

interface PsychologistCardProps {
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: string;
  image: {src: string};
  experience: string;
  availability: string;
  specialties: string[];
}

const PsychologistCard = ({ 
  name, 
  specialty, 
  location, 
  rating, 
  reviewCount, 
  price, 
  image, 
  experience, 
  availability,
  specialties 
}: PsychologistCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border hover:border-primary/20 h-full flex flex-col">
      <CardContent className="p-6 flex-grow">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative">
            <img 
              src={image.src} 
              alt={name}
              className="w-24 h-24 md:w-20 md:h-20 rounded-full object-cover border-2 border-primary/10"
            />
            <div className="absolute -bottom-1 -right-1 bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
              {availability}
            </div>
          </div>
          
          <div className="flex-1 min-w-0 text-center md:text-left">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-primary font-medium">{specialty}</p>
            
            <div className="flex items-center justify-center md:justify-start mt-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </div>
            
            <div className="flex items-center justify-center md:justify-start mt-1">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-warning fill-current" />
                <span className="ml-1 font-medium">{rating}</span>
                <span className="text-muted-foreground text-sm ml-1">
                  ({reviewCount} reseñas)
                </span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mt-2">{experience} años de experiencia</p>
          </div>
          
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end text-primary font-semibold">
              <DollarSign className="w-4 h-4" />
              {price}
            </div>
            <p className="text-xs text-muted-foreground">por sesión</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {specialties.slice(0, 3).map((spec, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {spec}
              </Badge>
            ))}
            {specialties.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{specialties.length - 3} más
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 pb-6 pt-0 mt-auto">
        <div className="flex w-full space-x-3">
          <Button variant="outline" className="flex-1">
            Ver Perfil
          </Button>
          <Button className="flex-1">
            <Calendar className="w-4 h-4 mr-2" />
            Agendar Cita
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PsychologistCard;