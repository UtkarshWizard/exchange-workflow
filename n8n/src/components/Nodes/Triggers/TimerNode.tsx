import type { NodeType, TimerMetaData } from "@/types/types";
import { Handle, Position } from "@xyflow/react";

export default function TimerNode({data , isConnectable} : {
    data : {
        type: NodeType,
        metaData: TimerMetaData
    } ,
    isConnectable: boolean
}) {
    return (
        <div className="border p-4 rounded">
            <div>
                Every <label htmlFor="text">{data.metaData.time.toString()}</label> seconds.
            </div>
            <Handle type="source" position={Position.Right} />
        </div>
    )
}