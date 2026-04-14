import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Plus, Filter, Share2, Copy, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const tabs = [
  { id: "fichas", label: "Ficha Pessoal (PIA)" },
  { id: "servicos", label: "Serviços" },
  { id: "profissionais", label: "Profissionais" },
];

const fichasMock = [
  { id: "1", nome: "Maria Silva", cpf: "000.000.000-01", carteira: "0001", servico: "Psicologia" },
  { id: "2", nome: "Ana Oliveira", cpf: "000.000.000-15", carteira: "0002", servico: "Assistência Social" },
];

const servicosMock = [
  { id: "1", nome: "Psicologia", icon: "🧠" },
  { id: "2", nome: "Assistência Social", icon: "🤝" },
  { id: "3", nome: "Jurídico", icon: "⚖️" },
  { id: "4", nome: "Saúde", icon: "🏥" },
];

const profissionaisMock = [
  { id: "1", nome: "Dra. Ana Beatriz", cpf: "000.000.000-99", carteira: "CRP-0001", servico: "Psicologia" },
  { id: "2", nome: "Carlos Mendes", cpf: "000.000.000-88", carteira: "CRESS-0002", servico: "Assistência Social" },
];

export default function Cadastros() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "fichas";
  const action = searchParams.get("action");
  const [search, setSearch] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const shareLink = `${window.location.origin}/ficha-publica/nova`;

  useEffect(() => {
    if (action === "nova") setShareOpen(true);
  }, [action]);

  const setTab = (tab: string) => {
    setSearchParams({ tab });
    setSearch("");
  };

  return (
    <Layout>
      <div className="container py-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-6">Cadastros</h1>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Fichas */}
        {activeTab === "fichas" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Buscar fichas..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
              </div>
              <Button onClick={() => setShareOpen(true)} className="bg-aziz-green hover:bg-aziz-green/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" /> Nova Ficha
              </Button>
            </div>

            <div className="space-y-2">
              {fichasMock.filter(f => !search || f.nome.toLowerCase().includes(search.toLowerCase())).map((f) => (
                <Card key={f.id} className="hover:border-aziz-blue/30 transition-colors">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{f.nome}</p>
                      <p className="text-sm text-muted-foreground">CPF: {f.cpf} · Carteira: {f.carteira}</p>
                    </div>
                    <Badge variant="outline">{f.servico}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Serviços */}
        {activeTab === "servicos" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Serviços disponíveis</h2>
              <Button className="bg-aziz-green hover:bg-aziz-green/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" /> Adicionar novo serviço
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {servicosMock.map((s) => (
                <Card key={s.id} className="hover:border-aziz-blue/30 transition-colors cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <span className="text-4xl mb-3">{s.icon}</span>
                    <span className="text-sm font-medium text-foreground">{s.nome}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Profissionais */}
        {activeTab === "profissionais" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Buscar profissionais..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="psicologia">Psicologia</SelectItem>
                  <SelectItem value="social">Assistência Social</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              {profissionaisMock.filter(p => !search || p.nome.toLowerCase().includes(search.toLowerCase())).map((p) => (
                <Card key={p.id} className="hover:border-aziz-blue/30 transition-colors">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{p.nome}</p>
                      <p className="text-sm text-muted-foreground">CPF: {p.cpf} · {p.carteira}</p>
                    </div>
                    <Badge variant="outline">{p.servico}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Share dialog */}
        <Dialog open={shareOpen} onOpenChange={setShareOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Ficha PIA</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Escolha como deseja preencher a ficha:
              </p>
              <Link to="/cadastros/nova-ficha">
                <Button className="w-full bg-primary hover:bg-primary/90">Preencher internamente</Button>
              </Link>
              <div className="border-t pt-4">
                <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Share2 className="w-4 h-4" /> Compartilhar link para preenchimento
                </p>
                <div className="flex gap-2">
                  <Input value={shareLink} readOnly className="text-xs" />
                  <Button variant="outline" size="icon" onClick={() => { navigator.clipboard.writeText(shareLink); toast.success("Link copiado!"); }}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
