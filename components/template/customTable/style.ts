import { styled, TableCell, TableSortLabel, Box, Toolbar } from "@mui/material"
export const TableTitleContainer = styled(Toolbar)(() => ({
    borderBottom: "0px"
}))

export const TableTitleText = styled("h5")(() => ({
    lineHeight: "22px",
    marginBottom: 0
}))

export const SortLabel = styled(TableSortLabel)(() => ({
    justifyContent: "space-between",
    color: "black",
    lineHeight: "21px",
    fontSize: "14px",
    fontWeight: 400,
    display: "flex",
    outline: "revert",

    "svg.MuiTableSortLabel-icon": {
        color: "black !important",

        "&.MuiTableSortLabel-iconDirectionAsc": { transform: "rotate(180deg)" },
        "&.MuiTableSortLabel-iconDirectionDesc": { transform: "scaleX(-1) rotate(0deg)" }
    }
}))

export const HeaderCell = styled(TableCell)(() => ({
    "&.firstCell": {
        paddingBottom: 0,
        borderBottom: 0,
        padding: "0px 25px"
    },
    "&:not(.firstCell)": {
        paddingBottom: "10px",
        paddingTop: "2px"
    },

    ":not(:first-of-type)": { borderLeft: "0px" },
    ".MuiInput-underline": {
        width: "100%",
        "&::after": {
            borderColor: "black"
        }
    }
}))

export const BodyCell = styled(TableCell)(() => ({
    padding: "20px 25px",
    fontFamily: "futura-pt",
   
}))

export const PaginationNavBox = styled(Box)(() => ({
    alignItems: "center",
    marginRight: "8px",
    display: "flex",

    ".MuiButtonBase-root": {
        marginRight: "16px",
        height: "24px",
        width: "24px"
    }
}))

export const CurrentPage = styled(Box)(() => ({
    marginRight: "16px",
    textAlign: "center",
    lineHeight: "24px",
    fontWeight: 600,
    height: "24px",
    width: "24px"
}))
