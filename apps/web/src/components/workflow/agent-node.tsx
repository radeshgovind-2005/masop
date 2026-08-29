import { Position, type NodeProps, type Node } from '@xyflow/react';
import { Bot, Wrench } from 'lucide-react';
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from '@/components/base-node';
import { LabeledHandle } from '@/components/labeled-handle';

export type AgentNodeData = {
  label: string;
  description: string;
  kind: 'agent' | 'tool';
};

export type AgentNode = Node<AgentNodeData, 'agentNode'>;

export function AgentNode({ data }: NodeProps<AgentNode>) {
  const Icon = data.kind === 'tool' ? Wrench : Bot;

  return (
    <BaseNode className="w-56">
      <BaseNodeHeader>
        <Icon className="size-4 shrink-0 text-muted-foreground" />
        <BaseNodeHeaderTitle>{data.label}</BaseNodeHeaderTitle>
      </BaseNodeHeader>
      <BaseNodeContent>
        <p className="text-xs text-muted-foreground">{data.description}</p>
      </BaseNodeContent>
      <LabeledHandle type="target" position={Position.Left} title="in" />
      <LabeledHandle type="source" position={Position.Right} title="out" />
    </BaseNode>
  );
}
