import {
	HTMLContainer,
	Rectangle2d,
	ShapeUtil,
	TLBaseBoxShape,
	//TLOnBeforeCreateHandler,
	//TLOnClickHandler,
	//TLOnResizeHandler,
	TLShape,
	//TLShapeUtilFlag,
	getDefaultColorTheme,
	resizeBox,
} from '@tldraw/tldraw'
import * as React from "react"
import { cardShapeMigrations } from './cardShapeMigrations'
import { cardShapeProps } from './cardShapeProps'
import { ICardShape } from './cardShapeTypes'
import { TextField, Box, Button, Link,  } from '@mui/material'
import { CardData } from './cardData'
import DeleteIcon from '@mui/icons-material/Delete';
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
	override canResize = (_shape: ICardShape) => false
	//override canBind = (_shape: ICardShape) => true
	override hideRotateHandle = (_shape: ICardShape) => true

	// [4]
	getDefaultProps(): ICardShape['props'] {
		return {
			w: 500,
			h: 500,
			url: ''
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
		//console.log(shape)
		//const bounds = this.editor.getShapeGeometry(shape).bounds
		//const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.getIsDarkMode() })
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
		function updateUrl(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
			if (onlySelectedShape) {
				const { id, type, meta } = onlySelectedShape
				editorContext.updateShapes([
					{ 
						id, 
						type,
						props: {
							...shape.props,
							url: e.target.value
						}
					}
				])
			}
		}

		//[a]
		// eslint-disable-next-line react-hooks/rules-of-hooks
		//const [url, setUrl] = this.setState(shape.meta.url? shape.meta.url : "");
		//console.log(shape.meta)
		return (
			
			<HTMLContainer
				id={shape.id}
				style={{
					height: '500px',
					width: '500px',
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
					sx={{mb: 5, mt: 5, width: '80%'}}
						onChange={(event)=>{
							this.setState({...this.state, title: event.target.value})
							update(event, this.state);
						}}>
				</TextField>
				<TextField 
					label="Notes"
					value={this.state?.notes}
					multiline
					maxRows={4}
					sx={{mb: 5, width: '80%'}}
					onChange={(event)=>{
						this.setState({...this.state, notes: event.target.value})
						update(event, this.state);
					}}
				/>

				<TextField 
					variant="outlined" 
					value={this.state?.url}
					label="URL" 
					sx={{mb: 5, width: '80%'}}
					onChange={(event)=>{
						console.log(this.state)
						//console.log(event.target.value)
						//setUrl(event.target.value)
						this.setState({...this.state, url: event.target.value})
						//update(event, this.state);
						updateUrl(event)
					} }
				/>
				<DeleteIcon>
				<a 
					href="https://www.google.ca"
					target='_blank'
					rel="noreferrer"
					id='link'
					onPointerDown={(e: { stopPropagation: () => any }) => e.stopPropagation()}
					onTouchStart={(e: { stopPropagation: () => any }) => e.stopPropagation()}
					onTouchEnd={(e: { stopPropagation: () => any }) => e.stopPropagation()}
				>
					https://www.google.ca
				</a>
				</DeleteIcon>
				<Button 
					component={Link} 
					variant='outlined' 
					sx={{borderRadius: 25, marginTop: 2}}
					
					rel="noopener noreferrer"
					target="_blank"
					onClick={() =>{
						console.log("clicked")
						window.open(shape.props.url, '_blank', 'noopener,noreferrer');
					}}
					// [b] This is where we stop event propagation
					onPointerDown={(e: { stopPropagation: () => any }) => e.stopPropagation()}
					onTouchStart={(e: { stopPropagation: () => any }) => e.stopPropagation()}
					onTouchEnd={(e: { stopPropagation: () => any }) => e.stopPropagation()}
				>					
					{shape.props.url}
				</Button>

				{/* <a 
					href='https://www.google.ca'
					target="_blank"
					rel="noopener noreferrer"
				>
					https://www.google.ca
				</a> */}
        
			</HTMLContainer>)
	}

	// [7]
	indicator(shape: ICardShape) {
		console.log(shape.props)
		return <rect width={shape.props.w} height={shape.props.h} />
	}

	// [8]
	// override onResize: TLOnResizeHandler<ICardShape> = (shape: TLBaseBoxShape, info: any) => {
	// 	return resizeBox(shape, info)
	// }

	// onBeforeCreate?: TLOnBeforeCreateHandler<ICardShape> = (next: any) =>{
	// 	console.log("BEFORE CREATE", next)
	// }

	// onClick?: TLOnClickHandler<ICardShape> = (shape: TLBaseBoxShape)=>{

	// }

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