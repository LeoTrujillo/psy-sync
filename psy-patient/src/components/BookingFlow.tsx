import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Calendar  from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Clock, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  reason: z.string().min(10, "Por favor describe brevemente el motivo de la consulta"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  psychologist: {
    name: string;
    price: string;
    specialty: string;
  };
}

// Mock available time slots
const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", 
  "14:00", "15:00", "16:00", "17:00"
];

const BookingFlow: React.FC<BookingFlowProps> = ({ isOpen, onClose, psychologist }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(""); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const onSubmit = (data: BookingFormData) => {
    // Mock booking submission
    console.log("Booking data:", {
      ...data,
      date: selectedDate,
      time: selectedTime,
      psychologist: psychologist.name
    });
    
    setStep(4); // Go to confirmation step
    
    toast({
      title: "¡Cita agendada exitosamente!",
      description: `Tu cita con ${psychologist.name} ha sido confirmada.`,
    });
  };

  const resetFlow = () => {
    setStep(1);
    setSelectedDate(undefined);
    setSelectedTime("");
    form.reset();
  };

  const handleClose = () => {
    resetFlow();
    onClose();
  };

  const isDateDisabled = (date: Date) => {
    // Disable past dates and Sundays
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Selecciona una fecha</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Elige el día que prefieras para tu sesión
              </p>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={isDateDisabled}
                  locale={es}
                  className="rounded-md border"
                  showOutsideDays
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={() => setStep(2)} 
                disabled={!selectedDate}
              >
                Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Selecciona un horario</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Horarios disponibles para {selectedDate && format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => handleTimeSelect(time)}
                    className="justify-center"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {time}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Atrás
              </Button>
              <Button 
                onClick={() => setStep(3)} 
                disabled={!selectedTime}
              >
                Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Información personal</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Completa tus datos para confirmar la cita
              </p>
            </div>

            {/* Resumen de la cita */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Resumen de tu cita</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p><span className="font-medium">Psicólogo:</span> {psychologist.name}</p>
                <p><span className="font-medium">Fecha:</span> {selectedDate && format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}</p>
                <p><span className="font-medium">Hora:</span> {selectedTime}</p>
                <p><span className="font-medium">Precio:</span> {psychologist.price}</p>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu apellido" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="tu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="+52 55 1234 5678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Motivo de la consulta</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe brevemente el motivo de tu consulta..."
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Atrás
                  </Button>
                  <Button type="submit">
                    Confirmar Cita
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">¡Cita confirmada!</h3>
              <p className="text-muted-foreground">
                Tu cita ha sido agendada exitosamente. Recibirás un email de confirmación en breve.
              </p>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg text-left">
              <h4 className="font-medium mb-3">Detalles de tu cita</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Psicólogo:</span>
                  <span className="font-medium">{psychologist.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fecha:</span>
                  <span className="font-medium">
                    {selectedDate && format(selectedDate, "d 'de' MMMM 'de' yyyy", { locale: es })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hora:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Precio:</span>
                  <span className="font-medium">{psychologist.price}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Si necesitas cancelar o reprogramar tu cita, puedes hacerlo hasta 24 horas antes.
              </p>
              <Button onClick={handleClose} className="w-full">
                Cerrar
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Agendar Cita - {psychologist.name}</span>
            {step < 4 && (
              <Badge variant="outline">
                Paso {step} de 3
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        {step < 4 && (
          <div className="flex items-center space-x-2 mb-6">
            {[1, 2, 3].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  stepNumber <= step 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={cn(
                    "h-1 w-12 rounded-full",
                    stepNumber < step ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {renderStep()}
      </DialogContent>
    </Dialog>
  );
};

export default BookingFlow;