import { Button } from "@/app/components/ui/button";
import { Heart, UserPlus, LogIn } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-lg">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">PsySync</h1>
              <p className="text-xs text-muted-foreground">Conectando mentes, sanando vidas</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#psicologos" className="text-foreground hover:text-primary transition-colors">
              Psicólogos
            </a>
            <a href="#como-funciona" className="text-foreground hover:text-primary transition-colors">
              Cómo funciona
            </a>
            <a href="#contacto" className="text-foreground hover:text-primary transition-colors">
              Contacto
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <UserPlus className="w-4 h-4 mr-2" />
              Soy Psicólogo
            </Button>
            <Button size="sm">
              <LogIn className="w-4 h-4 mr-2" />
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;