import mongoose , {Schema} from "mongoose";

const UserSchema = new Schema ({
    name: {type : String , required : true},
    email : { type : String , required: true},
    password: {type : String , required:true}
});

const EdgesSchema = new Schema ({
    id: { type: String , required: true},
    source: { type: String , required: true},
    target : { type: String , required: true}
} , {
    _id: false
});

const PositionSchema = new Schema ({
    x: {
        type: Number, 
        required: true
    } , 
    y: {
        type: Number,
        required: true
    }
} , {
    _id: false
})

const NodeDataSchema = new Schema ({
    metaData : Schema.Types.Mixed
} , {
    _id: false
})

const WorkFlowNodesSchema = new Schema ({
    id: { type: String , required: true },
    nodeId: { type: Schema.Types.ObjectId , ref: 'Nodes'},
    data : NodeDataSchema,
    position: PositionSchema
} , {
    _id: false
})

const WorkflowSchema = new Schema ({
    userId : {type: Schema.Types.ObjectId, ref: 'Users'},
    nodes : [WorkFlowNodesSchema],
    edges: [EdgesSchema]
})

const NodesSchema = new Schema ({
    type: { type: String , required: true},
    kind : {type: String , enum: ["ACTION" , "TRIGGER"]},
    title: { type: String , required: true},
    description: { type: String , required: true}, 
})

const ExecutionSchema = new Schema ({
    workflowId: { type: Schema.Types.ObjectId , ref: 'Workflows' , required: true},
    status: { type: String , enum: ["PENDING" , "COMPLETED" , "FAILED"]},
    startTime: { type: Date , required: true},
    endTime: { type: Date}
})

const ReportsSchema = new Schema ({
    generatedAt : { type: Date , required: true},
    userId: { type: Schema.Types.ObjectId , ref: 'Users' , required: true},
    size: { type: Number},
    title: { type: String , required: true}
})

export const UserModel = mongoose.model("Users" , UserSchema);
export const WorkflowModel = mongoose.model("Workflows" , WorkflowSchema)
export const NodesModel = mongoose.model("Nodes" , NodesSchema)
export const ExecutionsModel = mongoose.model("Executions" , ExecutionSchema)
export const ReportsModel = mongoose.model("Reports" , ReportsSchema)
