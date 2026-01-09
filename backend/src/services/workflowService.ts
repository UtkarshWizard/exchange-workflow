import { WorkflowModel } from "../models/index.js"
import type { EdgeType, WorkflowNodeType } from "../types/types.js"

export const createWorkflow = async ({userId , nodes , edges} : {
    userId : string,
    nodes : WorkflowNodeType[],
    edges : EdgeType[] 
}) => {
    const workflow = WorkflowModel.create({userId , nodes , edges})
    return workflow
}

export const deleteWorkflow = async (id: string) => {
    return WorkflowModel.findByIdAndDelete(id)
}