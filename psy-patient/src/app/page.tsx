import Image from "next/image";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PsychologistCard from "@/components/PsychologistCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, MapPin } from "lucide-react";
import psychologist1 from "../assets/psychologist-1.jpg";
import psychologist2 from "../assets/psychologist-2.jpg";
import psychologist3 from "../assets/psychologist-3.jpg";


const psychologists = [
  {
    id: 1,
    name: "Dra. María González",
    specialty: "Psicología Clínica",
    location: "Ciudad de México",
    rating: 4.9,
    reviewCount: 127,
    price: "800",
    image: psychologist1,
    experience: "8",
    availability: "Disponible",
    specialties: ["Ansiedad", "Depresión", "Terapia de Pareja", "Trauma"]
  },
  {
    id: 2,
    name: "Dr. Carlos Rodríguez",
    specialty: "Neuropsicología",
    location: "Guadalajara",
    rating: 4.8,
    reviewCount: 93,
    price: "900",
    image: psychologist2,
    experience: "12",
    availability: "Disponible",
    specialties: ["TDAH", "Autismo", "Rehabilitación", "Evaluación Cognitiva"]
  },
  {
    id: 3,
    name: "Dra. Ana Martínez",
    specialty: "Psicología Infantil",
    location: "Monterrey",
    rating: 4.9,
    reviewCount: 156,
    price: "750",
    image: psychologist3,
    experience: "6",
    availability: "Disponible",
    specialties: ["Niños", "Adolescentes", "Problemas de Conducta", "Desarrollo"]
  },
  {
    id: 4,
    name: "Dr. Luis Hernández",
    specialty: "Psicoterapia",
    location: "Puebla",
    rating: 4.7,
    reviewCount: 82,
    price: "700",
    image: psychologist2,
    experience: "10",
    availability: "Ocupado",
    specialties: ["Adicciones", "Duelo", "Autoestima", "Estrés"]
  },
  {
    id: 5,
    name: "Dra. Patricia López",
    specialty: "Psicología Organizacional",
    location: "Tijuana",
    rating: 4.8,
    reviewCount: 64,
    price: "850",
    image: psychologist1,
    experience: "9",
    availability: "Disponible",
    specialties: ["Burnout", "Liderazgo", "Clima Laboral", "Coaching"]
  },
  {
    id: 6,
    name: "Dr. Roberto Silva",
    specialty: "Terapia Familiar",
    location: "Mérida",
    rating: 4.9,
    reviewCount: 134,
    price: "$950",
    image: psychologist2,
    experience: "15",
    availability: "Disponible",
    specialties: ["Familia", "Adolescentes", "Comunicación", "Resolución de Conflictos"]
  }
];


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Sección de búsqueda y filtros */}
      <section className="py-12 bg-muted/30" id="psicologos">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">
              Encuentra tu Psicólogo Ideal
            </h2>
            
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  placeholder="Buscar por especialidad, nombre o problema..."
                  className="pl-10 h-12"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  placeholder="Ciudad"
                  className="pl-10 h-12 md:w-48"
                />
              </div>
              
              <Button variant="outline" className="h-12 px-6">
                <Filter className="w-5 h-5 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de psicólogos */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Psicólogos Disponibles
                </h3>
                <p className="text-muted-foreground mt-1">
                  {psychologists.length} profesionales encontrados
                </p>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Ordenar por:</span>
                <Button variant="ghost" size="sm">Mejor calificados</Button>
                <Button variant="ghost" size="sm">Precio</Button>
                <Button variant="ghost" size="sm">Disponibilidad</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {psychologists.map((psychologist) => (
                <PsychologistCard key={psychologist.id} {...psychologist} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Cargar más psicólogos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold text-lg mb-4">PsySync</h4>
                <p className="text-sm opacity-90">
                  Conectando mentes, sanando vidas. La plataforma líder para consultas psicológicas profesionales.
                </p>
              </div>
              
              <div>
                <h5 className="font-semibold mb-4">Para Pacientes</h5>
                <ul className="space-y-2 text-sm opacity-90">
                  <li><a href="#" className="hover:opacity-100">Buscar Psicólogos</a></li>
                  <li><a href="#" className="hover:opacity-100">Agendar Cita</a></li>
                  <li><a href="#" className="hover:opacity-100">Mis Citas</a></li>
                  <li><a href="#" className="hover:opacity-100">Centro de Ayuda</a></li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold mb-4">Para Profesionales</h5>
                <ul className="space-y-2 text-sm opacity-90">
                  <li><a href="#" className="hover:opacity-100">Registrarse</a></li>
                  <li><a href="#" className="hover:opacity-100">Iniciar Sesión</a></li>
                  <li><a href="#" className="hover:opacity-100">Dashboard</a></li>
                  <li><a href="#" className="hover:opacity-100">Soporte</a></li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold mb-4">Contacto</h5>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>soporte@psysync.com</li>
                  <li>+52 55 1234 5678</li>
                  <li>Lun - Vie: 9:00 - 18:00</li>
                  <li>Emergencias 24/7</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-90">
              <p>&copy; 2024 PsySync. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
