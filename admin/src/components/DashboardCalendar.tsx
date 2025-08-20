import { useState, useMemo } from "react";
import Calendar from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, User, Phone, Mail } from "lucide-react";
import { format, isSameDay, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { es } from "date-fns/locale";
import { type Appointment } from "@/data/mockData";

interface DashboardCalendarProps {
  appointments: Appointment[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const DashboardCalendar = ({ appointments, selectedDate, onDateSelect }: DashboardCalendarProps) => {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  // Optimized date calculations
  const selectedDateAppointments = useMemo(() => {
    const dateString = selectedDate.toISOString().split('T')[0];
    return appointments
      .filter(apt => apt.date === dateString)
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [appointments, selectedDate]);

  const weekDays = useMemo(() => {
    if (view !== 'week') return [];
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const end = endOfWeek(selectedDate, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [selectedDate, view]);

  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateString);
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-primary/10 text-primary border-primary/20';
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'cancelled': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'no-show': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const hasAppointments = (date: Date) => {
    return getAppointmentsForDate(date).length > 0;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Calendario de Citas</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant={view === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('month')}
              >
                Mes
              </Button>
              <Button
                variant={view === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('week')}
              >
                Semana
              </Button>
              <Button
                variant={view === 'day' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('day')}
              >
                Día
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {view === 'month' && (
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && onDateSelect(date)}
              locale={es}
              className="rounded-md border pointer-events-auto"
              modifiers={{
                hasAppointments: (date) => hasAppointments(date)
              }}
              modifiersStyles={{
                hasAppointments: {
                  backgroundColor: 'hsl(var(--primary) / 0.1)',
                  color: 'hsl(var(--primary))',
                  fontWeight: 'bold'
                }
              }}
            />
          )}

          {view === 'week' && (
            <div className="space-y-4">
              <div className="text-center font-medium">
                Semana del {format(weekDays[0], 'dd', { locale: es })} al {format(weekDays[6], 'dd MMM yyyy', { locale: es })}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day) => {
                  const dayAppointments = getAppointmentsForDate(day);
                  const isSelected = isSameDay(day, selectedDate);
                  
                  return (
                    <div
                      key={day.toISOString()}
                      className={`p-2 border rounded-lg cursor-pointer transition-colors ${
                        isSelected ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => onDateSelect(day)}
                    >
                      <div className="text-center">
                        <div className="text-sm font-medium">
                          {format(day, 'EEE', { locale: es })}
                        </div>
                        <div className="text-lg font-bold">
                          {format(day, 'd')}
                        </div>
                        {dayAppointments.length > 0 && (
                          <div className="mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {dayAppointments.length} citas
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {view === 'day' && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  {format(selectedDate, 'EEEE, dd MMMM yyyy', { locale: es })}
                </h3>
              </div>
              
              <div className="space-y-3">
                {Array.from({ length: 10 }, (_, i) => i + 9).map((hour) => {
                  const timeString = `${hour.toString().padStart(2, '0')}:00`;
                  const hourAppointments = selectedDateAppointments.filter(apt => apt.time === timeString);
                  
                  return (
                    <div key={hour} className="flex items-start space-x-4 p-2 border-l-2 border-muted">
                      <div className="w-16 text-sm text-muted-foreground font-medium">
                        {timeString}
                      </div>
                      <div className="flex-1">
                        {hourAppointments.length > 0 ? (
                          hourAppointments.map((apt) => (
                            <div
                              key={apt.id}
                              className="p-3 bg-primary/5 border border-primary/20 rounded-lg"
                            >
                              <div className="flex items-center justify-between">
                                <div className="font-medium">{apt.patientName}</div>
                                <Badge className={getStatusColor(apt.status)}>
                                  {apt.status}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                {apt.reason}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-muted-foreground italic">
                            Horario disponible
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected Date Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>
              {format(selectedDate, 'dd MMM', { locale: es })}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            {selectedDateAppointments.length > 0 ? (
              <div className="space-y-4">
                {selectedDateAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4 border rounded-lg space-y-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      <span className="text-sm font-mono font-medium">
                        {appointment.time}
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="font-medium flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{appointment.patientName}</span>
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {appointment.reason}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {appointment.duration} min
                      </span>
                      <span className="font-medium">
                        ${appointment.price}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="w-3 h-3 mr-1" />
                        Llamar
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Mail className="w-3 h-3 mr-1" />
                        Email
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No hay citas programadas para este día
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Agendar Nueva Cita
                </Button>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCalendar;