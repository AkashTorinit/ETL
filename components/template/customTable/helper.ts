import { map } from "lodash"

const descendingComparator = (a:any, b:any, orderBy:any) => {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

export const getComparator = (order:any, orderBy:any) => {
    return order === "desc"
        ? (a:any, b:any) => descendingComparator(a, b, orderBy)
        : (a:any, b:any) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
export const stableSort = (array:any, comparator:any) => {
    const stabilizedThis = map(array, (el: any, index: any) => [el, index])
    stabilizedThis.sort((a: number[], b: number[]) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) {
            return order
        }
        return a[1] - b[1]
    })
    return stabilizedThis.map((el: any[]) => el[0])
}
