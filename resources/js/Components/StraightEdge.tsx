// components/StraightEdge.js
import React from 'react';
import { EdgeProps } from '@xyflow/react';

const StraightEdge = (props: EdgeProps) => {
    const { id, sourceX, sourceY, targetX, targetY } = props;

    return (
        <path
            id={id}
            className="react-flow__edge-path"
            d={`M${sourceX},${sourceY} L${targetX},${targetY}`}
            fill="red"
            stroke="red"
            strokeWidth={5}
        />
    );
};

export default StraightEdge;
