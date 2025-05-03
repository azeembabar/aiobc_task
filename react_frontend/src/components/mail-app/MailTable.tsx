import React, { useState, useMemo, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllEmailData, sendAnEmail } from "@/services/mail-service";
import { toast } from "sonner";
import { Loader } from "lucide-react";

interface Email {
  id: number;
  recipient_email: string;
  subject: string;
  body: string;
  status: string;
  created_at: string;
}

type DataTableProps = {
  refreshKey: number;
  onSent?: () => void;
};

const DataTable : React.FC<DataTableProps> = ({ refreshKey, onSent }) => {
  const [tableLoading, setTableLoading] = useState(false);
  const [allEmails, setAllEmails] = useState<Email[]>([]); 
  const [globalFilter, setGlobalFilter] = useState("");
  const [sendLoading, setSendLoading] = useState(false);  

  useEffect(() => {
    const getEmails = async () => {
      try {
        setTableLoading(true);
        const data = await getAllEmailData();
        setAllEmails(data || []);
      } catch (error: any) {
        toast.error("Failed to fetch emails.", {
          description: error?.message,
          position:"top-right"
        });
        setAllEmails([]);
      } finally {
        setTableLoading(false);
      }
    };
    getEmails();
  }, [refreshKey]);

  const columns = useMemo<ColumnDef<Email, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "recipient_email",
        header: "Recipient Email",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "subject",
        header: "Subject",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "body",
        header: "Body",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => info.getValue(),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Button
            size="sm"
            variant="outline"
            className=" cursor-pointer"
            onClick={() => handleAction(row.original.id)}
          >
            Send
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: allEmails,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
  });

  const handleAction = async (rowId: number) => {
    try {
      setSendLoading(true);
      const res = await sendAnEmail(rowId);
      if (res) {
        setSendLoading(false);
        toast.success(res?.message,{position:"top-right"});
        onSent?.();
      }
    } catch (error: any) {
      toast.error("Failed to send email,", { description: error.message,position:"top-right" });
      setSendLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Emails</CardTitle>
        {allEmails?.length > 0 && (
          <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm mt-2 sm:mt-0"
          />
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
  {sendLoading ? (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        <Loader className="animate-spin mx-auto" />
      </TableCell>
    </TableRow>
  ) : table.getRowModel().rows.length ? (
    table.getRowModel().rows.map((row) => (
      <TableRow key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        {tableLoading ? "Loading..." : "No results."}
      </TableCell>
    </TableRow>
  )}
</TableBody>

        </Table>
      </CardContent>
      {allEmails?.length > 0 && (
        <CardFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground mb-2 sm:mb-0">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex flex-wrap gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </Button>
            {table.getPageOptions().map((pageIdx) => (
              <Button
                key={pageIdx}
                variant={
                  pageIdx === table.getState().pagination.pageIndex
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => table.setPageIndex(pageIdx)}
              >
                {pageIdx + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}


export default DataTable;