import { Handle, Position } from "@xyflow/react";
import type { NodeKind, NodeMetadata } from "../../Canvas";


export default function TimerNode({data , isConnectable} : {
    data : {
        kind: NodeKind,
        metaData: NodeMetadata
    } ,
    isConnectable: boolean
}) {
    return (
        <div className="timer-node border p-4 rounded">
            <div>
                <label htmlFor="text">{data.metaData.label}</label>
            </div>
            <Handle type="source" position={Position.Right} />
        </div>
    )
}