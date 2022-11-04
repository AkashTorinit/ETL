import { Box, Button, Stack, styled, Typography } from "@mui/material"
import React from "react"

const TableBottom = () => {
    const StyledButtons = styled(Button)({
        margin: "0px 5px",
        border: "2px solid #8C1586",
        textTransform: "capitalize",
        fontWeight: "800",
        fontFamily: "futura-pt",
        fontSize: "15px",
        color: "black",
        padding: "0px 5px"
    })

    return (
        <Box style={{ borderTop: "1px solid rgba(224, 224, 224, 1)", padding: "16px 30px" }}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Box>
                    <Typography>Showing 1 to 10 of 100</Typography>
                </Box>
                <Box>
                    <Stack direction='row' alignItems='center' justifyContent='center'>
                        <StyledButtons variant='outlined'>Back</StyledButtons>
                        <StyledButtons variant='outlined'>1</StyledButtons>
                        <StyledButtons variant='outlined'>2</StyledButtons>
                        <StyledButtons variant='outlined'>3</StyledButtons>
                        <StyledButtons variant='outlined'>Next</StyledButtons>
                    </Stack>
                </Box>
                <Box>
                    <Typography>6 rows per page</Typography>
                </Box>
            </Stack>
        </Box>
    )
}

export default TableBottom
