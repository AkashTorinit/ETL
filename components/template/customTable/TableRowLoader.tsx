import { map } from "lodash"
import { Skeleton, TableRow } from "@mui/material"
import { BodyCell } from "./style"
import { TableRowLoaderProps } from "../../../backend/customTable/customTable"

const TableRowLoader = ({ rowsPerPage, headCells }: TableRowLoaderProps) => {
    return (
        <>
            {
                map(Array.from(Array(rowsPerPage).keys()), i => {
                    return (
                        <TableRow key={`row-${i}`}>
                            {map(headCells, cell => (
                                <BodyCell key={cell.id}><Skeleton variant='text' /></BodyCell>
                            ))}
                        </TableRow>
                    )
                })
            }
        </>
    )
}

export default TableRowLoader
