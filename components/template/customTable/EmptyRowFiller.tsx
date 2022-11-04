import { TableCell, TableRow } from "@mui/material"
import { EmptyRowFillerProps } from "../../../backend/customTable/customTable"

const EmptyRowFiller = ({ emptyRows, headCells }: EmptyRowFillerProps) => {
    return (
        emptyRows > 0
            ? (
                <TableRow style={{ height: (37) * emptyRows }}>
                    <TableCell colSpan={headCells.length} />
                </TableRow>
            )
            : <></>
    )
}

export default EmptyRowFiller
