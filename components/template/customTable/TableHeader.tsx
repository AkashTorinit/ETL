import { Input, Box, TableHead, TableRow} from '@mui/material'
// import { Height, Search, Sort } from '@mui/icons-material'
import { visuallyHidden } from '@mui/utils'
// import { debounce } from 'lodash'

import { SortLabel, HeaderCell } from './style'

import { TableHeaderProps } from '../../../backend/customTable/customTable'

function TableHeader ({
  headCells,
  handleSearch,
  order,
  orderBy,
  onRequestSort,
  numSelected,
  rowCount,
  onSelectAllClick
}:TableHeaderProps) {
  const createSortHandler = (property:any) => (event:any) => onRequestSort(event, property)

  return (
    <TableHead style={{ boxShadow: '0px 5px 5px rgba(224, 224, 224, 1)', borderRadius: 0 }}>
        <TableRow>
            {headCells.map((headCell:any) => (
                <HeaderCell
                    key={headCell.id}
                    className={'firstCell'}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    <SortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                    >
                     
                        <p style={{ color:"#00AE8F",fontFamily: 'Steradian', fontSize: '1rem' }}>{headCell.label}</p>
                        {orderBy === headCell.id
                          ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descendings' : 'sorted ascendings'}
                            </Box>
                            )
                          : null}
                    </SortLabel>
                </HeaderCell>
            ))}
        </TableRow>
    </TableHead>
  )
}

export default TableHeader
