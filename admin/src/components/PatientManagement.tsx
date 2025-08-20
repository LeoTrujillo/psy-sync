import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  Edit, 
  Trash2, 
  Plus,
  Search,
  Filter
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Patient } from "@/data/mockData";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface PatientManagementProps {
  patients: Patient[];
  searchQuery: string;
}

const PatientManagement = ({ patients, searchQuery }: PatientManagementProps) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);

  // Filter and search patients with memoization for performance
  const filteredPatients = useMemo(() => {
    let filtered = patients;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(patient => patient.status === filterStatus);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(patient =>
        patient.firstName.toLowerCase().includes(query) ||
        patient.lastName.toLowerCase().includes(query) ||
        patient.email.toLowerCase().includes(query) ||
        patient.phone.includes(searchQuery)
      );
    }

    return filtered.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }, [patients, searchQuery, filterStatus]);

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'inactive': return 'bg-muted/10 text-muted-foreground border-muted/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const PatientForm = ({ patient, onClose }: { patient?: Patient; onClose: () => void }) => (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {patient ? 'Editar Paciente' : 'Nuevo Paciente'}
        </DialogTitle>
      </DialogHeader>
      
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Nombre</label>
            <Input placeholder="Nombre" defaultValue={patient?.firstName} />
          </div>
          <div>
            <label className="text-sm font-medium">Apellidos</label>
            <Input placeholder="Apellidos" defaultValue={patient?.lastName} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="Email" defaultValue={patient?.email} />
          </div>
          <div>
            <label className="text-sm font-medium">Teléfono</label>
            <Input placeholder="Teléfono" defaultValue={patient?.phone} />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Fecha de Nacimiento</label>
          <Input type="date" defaultValue={patient?.dateOfBirth} />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Contacto de Emergencia</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Nombre</label>
              <Input placeholder="Nombre completo" defaultValue={patient?.emergencyContact.name} />
            </div>
            <div>
              <label className="text-sm font-medium">Teléfono</label>
              <Input placeholder="Teléfono" defaultValue={patient?.emergencyContact.phone} />
            </div>
            <div>
              <label className="text-sm font-medium">Relación</label>
              <Input placeholder="Relación" defaultValue={patient?.emergencyContact.relationship} />
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Notas</label>
          <textarea
            className="w-full p-3 border border-input rounded-md"
            rows={4}
            placeholder="Notas adicionales sobre el paciente..."
            defaultValue={patient?.notes}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {patient ? 'Actualizar' : 'Crear'} Paciente
          </Button>
        </div>
      </form>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gestión de Pacientes</CardTitle>
            <Dialog open={isNewPatientOpen} onOpenChange={setIsNewPatientOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Paciente
                </Button>
              </DialogTrigger>
              <PatientForm onClose={() => setIsNewPatientOpen(false)} />
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por nombre, email o teléfono..."
                  className="pl-10"
                  value={searchQuery}
                  readOnly
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
              >
                Todos ({patients.length})
              </Button>
              <Button
                variant={filterStatus === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('active')}
              >
                Activos ({patients.filter(p => p.status === 'active').length})
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('pending')}
              >
                Pendientes ({patients.filter(p => p.status === 'pending').length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pacientes ({filteredPatients.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedPatient?.id === patient.id ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(patient.firstName, patient.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">
                          {patient.firstName} {patient.lastName}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {patient.email}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getStatusColor(patient.status)}>
                            {patient.status}
                          </Badge>
                          {patient.lastVisit && (
                            <span className="text-xs text-muted-foreground">
                              Última visita: {format(new Date(patient.lastVisit), 'dd MMM', { locale: es })}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <PatientForm patient={patient} onClose={() => {}} />
                        </Dialog>
                        
                        <Button size="sm" variant="ghost" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredPatients.length === 0 && (
                  <div className="text-center py-8">
                    <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No se encontraron pacientes
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Patient Details */}
        <Card>
          <CardHeader>
            <CardTitle>Detalles del Paciente</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPatient ? (
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Información</TabsTrigger>
                  <TabsTrigger value="history">Historial</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="space-y-4">
                  <div className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-4">
                      <AvatarFallback className="text-lg">
                        {getInitials(selectedPatient.firstName, selectedPatient.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium">
                      {selectedPatient.firstName} {selectedPatient.lastName}
                    </h3>
                    <Badge className={getStatusColor(selectedPatient.status)}>
                      {selectedPatient.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedPatient.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedPatient.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {format(new Date(selectedPatient.dateOfBirth), 'dd MMM yyyy', { locale: es })}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Contacto de Emergencia</h4>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p>{selectedPatient.emergencyContact.name}</p>
                      <p>{selectedPatient.emergencyContact.phone}</p>
                      <p>{selectedPatient.emergencyContact.relationship}</p>
                    </div>
                  </div>

                  {selectedPatient.notes && (
                    <div>
                      <h4 className="font-medium mb-2">Notas</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedPatient.notes}
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="history" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Historial Médico</h4>
                    <div className="space-y-2">
                      {selectedPatient.medicalHistory.map((item, index) => (
                        <Badge key={index} variant="outline" className="mr-2">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Registro</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        Registrado: {format(new Date(selectedPatient.createdAt), 'dd MMM yyyy', { locale: es })}
                      </p>
                      {selectedPatient.lastVisit && (
                        <p>
                          Última visita: {format(new Date(selectedPatient.lastVisit), 'dd MMM yyyy', { locale: es })}
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Selecciona un paciente para ver sus detalles
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientManagement;