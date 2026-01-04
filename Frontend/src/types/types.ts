export type Node =
  | "price-trigger"
  | "timer"

export type NodeMetadata = PriceMetaData | TimerMetaData

export interface NodeType {
  id: string;
  type: Node; //is it a action or a trigger node ?
  position: { x: number; y: number };
  data: {
    kind: "trigger" | "action", // if trigger then timer or price ? if action toh ?
    metaData: NodeMetadata,
    label: string
  };
};

export type EdgeType = {
  id: string;
  source: string 
  target: string
  label: string
}

export type TimerMetaData = {
    time: Number
}

export type PriceMetaData = {
    asset : string;
    price : number
}