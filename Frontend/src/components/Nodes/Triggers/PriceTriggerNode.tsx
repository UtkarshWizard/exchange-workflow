import type { NodeType, PriceMetaData } from "@/types/types"
import { Handle, Position } from "@xyflow/react"

export default function PriceTriggerNode({data , isConnectable} : {
    data: {
        type: NodeType,
        metaData: PriceMetaData
    },
    isConnectable: boolean
}) {
    return <div className="p-4 border-2">
        Asset - <label typeof="html">{data.metaData.asset}</label> : 
        Price - Rs <label typeof="html">{data.metaData.price}</label>
        <Handle type="source" position={Position.Right} />
    </div>
}