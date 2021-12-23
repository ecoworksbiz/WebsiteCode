import React from 'react'
import { Grid } from '@material-ui/core'
import { MTableBodyRow } from 'material-table'


const CustomRow = (props) => {
 
    const overlayStyle = { width: "100%", position: "absolute" }
    
    return <Grid style={{ display: "contents" }} 
   
    >
      <Grid align="right" style={overlayStyle}>

           <button className="AddImage">Add Image</button>
        </Grid>
        <MTableBodyRow {...props} />
    </Grid>

}

export default CustomRow