import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Calendar from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarIcon, Clock, User, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { type Patient, type Appointment } from "@/data/mockData";

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  patients: Patient[];
  existingAppointment?: Appointment;
}

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", 
  "15:00", "16:00", "17:00", "18:00"
];

const appointmentTypes = [
  { value: "consultation", label: "Consulta", duration: 60 },
  { value: "follow-up", label: "Seguimiento", duration: 60 },
  { value: "evaluation", label: "Evaluación", duration: 90 },
  { value: "emergency", label: "Emergencia", duration: 45 }
];

const AppointmentForm = ({ isOpen, onClose, patients, existingAppointment }: AppointmentFormProps) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(existingAppointment ? patients.find(p => p.id === existingAppointment.patientId) || null : null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(existingAppointment ? new Date(existingAppointment.date) : undefined);
  const [selectedTime, setSelectedTime] = useState<string>(existingAppointment?.time || "");
  const [appointmentType, setAppointmentType] = useState<string>(existingAppointment?.type || "");
  const [reason, setReason] = useState(existingAppointment?.reason || "");
  const [notes, setNotes] = useState(existingAppointment?.notes || "");
  const [price, setPrice] = useState(existingAppointment?.price.toString() || "800");
  const [step, setStep] = useState(1);

  const selectedType = appointmentTypes.find(type => type.value === appointmentType);
  const calculatedPrice = selectedType ? (selectedType.duration / 60) * 800 : 800;

  const handleSubmit = () => {
    if (!selectedPatient || !selectedDate || !selectedTime || !appointmentType || !reason) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
      });
      return;
    }

    // Simulate appointment creation/update
    toast({
      title: existingAppointment ? "Cita Actualizada" : "Cita Creada",
      description: `Cita ${existingAppointment ? 'actualizada' : 'programada'} para ${selectedPatient.firstName} ${selectedPatient.lastName} el ${format(selectedDate, 'dd/MM/yyyy')} a las ${selectedTime}`,
    });

    // Reset form and close
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setSelectedPatient(null);
    setSelectedDate(undefined);
    setSelectedTime("");
    setAppointmentType("");
    setReason("");
    setNotes("");
    setPrice("800");
    setStep(1);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const isDateDisabled = (date: Date) => {
    return date < new Date() || date.getDay() === 0; // Disable past dates and Sundays
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="patient-search">Buscar Paciente</Label>
              <Input
                id="patient-search"
                placeholder="Buscar por nombre..."
                className="mt-1"
              />
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2">
              {patients.filter(p => p.status === 'active').map((patient) => (
                <Card
                  key={patient.id}
                  className={`cursor-pointer transition-colors ${
                    selectedPatient?.id === patient.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(patient.firstName, patient.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">
                          {patient.firstName} {patient.lastName}
                        </h4>
                        <p className="text-sm text-muted-foreground">{patient.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">
                            {patient.status}
                          </Badge>
                          {patient.medicalHistory.length > 0 && (
                            <span className="text-xs text-muted-foreground">
                              {patient.medicalHistory[0]}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button 
                onClick={() => setStep(2)}
                disabled={!selectedPatient}
              >
                Siguiente
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Fecha</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "PPP", { locale: es })
                      ) : (
                        <span>Seleccionar fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={isDateDisabled}
                      initialFocus
                      locale={es}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Hora</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar hora" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{time}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Tipo de Cita</Label>
              <Select value={appointmentType} onValueChange={setAppointmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo de cita" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center justify-between w-full">
                        <span>{type.label}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {type.duration} min
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Anterior
              </Button>
              <Button 
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime || !appointmentType}
              >
                Siguiente
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="reason">Motivo de la Consulta</Label>
              <Textarea
                id="reason"
                placeholder="Describe el motivo de la consulta..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="notes">Notas Adicionales (Opcional)</Label>
              <Textarea
                id="notes"
                placeholder="Notas adicionales para la cita..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="price">Precio</Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="pl-10"
                  placeholder={calculatedPrice.toString()}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Precio sugerido: ${calculatedPrice} (basado en duración de {selectedType?.duration || 60} min)
              </p>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Anterior
              </Button>
              <Button onClick={() => setStep(4)} disabled={!reason}>
                Revisar
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Confirmar Cita</h3>
            </div>

            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {selectedPatient && getInitials(selectedPatient.firstName, selectedPatient.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">
                      {selectedPatient?.firstName} {selectedPatient?.lastName}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedPatient?.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Fecha:</span>
                    <p className="font-medium">
                      {selectedDate && format(selectedDate, "PPP", { locale: es })}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Hora:</span>
                    <p className="font-medium">{selectedTime}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tipo:</span>
                    <p className="font-medium">{selectedType?.label}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duración:</span>
                    <p className="font-medium">{selectedType?.duration} min</p>
                  </div>
                </div>

                <div>
                  <span className="text-muted-foreground">Motivo:</span>
                  <p className="text-sm mt-1">{reason}</p>
                </div>

                {notes && (
                  <div>
                    <span className="text-muted-foreground">Notas:</span>
                    <p className="text-sm mt-1">{notes}</p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="font-medium">Total:</span>
                  <span className="text-lg font-bold">${price}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(3)}>
                Anterior
              </Button>
              <Button onClick={handleSubmit}>
                {existingAppointment ? 'Actualizar' : 'Confirmar'} Cita
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>
              {existingAppointment ? 'Editar Cita' : 'Nueva Cita'}
            </span>
          </DialogTitle>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div
                  className={`w-12 h-0.5 ${
                    step > stepNumber ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {renderStep()}
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentForm;