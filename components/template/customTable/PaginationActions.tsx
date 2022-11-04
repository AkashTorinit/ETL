import { IconButton } from "@mui/material"
import { FirstPage, LastPage, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import { CurrentPage, PaginationNavBox } from "./style"
import { PaginationActionsProps } from "../../../backend/customTable/customTable"

const PaginationActions = ({ count, page, rowsPerPage, onPageChange }: PaginationActionsProps) => {

  
    const handleFirstPageButtonClick = (event:any) => {
        onPageChange(event, 0)
    }

    const handleBackButtonClick = (event:any) => {
        onPageChange(event, page - 1)
    }

    const handleNextButtonClick = (event:any) => {
        
        onPageChange(event, page + 1)
    }

    const handleLastPageButtonClick = (event:any) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
        <PaginationNavBox>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                <FirstPage />
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                <KeyboardArrowLeft />
            </IconButton>

            <CurrentPage>{page + 1}</CurrentPage>

            <IconButton
                onClick={handleNextButtonClick}
                // disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPage />
            </IconButton>
        </PaginationNavBox>
    )
}

export default PaginationActions
