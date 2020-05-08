import { IsNode } from './IsNode.js';

function IsNodeWebkit() {
    return (IsNode() && !!process.versions.hasOwnProperty('node-webkit'));
}

export { IsNodeWebkit };
