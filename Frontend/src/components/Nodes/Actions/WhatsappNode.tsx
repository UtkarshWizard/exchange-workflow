import type { numberMetadata } from "@/types/types";
import { Handle, Position } from "@xyflow/react";

export default function WhatsappNotificationNode ({data , isConnectable} : {
    data: {
        metaData : numberMetadata
    },
    isConnectable : boolean
}) {
    return <div className="p-4 border-2">
        <label typeof="html">Will be notified on - {data.metaData.number}</label>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
    </div>
}