'use client';
import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  Star, 
  Calendar, 
  DollarSign, 
  Clock, 
  GraduationCap, 
  Award, 
  Phone, 
  Mail, 
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import Link  from "next/link";
import BookingFlow from "@/components/BookingFlow";

// Mock data - en una aplicación real esto vendría de una API
const mockPsychologist = {
  id: "1",
  name: "Dra. María González",
  specialty: "Psicología Clínica",
  location: "Ciudad de México",
  rating: 4.9,
  reviewCount: 127,
  price: "800",
  image: "/src/assets/psychologist-1.jpg",
  experience: 12,
  availability: "Disponible",
  specialties: ["Ansiedad", "Depresión", "Terapia de Pareja", "PTSD", "Terapia Cognitiva"],
  education: [
    "Doctorado en Psicología Clínica - UNAM",
    "Maestría en Terapia Cognitivo Conductual - UAM",
    "Licenciatura en Psicología - ITAM"
  ],
  certifications: [
    "Certificación en Terapia EMDR",
    "Especialización en Trastornos de Ansiedad",
    "Certificación Internacional en Mindfulness"
  ],
  about: "Soy una psicóloga clínica con más de 12 años de experiencia ayudando a personas a superar diversos desafíos emocionales y mentales. Mi enfoque se basa en la terapia cognitivo-conductual, combinada con técnicas de mindfulness y EMDR. Creo firmemente en crear un espacio seguro y sin juicios donde mis pacientes puedan explorar sus pensamientos y emociones.",
  schedule: [
    { day: "Lunes", hours: "9:00 - 18:00" },
    { day: "Martes", hours: "9:00 - 18:00" },
    { day: "Miércoles", hours: "10:00 - 16:00" },
    { day: "Jueves", hours: "9:00 - 18:00" },
    { day: "Viernes", hours: "9:00 - 15:00" },
    { day: "Sábado", hours: "10:00 - 14:00" },
    { day: "Domingo", hours: "Cerrado" }
  ],
  contact: {
    phone: "+52 55 1234 5678",
    email: "dra.gonzalez@example.com"
  },
  reviews: [
    {
      id: 1,
      name: "Ana M.",
      rating: 5,
      date: "2024-01-15",
      comment: "Excelente profesional. Me ayudó mucho con mi ansiedad. Muy recomendable."
    },
    {
      id: 2,
      name: "Carlos R.",
      rating: 5,
      date: "2024-01-10",
      comment: "Gran empatía y profesionalismo. Las sesiones son muy efectivas."
    },
    {
      id: 3,
      name: "Sofia L.",
      rating: 4,
      date: "2024-01-05",
      comment: "Me ha ayudado mucho en mi proceso de terapia. Muy satisfecha con los resultados."
    }
  ]
};

const PsychologistProfile = () => {
  const { id } = useParams();
  const psychologist = mockPsychologist; // En una app real, se haría fetch por ID
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header con navegación */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a la búsqueda
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal - Información del psicólogo */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información básica */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <div className="relative">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={psychologist.image} alt={psychologist.name} />
                      <AvatarFallback>{psychologist.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-success text-success-foreground text-xs px-3 py-1 rounded-full">
                      {psychologist.availability}
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-foreground mb-2">{psychologist.name}</h1>
                    <p className="text-xl text-primary font-medium mb-3">{psychologist.specialty}</p>
                    
                    <div className="flex items-center justify-center md:justify-start mb-2">
                      <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">{psychologist.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-center md:justify-start mb-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-warning fill-current" />
                        <span className="ml-1 font-medium">{psychologist.rating}</span>
                        <span className="text-muted-foreground text-sm ml-1">
                          ({psychologist.reviewCount} reseñas)
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center md:justify-start">
                      <GraduationCap className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">{psychologist.experience} años de experiencia</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acerca de */}
            <Card>
              <CardHeader>
                <CardTitle>Acerca de mí</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{psychologist.about}</p>
              </CardContent>
            </Card>

            {/* Especialidades */}
            <Card>
              <CardHeader>
                <CardTitle>Especialidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {psychologist.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Educación */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Educación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {psychologist.education.map((edu, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-3 mt-1 text-success flex-shrink-0" />
                    <span className="text-muted-foreground">{edu}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certificaciones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Certificaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {psychologist.certifications.map((cert, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-3 mt-1 text-success flex-shrink-0" />
                    <span className="text-muted-foreground">{cert}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reseñas */}
            <Card>
              <CardHeader>
                <CardTitle>Reseñas de pacientes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {psychologist.reviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">{review.name}</span>
                        <div className="flex items-center ml-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-warning fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                    {review.id !== psychologist.reviews[psychologist.reviews.length - 1].id && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar derecha */}
          <div className="space-y-6">
            {/* Precio y acciones */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center text-2xl font-bold text-primary mb-2">
                    <DollarSign className="w-6 h-6" />
                    {psychologist.price}
                  </div>
                  <p className="text-sm text-muted-foreground">por sesión (50 minutos)</p>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full" size="lg" onClick={() => setIsBookingOpen(true)}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar Cita
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Llamar
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Horarios */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Horarios de Atención
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {psychologist.schedule.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{item.day}</span>
                    <span className="text-muted-foreground">{item.hours}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contacto */}
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-muted-foreground" />
                  <span className="text-sm">{psychologist.contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-muted-foreground" />
                  <span className="text-sm">{psychologist.contact.email}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <BookingFlow
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        psychologist={{
          name: psychologist.name,
          price: psychologist.price,
          specialty: psychologist.specialty
        }}
      />
    </div>
  );
};

export default PsychologistProfile;
