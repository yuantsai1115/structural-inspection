import { FC } from 'react';

export interface StructuralData {
    Story: string;
    Name: string;
    Position: string;
    Width: number;
    Length: number;
    QuaterLength: number;
    GradeX: string;
    SizeX: string;
    NumberX: number;
    GradeY: string;
    SizeY: string;
    NumberY: number;
    GradeStirrupJoint: string;
    SizeStirrupJoint: string;
    SpacingStirrupJoint: number;
    GradeStirrupConfined: string;
    SizeStirrupConfined: string;
    SpacingStirrupConfined: number;
    GradeStirrupMiddle: string;
    SizeStirrupMiddle: string;
    SpacingStirrupMiddle: number;
    GradeTieX: string;
    SizeTieX: string;
    NumberTieX: number;
    GradeTieY: string;
    SizeTieY: string;
    NumberTieY: number;
    BundledBarX1: number;
    BundledBarX2: number;
    BundledBarY1: number;
    BundledBarY2: number;
    SizeCorner: string;
    Cover: number;
    RebarRatio: number;
    Image64: string;
}

export const isStructuralData = (data: object) => {
    return (
        'Story' in data &&
        'Name' in data &&
        'Position' in data &&
        'Width' in data &&
        'Length' in data &&
        'QuaterLength' in data &&
        'GradeX' in data &&
        'SizeX' in data &&
        'NumberX' in data &&
        'GradeY' in data &&
        'SizeY' in data &&
        'NumberY' in data &&
        'GradeStirrupJoint' in data &&
        'SizeStirrupJoint' in data &&
        'SpacingStirrupJoint' in data &&
        'GradeStirrupConfined' in data &&
        'SizeStirrupConfined' in data &&
        'SpacingStirrupConfined' in data &&
        'GradeStirrupMiddle' in data &&
        'SizeStirrupMiddle' in data &&
        'SpacingStirrupMiddle' in data &&
        'GradeTieX' in data &&
        'SizeTieX' in data &&
        'NumberTieX' in data &&
        'GradeTieY' in data &&
        'SizeTieY' in data &&
        'NumberTieY' in data &&
        'BundledBarX1' in data &&
        'BundledBarX2' in data &&
        'BundledBarY1' in data &&
        'BundledBarY2' in data &&
        'SizeCorner' in data &&
        'Cover' in data &&
        'RebarRatio' in data &&
        'Image64' in data
    );
};
