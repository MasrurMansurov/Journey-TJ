import { Box } from '@mui/material'

const Container = ({children}) => {
  return (
    <Box sx={{maxWidth: "1600px", padding: {lg:"5px 35px",md:"0px 20px "}, margin: "auto"}}>
        {children}
    </Box>
  )
}

export default Container
