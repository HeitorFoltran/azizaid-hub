import Layout from "@/components/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockData = [
  { id: "1", caso: "2024/001234", ficha: "F-0001", nome: "Maria Silva", cpf: "***.***.***-01", encaminhamento: "Psicológico", atualizado: "12/04/2026", criado: "01/02/2026" },
  { id: "2", caso: "2024/001567", ficha: "F-0002", nome: "Ana Oliveira", cpf: "***.***.***-15", encaminhamento: "Assistência Social", atualizado: "10/04/2026", criado: "15/01/2026" },
  { id: "3", caso: "2024/001890", ficha: "F-0003", nome: "Juliana Santos", cpf: "***.***.***-23", encaminhamento: "Jurídico", atualizado: "08/04/2026", criado: "20/03/2026" },
  { id: "4", caso: "2024/002100", ficha: "F-0004", nome: "Carla Souza", cpf: "***.***.***-44", encaminhamento: "Saúde", atualizado: "05/04/2026", criado: "10/03/2026" },
  { id: "5", caso: "2024/002345", ficha: "F-0005", nome: "Fernanda Lima", cpf: "***.***.***-78", encaminhamento: "Psicológico", atualizado: "01/04/2026", criado: "28/02/2026" },
];

const encaminhamentoColor: Record<string, string> = {
  "Psicológico": "bg-aziz-blue/10 text-aziz-blue border-aziz-blue/20",
  "Assistência Social": "bg-aziz-green/10 text-aziz-green border-aziz-green/20",
  "Jurídico": "bg-aziz-yellow/20 text-aziz-gray-dark border-aziz-yellow/40",
  "Saúde": "bg-primary/10 text-primary border-primary/20",
};

export default function Acompanhamentos() {
  const [search, setSearch] = useState("");
  const [filterEnc, setFilterEnc] = useState("all");

  const filtered = mockData.filter((item) => {
    const matchSearch = !search || 
      item.nome.toLowerCase().includes(search.toLowerCase()) ||
      item.caso.includes(search) ||
      item.ficha.includes(search) ||
      item.cpf.includes(search);
    const matchFilter = filterEnc === "all" || item.encaminhamento === filterEnc;
    return matchSearch && matchFilter;
  });

  return (
    <Layout>
      <div className="container py-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-6">Acompanhamentos</h1>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, nº caso, ficha ou CPF..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterEnc} onValueChange={setFilterEnc}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Encaminhamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Psicológico">Psicológico</SelectItem>
                  <SelectItem value="Assistência Social">Assistência Social</SelectItem>
                  <SelectItem value="Jurídico">Jurídico</SelectItem>
                  <SelectItem value="Saúde">Saúde</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* List */}
        <div className="space-y-2">
          {filtered.map((item) => (
            <Link key={item.id} to={`/acompanhamentos/${item.id}`}>
              <Card className="hover:border-aziz-blue/40 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-6 gap-2 items-center text-sm">
                      <span className="font-mono text-xs text-muted-foreground">{item.caso}</span>
                      <span className="font-mono text-xs text-muted-foreground">{item.ficha}</span>
                      <span className="font-medium text-foreground col-span-2 md:col-span-1">{item.nome}</span>
                      <span className="text-muted-foreground hidden md:block">{item.cpf}</span>
                      <Badge variant="outline" className={encaminhamentoColor[item.encaminhamento] || ""}>
                        {item.encaminhamento}
                      </Badge>
                      <span className="text-xs text-muted-foreground hidden md:block">Atualizado: {item.atualizado}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">Nenhum acompanhamento encontrado.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
