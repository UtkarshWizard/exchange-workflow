export type Node =
  | "price-trigger"
  | "timer"
  | "email"
  | "whatsapp"
  | "report"

export type NodeMetadata = PriceMetaData | TimerMetaData | emailMetadata | numberMetadata;

export interface NodeType {
  id: string;
  type: Node; // if trigger then timer or price ? if action toh ?
  position: { x: number; y: number };
  data: {
    kind: "trigger" | "action", //is it a action or a trigger node ?
    metaData: NodeMetadata,
    label: string
  };
};

export type EdgeType = {
  id: string;
  source: string 
  target: string
}

export type TimerMetaData = {
    time: Number
}

export type PriceMetaData = {
    asset : string;
    price : number
}

export type emailMetadata = {
    email: string
}

export type numberMetadata = {
    number: string
}