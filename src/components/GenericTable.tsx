type ColDef<T extends Record<string, any>, K extends keyof T> = {
    header: string
    key: K
}

type GenericTableProps<T extends Record<string, any>, K extends keyof T> = {
    data: T[]
    columns: ColDef<T, K>[]
}

type TableHeaderProps<T extends Record<string, any>, K extends keyof T> = {
    columns: ColDef<T, K>[]
}

type TableRowProps<T extends Record<string, any>, K extends keyof T> = {
    data: T[]
    columns: ColDef<T, K>[]
}

function TableRows<T extends Record<string, any>, K extends keyof T>({
    data,
    columns,
}: TableRowProps<T, K>) {
    const rows = data.map((row, ndx) => {
        return (
            <tr key={`row-${ndx}`}>
                {columns.map((col, index) => {
                    const val = row[col.key]
                    if (!Array.isArray(val)) return <td key={`cell-${index}`}>{val}</td>
                    return (
                        <td key={`cell-${index}`}>
                            {(val as unknown[]).map((value, index) => (
                                <li key={`val-${index}`}>{value}</li>
                            ))}
                        </td>
                    )
                })}
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}

function TableHeader<T extends Record<string, any>, K extends keyof T>({
    columns,
}: TableHeaderProps<T, K>) {
    return (
        <thead>
            <tr>
                {columns.map((column, index) => (
                    <th key={`head-${index}`}>{column.header}</th>
                ))}
            </tr>
        </thead>
    )
}

export default function GenericTable<T extends Record<string, any>, K extends keyof T>({
    data,
    columns,
}: GenericTableProps<T, K>) {
    return (
        <div className="wrap-generic-table">
            <table className="generic-table ff-serif">
                <TableHeader columns={columns} />
                <TableRows data={data} columns={columns} />
            </table>
        </div>
    )
}
