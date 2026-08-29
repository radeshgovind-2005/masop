import { useState } from 'react';
import { Bot, Database, FlaskConical, Workflow, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WorkflowCanvas } from '@/components/workflow/workflow-canvas';

interface FactorySection {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

const SECTIONS: FactorySection[] = [
  {
    id: 'workflows',
    label: 'Workflows',
    icon: Workflow,
    description: 'Visually chain agents and tools together on a canvas to build scan pipelines.',
  },
  {
    id: 'agents',
    label: 'Agents',
    icon: Bot,
    description:
      'A grid of digital employees. Configure system prompt, model, and temperature for each one.',
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: Wrench,
    description: 'Manage API keys, webhooks, and MCP servers so agents can reach external systems.',
  },
  {
    id: 'memory',
    label: 'Memory',
    icon: Database,
    description:
      'Upload documents for RAG and toggle observational memory or conversation history.',
  },
  {
    id: 'evals',
    label: 'Evals',
    icon: FlaskConical,
    description: 'Run test prompts against your agents to catch regressions before deploying.',
  },
];

export function FactoryPanel() {
  const [activeSectionId, setActiveSectionId] = useState(SECTIONS[0].id);
  const activeSection = SECTIONS.find((section) => section.id === activeSectionId) ?? SECTIONS[0];

  return (
    <div className="flex h-full w-full gap-4">
      <nav className="flex w-48 shrink-0 flex-col gap-1 py-1" aria-label="Factory sections">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isActive = section.id === activeSectionId;

          return (
            <button
              key={section.id}
              type="button"
              aria-current={isActive}
              onClick={() => setActiveSectionId(section.id)}
              className={cn(
                'flex items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium outline-none transition-colors',
                'focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500',
                isActive
                  ? 'bg-zinc-800 text-zinc-50 dark:bg-zinc-300 dark:text-zinc-950'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              <Icon className="size-4 shrink-0" />
              {section.label}
            </button>
          );
        })}
      </nav>

      {activeSection.id === 'workflows' ? (
        <div className="flex-1">
          <WorkflowCanvas />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-6 text-center shadow-xs">
          <h1 className="text-2xl font-medium text-foreground">{activeSection.label}</h1>
          <p className="text-muted-foreground">{activeSection.description}</p>
        </div>
      )}
    </div>
  );
}
