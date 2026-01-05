import { Handle, Position } from "@xyflow/react";


export default function ReportsNode () {
    return <div className="p-4 border-2">
        <label typeof="html">Ai Reports</label>
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
    </div>
}