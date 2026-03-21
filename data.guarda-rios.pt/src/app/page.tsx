import {
  Droplets,
  Github,
  ExternalLink,
  Terminal,
  Activity,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Hero */}
      <div className="space-y-4 pt-8">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Terminal className="h-3 w-3" />
          <span className="font-mono">$ cat welcome.md</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Portal de Dados{" "}
          <span className="text-primary">Guarda Rios</span>
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Bem-vindo/a ao portal de partilha de dados do Projeto Guarda Rios.
          Monitorizamos a qualidade da água dos rios portugueses em tempo real,
          tornando os dados acessíveis a todos.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-md border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Parâmetros
            </span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-foreground">5</p>
          <p className="text-[10px] text-muted-foreground">
            pH, temperatura, turbidez, TDS, qualidade
          </p>
        </div>
        <div className="rounded-md border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-primary" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Estações
            </span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-foreground">3</p>
          <p className="text-[10px] text-muted-foreground">
            Geral, Mostra 2025, Ribeira da Granja
          </p>
        </div>
        <div className="rounded-md border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Status
            </span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-primary">Online</p>
          <p className="text-[10px] text-muted-foreground">
            Atualização automática a cada 5 min
          </p>
        </div>
      </div>

      {/* Terminal-style about section */}
      <div className="rounded-md border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary/60" />
          <span className="ml-2 text-[10px] text-muted-foreground">
            about.sh
          </span>
        </div>
        <div className="space-y-3 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
          <p>
            <span className="text-primary">$</span> O Projeto Guarda Rios
            centra-se na monitorização da qualidade da água dos rios portugueses.
          </p>
          <p>
            <span className="text-primary">$</span> Através de estações de
            monitorização distribuídas, recolhemos dados em tempo real sobre
            parâmetros como temperatura, pH, turbidez e sólidos dissolvidos
            totais (TDS).
          </p>
          <p>
            <span className="text-primary">$</span> Todos os dados e hardware
            são open source, licenciados sob{" "}
            <span className="text-foreground">MIT</span> e{" "}
            <span className="text-foreground">CERN-OHL-P v2</span>.
          </p>
        </div>
      </div>

      {/* Links */}
      <div className="flex items-center gap-4">
        <a
          href="https://guarda-rios.pt"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ExternalLink className="h-3 w-3" />
          guarda-rios.pt
        </a>
        <a
          href="https://github.com/Projeto-Guarda-Rios"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Github className="h-3 w-3" />
          github
        </a>
      </div>
    </div>
  );
}
