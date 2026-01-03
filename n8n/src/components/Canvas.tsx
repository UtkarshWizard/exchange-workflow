import { useState, useCallback } from "react";
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
import { TriggerSheet } from "./TriggerSheet";
import type { EdgeType, NodeType } from "@/types/types";
import PriceTriggerNode from "./Nodes/Triggers/PriceTriggerNode";

const nodeTypes = {
  "price-trigger" : PriceTriggerNode,
  "timer" : TimerNode
};

export default function Canvas() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);

  const onNodesChange = useCallback(
    (changes : any) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );

  const onEdgeChange = useCallback(
    (changes : any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  const onConnect = useCallback(
    (params : any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <>
      { !nodes.length && <TriggerSheet onSelect={(type , metaData) => {
        setNodes([...nodes , {
          id: Math.random().toString(),
          type,
          data: {
            kind : "trigger",
            metaData,
            label: type
          },
          position: {
            x: 0,
            y: 0
          }
        } ])
      }} /> }
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
