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
import { ActionSheet } from "./ActionSheet";

const nodeTypes = {
  "price-trigger" : PriceTriggerNode,
  "timer" : TimerNode
};

export default function Canvas() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);
  const [selectAction , setSelectAction] = useState<{
    position : {
      x: number,
      y: number
    },
    sourceNodeId : string
  } | null>(null)

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

  const onConnectEnd = useCallback(
    (params , connectionInfo ) => {
      if (!connectionInfo.isValid) {
        setSelectAction({
          sourceNodeId: connectionInfo.fromNode.id,
          position: connectionInfo.to
        })
      }
    },
    []
  )

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

      {selectAction && <ActionSheet onSelect={(type , metaData) => {
        const nodeId = Math.random().toString()
        setNodes([
          ...nodes, {
            id: nodeId,
            type,
            data: {
              kind: "action",
              metaData,
              label: type
            },
            position: selectAction.position
          }
        ]);
        setEdges([
          ...edges , {
            id: Math.random().toString(),
            source: selectAction.sourceNodeId,
            target: nodeId
          }
        ])
      }}  />}
      <div style={{ width: "100w", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgeChange}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
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
