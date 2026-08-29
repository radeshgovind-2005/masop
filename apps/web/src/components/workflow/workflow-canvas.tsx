import { useMemo } from 'react';
import { Background, Controls, MiniMap, ReactFlow, type Edge, type NodeTypes } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AgentNode, type AgentNode as AgentNodeType } from '@/components/workflow/agent-node';
import { BorderBeam } from '@/components/ui/border-beam';

const nodeTypes: NodeTypes = { agentNode: AgentNode };

const initialNodes: AgentNodeType[] = [
  {
    id: 'trigger',
    type: 'agentNode',
    position: { x: 0, y: 120 },
    data: { label: 'On Push', description: 'Triggers when a PR opens', kind: 'tool' },
  },
  {
    id: 'sast',
    type: 'agentNode',
    position: { x: 280, y: 120 },
    data: { label: 'SAST Agent', description: 'Static analysis for code smells', kind: 'agent' },
  },
  {
    id: 'secrets',
    type: 'agentNode',
    position: { x: 560, y: 20 },
    data: { label: 'Secrets Agent', description: 'Scans for leaked credentials', kind: 'agent' },
  },
  {
    id: 'deps',
    type: 'agentNode',
    position: { x: 560, y: 220 },
    data: { label: 'Deps Agent', description: 'Checks dependencies for CVEs', kind: 'agent' },
  },
  {
    id: 'report',
    type: 'agentNode',
    position: { x: 840, y: 120 },
    data: {
      label: 'Report Agent',
      description: 'Aggregates findings into a report',
      kind: 'agent',
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'trigger-sast', source: 'trigger', target: 'sast' },
  { id: 'sast-secrets', source: 'sast', target: 'secrets' },
  { id: 'sast-deps', source: 'sast', target: 'deps' },
  { id: 'secrets-report', source: 'secrets', target: 'report' },
  { id: 'deps-report', source: 'deps', target: 'report' },
];

export function WorkflowCanvas() {
  const nodeTypesMemo = useMemo(() => nodeTypes, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypesMemo}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls showInteractive={false} />
        <MiniMap pannable zoomable className="!bg-card" />
      </ReactFlow>
      <BorderBeam duration={8} size={200} />
    </div>
  );
}
