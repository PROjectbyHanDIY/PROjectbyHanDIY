import { DefaultColorStyle, ShapeProps, T } from '@tldraw/tldraw'
import { ICardShape } from './cardShapeTypes'

// Validation for our custom card shape's props, using one of tldraw's default styles
export const cardShapeProps: ShapeProps<ICardShape> = {
	w: T.number,
	h: T.number
}

// To generate your own custom styles, check out the custom styles example.
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling