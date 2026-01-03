import { useState, useCallback, useEffect } from "react";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import TimerNode from "./Nodes/Triggers/TimerNode";
import { SideSheet } from "./Sidesheet";

const nodeTypes = {
  timerNode: TimerNode,
};

const initialNodes = [
  {
    id: "timerNode",
    position: { x: 0, y: -100 },
    type: "trigger",
    data: { label: "30 sec" },
  },
];

const initialEdges = [
  { id: "n1-n2", source: "n1", target: "n2", label: "Hey There" },
];

export type NodeKind =
  | "price-trigger"
  | "time"
  | "email"
  | "ai_report"
  | "whatsapp";

export type NodeMetadata = {
  label: string;
};

export interface NodeType {
  id: string;
  type: "trigger" | "action"; //is it a action or a trigger node ?
  position: { x: number; y: number };
  data: {
    kind: NodeKind; // if trigger then timer or price ? if action toh ?
    metaData: NodeMetadata;
  };
}

export default function Canvas() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState(initialEdges);
  const [isOpen, setIsOpen] = useState(true);

  const isNodesPresent = nodes.length > 0;

  useEffect(() => {
    if (isNodesPresent) {
      setIsOpen(false);
    }
  }, []);

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );

  const onEdgeChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <>
      {isOpen && <SideSheet isOpen={isOpen} />}
      <div style={{ width: "100w", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgeChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </>
  );
}
