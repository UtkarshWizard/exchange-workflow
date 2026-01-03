import type { NodeType, PriceMetaData } from "@/types/types"
import { Handle, Position } from "@xyflow/react"

export default function PriceTriggerNode({data , isConnectable} : {
    data: {
        type: NodeType,
        metaData: PriceMetaData
    },
    isConnectable: boolean
}) {
    return <div>
        Asset - <label typeof="html">{data.metaData.asset}</label>
        Price - <label typeof="html">{data.metaData.price}</label>
        <Handle type="source" position={Position.Right} />
    </div>
}