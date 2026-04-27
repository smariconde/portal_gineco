import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import { mockUsers } from "@/lib/mock";
import { initials } from "@/lib/utils";

export default function AdminUsersPage() {
  const students = mockUsers.filter((u) => u.role === "student");
  const tutors = mockUsers.filter((u) => u.role === "teacher");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Usuarios"
        description="Alumnas/os y tutores activos en el cuatrimestre."
      />

      <Tabs defaultValue="students">
        <TabsList>
          <TabsTrigger value="students">
            Alumnas/os ({students.length})
          </TabsTrigger>
          <TabsTrigger value="tutors">
            Tutores ({tutors.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alumna/o</TableHead>
                  <TableHead>Matrícula</TableHead>
                  <TableHead>Tutor/a</TableHead>
                  <TableHead className="text-right">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((s) => {
                  const tutor = mockUsers.find((u) => u.id === s.tutorId);
                  return (
                    <TableRow key={s.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            {s.avatarUrl && (
                              <AvatarImage src={s.avatarUrl} alt={s.fullName} />
                            )}
                            <AvatarFallback>{initials(s.fullName)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{s.fullName}</p>
                            <p className="text-xs text-muted-foreground">
                              {s.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {s.studentId ?? "—"}
                      </TableCell>
                      <TableCell>
                        {tutor ? tutor.fullName : (
                          <span className="text-muted-foreground">Sin asignar</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="success">Activo</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="tutors">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tutor/a</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Alumnas/os a cargo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tutors.map((t) => {
                  const count = mockUsers.filter(
                    (u) => u.role === "student" && u.tutorId === t.id
                  ).length;
                  return (
                    <TableRow key={t.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            {t.avatarUrl && (
                              <AvatarImage src={t.avatarUrl} alt={t.fullName} />
                            )}
                            <AvatarFallback>{initials(t.fullName)}</AvatarFallback>
                          </Avatar>
                          <p className="font-medium">{t.fullName}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {t.email}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {count}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
