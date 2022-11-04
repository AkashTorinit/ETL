/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react'
import dynamic from "next/dynamic";
import { Paper, TableContainer, Table, TableBody, TablePagination } from '@mui/material'
import { isEmpty, map } from 'lodash'
import { CustomTableProps, Order } from '../../../backend/customTable/customTable'
// import TableHeader from './TableHeader'
import PaginationActions from './PaginationActions'
// import TableTitle from './TableTitle'
// import TableRowLoader from './TableRowLoader'
// import TableRowData from './TableRowData'
// import EmptyRowFiller from './EmptyRowFiller'
const TableHeader = dynamic(() => import("./TableHeader"));
// const PaginationActions = dynamic(() => import("./PaginationActions"));
const TableTitle = dynamic(() => import("./TableTitle"));
const TableRowLoader = dynamic(() => import("./TableRowLoader"));
const TableRowData = dynamic(() => import("./TableRowData"));
const EmptyRowFiller = dynamic(() => import("./EmptyRowFiller"));

/* TODO: Error handling */
const CustomTable = ({
  tableTitle,
  isLoading = false,
  triggerReloadRows,
  api,
  formatRowData,
  handleSearch,
  headCells,
  defaultSortOrder = 'asc',
  defaultSortColumn,
  setShowMoreButton,
  handleClick
} : CustomTableProps) => {
  const [loading, setLoading] = useState(isLoading)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [totalRecords, setTotalRecords] = useState(0)
  const [order, setOrder] = useState<Order>(defaultSortOrder)
  const [orderBy, setOrderBy] = useState(defaultSortColumn)
  const [page, setPage] = useState(1)
  const [rows, setRows] = useState([])
  const [emptyRows, setEmptyRows] = useState(0)
  const [selected, setSelected] = React.useState<any[]>([])
  useEffect(() => {
    // Avoid a layout jump when reaching the last page with empty rows.
    setEmptyRows(page > 1 ? Math.max(0, (0 + page) * rowsPerPage - totalRecords) : 0)
  }, [page, rowsPerPage, totalRecords])
  const handleRequestSort = (_event:any, property:any) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }
  const handleChangePage = (_event:any, newPage:any) => {
    setPage(newPage + 1)
  }
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const rowPerPageNumber:any = event.target
    setRowsPerPage(rowPerPageNumber.value)
  }
  const fetchRowsData = useCallback(({ sort_column, sort_type, page, filters }: { sort_column:any, sort_type:any, page:any, filters:any }) => {
    setLoading(true)
    const data:any = {
      sort_column,
      sort_type,
      page,
      rowsPerPage
    }
    if (!isEmpty(filters)) {
      // eslint-disable-next-line no-return-assign
      filters.forEach((filter:any) => data[filter.id] = filter.search)
      data.page = 1
    }
    const promise = api(data)
    promise
      .then((res:any) => {
        const fetchedData = res.data
    
        setLoading(false)
        if (!isEmpty(fetchedData)) {
          setTotalRecords(fetchedData.totalRecords)
          setPage(fetchedData.page)
          const rowsData:any = map(fetchedData.records, row => formatRowData(row))
         
          setRows(rowsData)
        }
      })
      .catch((e:any) => {
        setLoading(false)
      })
  }, [formatRowData, api, rowsPerPage])
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n:any) => n.projectId)
      setSelected(newSelecteds)
      setShowMoreButton && setShowMoreButton(newSelecteds ? newSelecteds.length : 0, true)
      return
    }
    setShowMoreButton && setShowMoreButton(0, false)
    setSelected([])
  }
  const onRowCheckboxClick = (projectId: string) => {
    const selectedIndex = selected.indexOf(projectId)
    let newSelected: any[] = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, projectId)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    if (newSelected.length > 0) setShowMoreButton && setShowMoreButton(newSelected.length, true)
    if (newSelected.length === 0) setShowMoreButton && setShowMoreButton(0, false)
    setSelected(newSelected)
  }
  const isSelected = (name: string) => selected.indexOf(name) !== -1
  useEffect(() => {
    const filters = headCells.filter(cell => !isEmpty(cell.search))
    fetchRowsData({ sort_column: orderBy, sort_type: order, page, filters })
  }, [headCells, orderBy, order, page, fetchRowsData, triggerReloadRows, rowsPerPage])
  return (
        <Paper elevation={0} square sx={{width:'100%'}}>
            {tableTitle && <TableTitle totalRecords={totalRecords} title={tableTitle} />}
            <TableContainer>
                <Table
                    sx={{ width:{md:'1150px'},overflowX:'auto',marginRight:'auto',marginLeft:'auto' }}
                    size={'small'}
                >
                    <TableHeader
                        headCells={headCells}
                        
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        handleSearch={handleSearch}
                        rowCount={totalRecords}
                        onSelectAllClick={handleSelectAllClick}
                        numSelected={selected.length}
                    />
                    <TableBody>
                    {loading
                      ? (
                            <TableRowLoader headCells={headCells} rowsPerPage={rowsPerPage} />
                        )
                      : (
                            <>
                                <TableRowData headCells={headCells} rows={rows} order={order} orderBy={orderBy} onRowCheckboxClick={onRowCheckboxClick} isSelected={isSelected} handleClick={handleClick} />
                                <EmptyRowFiller headCells={headCells} emptyRows={emptyRows} />
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
              component='div'
              labelDisplayedRows={({ from, to }) => `Showing ${from} to ${to} of ${totalRecords}`}
              count={totalRecords ? totalRecords : 0}
              page={page - 1}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 15, 20]}
              onRowsPerPageChange={handleRowsPerPageChange}
              ActionsComponent={PaginationActions}
            />
            {/* <TableBottom /> */}
        </Paper>
  )
}
export default React.memo(CustomTable)