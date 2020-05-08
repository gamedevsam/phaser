import '../line/Line.js';
import { GetEdges } from './GetEdges.js';
import { Length } from '../line/Length.js';

function Perimeter(triangle) {
    const [line1, line2, line3] = GetEdges(triangle);
    return (Length(line1) + Length(line2) + Length(line3));
}

export { Perimeter };
