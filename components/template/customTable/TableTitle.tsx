import { number, string } from "prop-types"
import { TableTitleContainer, TableTitleText } from "./style"
import { TableTitleProps } from "../../../backend/customTable/customTable"

const TableTitle = ({ totalRecords, title }: TableTitleProps) => {
    return (
        <TableTitleContainer
            sx={{
                pl: { sm: 2 },
                pr: { sm: 2 },
                minHeight: { sm: "58px" }
            }}
        >
            <TableTitleText id="tableTitle">
                {totalRecords} {title}
            </TableTitleText>
        </TableTitleContainer>
    )
}

TableTitle.propTypes = {
    totalRecords: number.isRequired,
    title: string.isRequired
}

export default TableTitle
