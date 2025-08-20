'use client'
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock, DollarSign, Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import DashboardCalendar from "@/components/DashboardCalendar";
import PatientManagement from "@/components/PatientManagement";
import AppointmentForm from "@/components/AppointmentForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  mockAppointments,
  mockPatients,
  getTodaysAppointments,
  getWeeklyStats,
  type Appointment,
  type Patient
} from "@/data/mockData";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("calendar");

  // Datos calculados para optimizar performance
  const todaysAppointments = useMemo(() => getTodaysAppointments(mockAppointments), []);
  const weeklyStats = useMemo(() => getWeeklyStats(mockAppointments), []);
  
  const filteredAppointments = useMemo(() => {
    if (!searchQuery.trim()) return mockAppointments;
    const query = searchQuery.toLowerCase();
    return mockAppointments.filter(apt => 
      apt.patientName.toLowerCase().includes(query) ||
      apt.reason.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-primary/10 text-primary border-primary/20';
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'cancelled': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'no-show': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getTypeIcon = (type: Appointment['type']) => {
    switch (type) {
      case 'consultation': return '💬';
      case 'follow-up': return '🔄';
      case 'evaluation': return '📋';
      case 'emergency': return '🚨';
      default: return '📅';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Panel de Control</h1>
              <p className="text-muted-foreground">Dra. María González - Psicología Clínica</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar pacientes o citas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Button onClick={() => setIsNewAppointmentOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Cita
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todaysAppointments.length}</div>
              <p className="text-xs text-muted-foreground">
                Próxima: {todaysAppointments[0]?.time || 'Sin citas'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pacientes Activos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockPatients.filter(p => p.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">
                +{mockPatients.filter(p => p.status === 'pending').length} pendientes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyStats.total}</div>
              <p className="text-xs text-muted-foreground">
                {weeklyStats.completed} completadas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Semana</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${weeklyStats.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {weeklyStats.scheduled} citas programadas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calendar">Calendario</TabsTrigger>
            <TabsTrigger value="patients">Pacientes</TabsTrigger>
            <TabsTrigger value="appointments">Citas</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            <DashboardCalendar 
              appointments={filteredAppointments}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </TabsContent>

          <TabsContent value="patients" className="space-y-4">
            <PatientManagement patients={mockPatients} searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Citas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{getTypeIcon(appointment.type)}</div>
                        <div>
                          <h3 className="font-medium">{appointment.patientName}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {appointment.date} • {appointment.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-medium">${appointment.price}</p>
                        <Badge 
                          variant={appointment.paymentStatus === 'paid' ? 'default' : 'outline'}
                          className="text-xs"
                        >
                          {appointment.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de Nueva Cita */}
      <AppointmentForm
        isOpen={isNewAppointmentOpen}
        onClose={() => setIsNewAppointmentOpen(false)}
        patients={mockPatients}
      />
    </div>
  );
};

export default Dashboard;

