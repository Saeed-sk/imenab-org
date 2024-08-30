import React, {useEffect, useState} from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    Background,
    Controls,
    Node,
    Edge,
    OnNodesChange,
    OnEdgesChange
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from "@/Components/CustomNode";
import {Employee, PositionPropType} from "@/types";

// Define the types for your tree data
interface TreeNode {
    id: string;
    name: string;
    src?: string | undefined;
    label: string;
    children?: TreeNode[];
    employee?: Employee;
    position?: PositionPropType;
}

// NodeData should include an index signature to satisfy constraints
interface NodeData extends Record<string, unknown> {
    label: string;
    name: string;
    src?: string;
    toggleNode: () => void;
    expanded: boolean;
    employee?: Employee;
    position?: PositionPropType;
}

// Define the custom node and edge types
type CustomNodeType = Node<NodeData>;
type CustomEdgeType = Edge<Record<string, unknown>>; // Ensure it extends Edge

const initialData: TreeNode = {
    id: '1',
    name: 'Parent Node',
    src: 'https://via.placeholder.com/100',
    label: 'Parent',
    children: [
        {
            id: '2',
            name: 'Child 1',
            src: 'https://via.placeholder.com/100',
            label: 'Child 1',
            children: [
                {
                    id: '4',
                    name: 'Grandchild 1',
                    src: 'https://via.placeholder.com/100',
                    label: 'Grandchild 1',
                    children: [
                        {
                            id: '7',
                            name: 'Great-Grandchild 1',
                            src: 'https://via.placeholder.com/100',
                            label: 'Great-Grandchild 1'
                        },
                    ],
                },
                {id: '5', name: 'Grandchild 2', src: 'https://via.placeholder.com/100', label: 'Grandchild 2'},
            ],
        },
        {
            id: '3',
            name: 'Child 2',
            label: 'Child 2',
            children: [
                {
                    id: '6',
                    name: 'Grandchild 3',
                    src: 'https://via.placeholder.com/100',
                    label: 'Grandchild 3',
                    children: [
                        {
                            id: '8',
                            name: 'Great-Grandchild 2',
                            src: 'https://via.placeholder.com/100',
                            label: 'Great-Grandchild 2'
                        },
                    ],
                },
            ],
        },
    ],
};

const nodeTypes = {
    custom: CustomNode,
};

export default function OrgChartEditor({tree = initialData}: { tree?: TreeNode }) {
    const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeType>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<CustomEdgeType>([]); // Use CustomEdgeType directly
    const [expandedNodes, setExpandedNodes] = useState<{ [key: string]: boolean }>({});

    const toggleNode = (nodeId: string) => {
        setExpandedNodes(prev => ({
            ...prev,
            [nodeId]: !prev[nodeId]
        }));
    };

    useEffect(() => {
        // Initialize all nodes as expanded
        const initializeExpandedNodes = (data: TreeNode): { [key: string]: boolean } => {
            let expanded: { [key: string]: boolean } = {};
            const traverse = (node: TreeNode) => {
                expanded[node.id] = true;
                if (node.children) {
                    node.children.forEach(traverse);
                }
            };
            traverse(data);
            return expanded;
        };

        setExpandedNodes(initializeExpandedNodes(tree));
    }, [tree]);

    useEffect(() => {
        const generateNodesAndEdges = (data: TreeNode, position = {x: 0, y: 0}, parentId: string | null = null) => {
            const nodeHorizontalSpacing = 400;
            const nodeVerticalSpacing = 300;
            let nodes: CustomNodeType[] = [{
                id: data.id,
                position,
                type: 'custom',
                data: {
                    label: data.label,
                    name: data.name,
                    src: data.src,
                    toggleNode: () => toggleNode(data.id),
                    expanded: expandedNodes[data.id],
                    employee: data.employee,
                    position: data.position
                }
            }];
            let edges: CustomEdgeType[] = [];

            if (parentId) {
                edges.push({id: `e${parentId}-${data.id}`, source: parentId, target: data.id});
            }

            if (expandedNodes[data.id] && data.children && data.children.length > 0) {
                const childYPosition = position.y + nodeVerticalSpacing;
                const totalWidth = (data.children.length - 1) * nodeHorizontalSpacing;
                data.children.forEach((child, index) => {
                    const childPosition = {
                        x: position.x - totalWidth / 2 + index * nodeHorizontalSpacing,
                        y: childYPosition
                    };
                    const {nodes: childNodes, edges: childEdges} = generateNodesAndEdges(child, childPosition, data.id);
                    nodes = [...nodes, ...childNodes];
                    edges = [...edges, ...childEdges];
                });
            }

            return {nodes, edges};
        };

        const {nodes: generatedNodes, edges: generatedEdges} = generateNodesAndEdges(tree);

        setNodes(generatedNodes);
        setEdges(generatedEdges);
    }, [setNodes, setEdges, tree, expandedNodes]);

    return (
        <div className="w-full h-full rounded-lg overflow-hidden">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange as OnNodesChange<CustomNodeType>}
                onEdgesChange={onEdgesChange as OnEdgesChange<CustomEdgeType>}
                fitView
                nodeTypes={nodeTypes}
                elementsSelectable={false}
                nodesConnectable={false}
            >
                <Background/>
                <Controls/>
            </ReactFlow>
        </div>
    );
}
