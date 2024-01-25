import React from 'react';
import { StaticMathField , EditableMathField} from 'react-mathquill';

export const MathQuillStatic = ({latex}) => {
    return (
        <div id='math-display'>
            <StaticMathField>{latex}</StaticMathField>
        </div>
    );
};

export const MathQuillEdit = ({latex}) => {
    return (
        <div id='math-display'>
            <EditableMathField>{latex}</EditableMathField>
        </div>
    );
};


