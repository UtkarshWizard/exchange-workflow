export type Node = {
    id: string;
    type: string;
    kind: "ACTION" | "TRIGGER";
    title: string;
    description: string
}

export interface WorkflowNodeType {
  id: string;
  nodeId: string,
  position: { x: number; y: number };
  data: {
    metaData: unknown,
  };
};

export type EdgeType = {
  id: string;
  source: string 
  target: string
}