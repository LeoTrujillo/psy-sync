import { Button } from "@/components/ui/button";
import { Search, Shield, Clock, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary-light via-accent to-secondary-light py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Tu bienestar mental es nuestra
            <span className="text-secondary"> prioridad</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Conecta con psicólogos profesionales certificados. Agenda tu cita de manera fácil y segura, 
            desde la comodidad de tu hogar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-3">
              <Search className="w-5 h-5 mr-2" />
              Buscar Psicólogos
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Soy Profesional
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary p-4 rounded-full mb-4">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Profesionales Certificados</h3>
              <p className="text-muted-foreground">Todos nuestros psicólogos están verificados y certificados</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-secondary p-4 rounded-full mb-4">
                <Clock className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Agenda Flexible</h3>
              <p className="text-muted-foreground">Horarios disponibles 7 días a la semana</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary p-4 rounded-full mb-4">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Atención Personalizada</h3>
              <p className="text-muted-foreground">Encuentra el especialista perfecto para tus necesidades</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;