import type { emailMetadata, Node } from "@/types/types";
import { Handle, Position } from "@xyflow/react";

export default function EmailNotificationNode ({data , isConnectable} : {
    data: {
        metaData : emailMetadata
    },
    isConnectable : boolean
}) {
    return <div className="p-4 border-2">
        <label typeof="html">
            Will be notified on - 
            {data.metaData.email}
        </label>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
    </div>
}