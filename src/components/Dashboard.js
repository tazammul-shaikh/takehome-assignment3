import { useRef, useMemo } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';

import { COLUMNS } from '../constant/columns';
import classes from './Dashboard.module.css';

const Dashboard = props => {
    const songNameRef = useRef();

    const columns = useMemo(() => COLUMNS,[]);

    const data = useMemo(() => props.musicList,[props.musicList]);

    const tableInstance = useTable(
        {
            columns,
            data
        },
        useSortBy,
        usePagination
    );
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageCount,
        state,
        gotoPage,
        prepareRow
    } = tableInstance;

    const { pageIndex } = state;

    return (
        <>
            <div className={classes.inputBlock}>
                <input type="text" placeholder='Search Song' ref={songNameRef} className={classes.input}/>
                <button onClick={() => props.onGetSong(songNameRef.current.value)} className={classes.button}>Get Song</button>
            </div>
            <table {...getTableProps} className={classes.table}>
                <thead>
                    {headerGroups.map((headerGroup, i) => (
                        <tr key={'headerGroups' + i} {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column, j) => (
                                    <th key={'column' + i + j} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? '▲' : '▼') : ''}
                                        </span>
                                    </th>
                                ))
                            }
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps}>
                    {page.map(((row,i) => {
                        prepareRow(row);
                        return (
                            <tr key={'rows' + i} {...row.getRowProps}>
                                {
                                    row.cells.map((cell, j) => (
                                        <td key={'cell'+i+j} {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    ))
                                }
                            </tr>
                        )
                    }))}
                </tbody>
            </table>
            <div style={{textAlign:'right'}}>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className={classes.pageButton}>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className={classes.pageButton}>{'<'}</button>
                <span className={classes.pageText}>
                    Page: <strong>{pageIndex + 1} of {pageCount}</strong>
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage} className={classes.pageButton}>{'>'}</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className={classes.pageButton}>{'>>'}</button>
            </div>
        </>
    );
}

export default Dashboard;