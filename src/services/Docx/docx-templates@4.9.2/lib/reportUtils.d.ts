import { Node, TextNode, NonTextNode, Context, LoopStatus } from './types';
declare const cloneNodeWithoutChildren: (node: Node) => Node;
declare const getNextSibling: (node: Node) => Node | null;
declare const insertTextSiblingAfter: (textNode: TextNode) => TextNode;
declare const newNonTextNode: (tag: string, attrs?: {}, children?: Array<Node>) => NonTextNode;
declare const newTextNode: (text: string) => TextNode;
declare const addChild: (parent: Node, child: Node) => Node;
declare const getCurLoop: (ctx: Context) => LoopStatus | null;
declare const isLoopExploring: (ctx: Context) => boolean;
declare const logLoop: (loops: Array<LoopStatus>) => void;
export { cloneNodeWithoutChildren, getNextSibling, insertTextSiblingAfter, newNonTextNode, newTextNode, addChild, getCurLoop, isLoopExploring, logLoop, };