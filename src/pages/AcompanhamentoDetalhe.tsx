import Layout from "@/components/Layout";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Send, Paperclip } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const timeline = [
  { id: 1, tipo: "Psicológico", profissional: "Dra. Ana Beatriz", data: "12/04/2026", retorno: "26/04/2026", descricao: "Encaminhamento para avaliação psicológica inicial." },
  { id: 2, tipo: "Assistência Social", profissional: "Carlos Mendes", data: "05/04/2026", retorno: "19/04/2026", descricao: "Verificação de situação habitacional e rede de apoio." },
  { id: 3, tipo: "Jurídico", profissional: "Dra. Fernanda Costa", data: "01/03/2026", retorno: "15/03/2026", descricao: "Orientação sobre medida protetiva de urgência." },
];

const interacoes = [
  { autor: "Promotora Silva", data: "02/04/2026", texto: "Paciente relatou melhora após início do acompanhamento psicológico. Manter encaminhamentos." },
  { autor: "Assistente Social", data: "28/03/2026", texto: "Realizada visita domiciliar. Situação habitacional estável." },
];

export default function AcompanhamentoDetalhe() {
  const { id } = useParams();
  const [novoComentario, setNovoComentario] = useState("");

  return (
    <Layout>
      <div className="container py-8 animate-fade-in">
        <Link to="/acompanhamentos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Voltar para acompanhamentos
        </Link>

        {/* Info header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div><span className="text-muted-foreground block text-xs">Código Ficha</span><span className="font-medium">F-000{id}</span></div>
              <div><span className="text-muted-foreground block text-xs">Nome</span><span className="font-medium">Maria Silva</span></div>
              <div><span className="text-muted-foreground block text-xs">Documento</span><span className="font-medium">***.***.***-01</span></div>
              <div><span className="text-muted-foreground block text-xs">Status</span><Badge variant="outline" className="bg-aziz-green/10 text-aziz-green border-aziz-green/20">Ativo</Badge></div>
              <div><span className="text-muted-foreground block text-xs">Nº Caso</span><span className="font-medium">2024/001234</span></div>
              <div><span className="text-muted-foreground block text-xs">Ocorrência</span><span className="font-medium">Violência doméstica</span></div>
              <div><span className="text-muted-foreground block text-xs">Data Criação</span><span className="font-medium">01/02/2026</span></div>
              <div><span className="text-muted-foreground block text-xs">Última Atualização</span><span className="font-medium">12/04/2026</span></div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Timeline de Encaminhamentos</h2>
              <Button size="sm" className="bg-aziz-green hover:bg-aziz-green/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-1" /> Novo Encaminhamento
              </Button>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
              <div className="space-y-4">
                {timeline.map((item) => (
                  <div key={item.id} className="relative pl-10">
                    <div className="absolute left-2.5 top-4 w-3 h-3 rounded-full bg-aziz-blue border-2 border-card" />
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Badge variant="outline" className="bg-aziz-blue/10 text-aziz-blue border-aziz-blue/20 mb-1">
                              {item.tipo}
                            </Badge>
                            <p className="text-sm font-medium text-foreground">{item.profissional}</p>
                          </div>
                          <div className="text-right text-xs text-muted-foreground">
                            <p>Encaminhado: {item.data}</p>
                            <p>Retorno: {item.retorno}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.descricao}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactions */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Interações</h2>

            <div className="space-y-3">
              {interacoes.map((int, i) => (
                <Card key={i}>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-aziz-blue">{int.autor}</span>
                      <span className="text-xs text-muted-foreground">{int.data}</span>
                    </div>
                    <p className="text-sm text-foreground">{int.texto}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardContent className="p-3">
                <Textarea
                  placeholder="Adicionar comentário..."
                  value={novoComentario}
                  onChange={(e) => setNovoComentario(e.target.value)}
                  className="mb-2 min-h-[80px]"
                />
                <div className="flex justify-between">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Send className="w-4 h-4 mr-1" /> Enviar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
