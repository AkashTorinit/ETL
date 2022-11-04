import React from 'react'
export interface headCells {
    id: string,
    label: string,
    search: string
}

export type Order = 'asc' | 'desc' | undefined

interface HandleSearchType {
    id: string,
    label: string,
    search: string
}

export interface TableHeaderProps{
    headCells: headCells[],
    handleSearch:(x: HandleSearchType[]) => void,
    order: Order,
    orderBy: string,
    onRequestSort: (_event:any, property:any) => void,
    rowCount: number,
    numSelected: number,
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface CustomTableProps {
    tableTitle?: string,
    isLoading?: boolean,
    triggerReloadRows: number,
    api:any,
    formatRowData: any,
    handleSearch: any,
    headCells: headCells[],
    defaultSortOrder: Order,
    defaultSortColumn: string,
  handleClick:any,
    setShowMoreButton?: (selected: number, value: boolean) => void
}

export interface PaginationActionsProps {
    count: number,
    onPageChange: any,
    page: number,
    rowsPerPage: number
}

export interface TableTitleProps {
    totalRecords: number,
    title: string
}

export interface TableRowLoaderProps {
    rowsPerPage : number,
    headCells: headCells[]
}

export interface TableRowDataProps {
    headCells: any
    rows: any,
    order: string | undefined,
    orderBy: string,
    onRowCheckboxClick: (x:string) => void,
    isSelected: (x: string) => boolean
    handleClick:any
}

export interface EmptyRowFillerProps {
    emptyRows: any,
    headCells:any
}
