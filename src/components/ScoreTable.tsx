/* eslint-disable react/jsx-key */
import { useMemo } from 'react'
import { TableOptions, useTable } from 'react-table'

type IScoreTable<T extends object> = TableOptions<T>

export default function ScoreTable<T extends object>({ data, columns }: IScoreTable<T>) {
    const tableData = useMemo(() => data, [])
    const columnsData = useMemo(() => columns, [])

    const tableInstance = useTable<T>({
        columns: columnsData,
        data: tableData,
    })

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance

    return (
        <table {...getTableProps()} className="ScoreTable ff-serif fw-400">
            <caption className="text-white">Leaderboard</caption>
            <thead className="text-grey">
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((col) => (
                            <th {...col.getHeaderProps()}>
                                <>{col.render('Header')}</>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()} className="text-white flow">
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr
                            {...row.getRowProps()}
                            className="ScoreTable__Row bg-blue-gray"
                        >
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        data-cell={cell.column.id}
                                    >
                                        <>{cell.render('Cell')}</>
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
