import {
	HTMLContainer,
	Rectangle2d,
	ShapeUtil,
	TLOnBeforeCreateHandler,
	TLOnClickHandler,
	TLOnResizeHandler,
	TLShape,
	getDefaultColorTheme,
	resizeBox,
} from '@tldraw/tldraw'
import * as React from "react"
import { cardShapeMigrations } from './cardShapeMigrations'
import { cardShapeProps } from './cardShapeProps'
import { ICardShape } from './cardShapeTypes'
import { TextField } from '@mui/material'
import { CardData } from './cardData'

// There's a guide at the bottom of this file!


export class CardShapeUtil extends ShapeUtil<ICardShape> {
	state : CardData = {
		url: '',
		title:  '',
		notes: ''
	}
	
	static override type = 'card' as const
	// [1]
	static override props = cardShapeProps
	// [2]
	static override migrations = cardShapeMigrations

	// [3]
	override isAspectRatioLocked = (_shape: ICardShape) => false
	override canResize = (_shape: ICardShape) => true
	override canBind = (_shape: ICardShape) => true

	// [4]
	getDefaultProps(): ICardShape['props'] {
		return {
			w: 300,
			h: 300
		}
	}

	// [5]
	getGeometry(shape: ICardShape) {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: true,
		})
	}

	setState(data : CardData ){
		this.state = data;
	}

	onComponentLoad(shape: ICardShape){
		this.setState(shape.meta.data as unknown as CardData);
	}

	// [6]
	component(shape: ICardShape) {
		this.onComponentLoad(shape);
		
		const bounds = this.editor.getShapeGeometry(shape).bounds
		const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.getIsDarkMode() })
		type ShapeWithMyMeta = TLShape & {
			 meta: { 
				label: string,
				updatedBy: string,
				updatedAt: string,
				data: CardData |any 
			} 
		}

		const onlySelectedShape = this.editor.getOnlySelectedShape() as ShapeWithMyMeta | null
		const editorContext = this.editor;

		function update(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, state : CardData | any) {
			if (onlySelectedShape) {
				const { id, type, meta } = onlySelectedShape
				editorContext.updateShapes([
					{ 
						id, 
						type,
						meta: { 
							...meta, 
							lastInput: e.currentTarget.value,
							data: state
							} 
						},
				])
			}
		}
		// function updateUrl(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, url: string) {
		// 	if (onlySelectedShape) {
		// 		const { id, type, meta } = onlySelectedShape
		// 		editorContext.updateShapes([
		// 			{ 
		// 				id, 
		// 				type,
		// 				props: {
		// 					...CardShapeUtil.props,
		// 					url: url
		// 				}
		// 			}
		// 		])
		// 	}
		// }

		//[a]
		// eslint-disable-next-line react-hooks/rules-of-hooks
		//const [url, setUrl] = this.setState(shape.meta.url? shape.meta.url : "");
		//console.log(shape.meta)
		return (
			
			<>
			<HTMLContainer
				id={shape.id}
				style={{
					background: 'white',
					borderRadius: 25,
					border: '1px  black',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					pointerEvents: 'all',
					boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'
				}}
			>

				<TextField 
					variant="standard" 
					label="Title" 
					value={this.state?.title}
					sx={{mb: 5, width: '85%'}}
						onChange={(event)=>{
							this.setState({...this.state, title: event.target.value})
							update(event, this.state);
						}}>
				</TextField>

				{/* <div>
					<h1 style={{marginBottom:'10px'}}> {this.state.title} </h1>
				</div> */}
				<TextField 
					label="Notes"
					value={this.state?.notes}
					multiline
					maxRows={4}
					sx={{mb: 5, width: '85%'}}
					onChange={(event)=>{
						this.setState({...this.state, notes: event.target.value})
						update(event, this.state);
					}}
				/>

				<TextField 
					variant="outlined" 
					value={this.state?.url}
					label="URL" 
					sx={{mb: 5, width: '85%'}}
						onChange={(event)=>{
							console.log(this.state)
							//console.log(event.target.value)
							//setUrl(event.target.value)
							this.setState({...this.state, url: event.target.value})
							update(event, this.state);
						} }>
				</TextField>
        
				
        
			</HTMLContainer>
			</>)
	}

	// [7]
	indicator(shape: ICardShape) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}

	// [8]
	override onResize: TLOnResizeHandler<ICardShape> = (shape, info) => {
		return resizeBox(shape, info)
	}

	onBeforeCreate?: TLOnBeforeCreateHandler<ICardShape> = (next) =>{
		console.log("BEFORE CREATE", next)
	}

	onClick?: TLOnClickHandler<ICardShape> = (shape)=>{

	}

}
/* 
A utility class for the card shape. This is where you define the shape's behavior, 
how it renders (its component and indicator), and how it handles different events.

[1]
A validation schema for the shape's props (optional)
Check out card-shape-props.ts for more info.

[2]
Migrations for upgrading shapes (optional)
Check out card-shape-migrations.ts for more info.

[3]
Letting the editor know if the shape's aspect ratio is locked, and whether it 
can be resized or bound to other shapes. 

[4]
The default props the shape will be rendered with when click-creating one.

[5]
We use this to calculate the shape's geometry for hit-testing, bindings and
doing other geometric calculations. 

[6]
Render method — the React component that will be rendered for the shape. It takes the 
shape as an argument. HTMLContainer is just a div that's being used to wrap our text 
and button. We can get the shape's bounds using our own getGeometry method.
	
- [a] Check it out! We can do normal React stuff here like using setState.
   Annoying: eslint sometimes thinks this is a class component, but it's not.

- [b] You need to stop the pointer down event on buttons, otherwise the editor will
	   think you're trying to select drag the shape.

[7]
Indicator — used when hovering over a shape or when it's selected; must return only SVG elements here

[8]
Resize handler — called when the shape is resized. Sometimes you'll want to do some 
custom logic here, but for our purposes, this is fine.
*/