import { useEffect, useState } from 'react'
import { Tldraw, track, useEditor } from 'tldraw'
import 'tldraw/tldraw.css'
import { Box,Button,IconButton,Typography } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import exp from 'constants';
// [2]
export const CustomUi = track(() => {
	const editor = useEditor()
	const [expand, setExpanded] = useState(false);

	return (
		<Box className="menu" sx={{pointerEvents: 'all'}}>
			<Box className="custom-menu-container">
				<Box sx={{display: 'flex'}}>
					<Typography
					sx={{ padding: '5px', minWidth: 150, textAlign: 'left', alignSelf: 'center', fontSize: 22}}>
					Project title
					</Typography>
					<IconButton>
						<SettingsIcon 					
						onClick={() => {
							setExpanded(!expand)}
						}
						/>
					</IconButton>	
				</Box>
					

				<Box sx={{display: 'block' }}>
				{expand? 
						<Box >
							<Typography
								sx={{ padding: '5px',minWidth: 150, textAlign: 'left', alignSelf: 'center', fontSize: 22, color: '#ff2a1f'}}>
								Clear Project
							</Typography>
						</Box>
					:
						<></>
					}
				</Box>			
			</Box>	
		</Box>
	)
})