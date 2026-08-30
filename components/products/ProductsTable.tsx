import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { MoreHorizontal, Plus, Search } from "lucide-react"
import { ProductFormModal } from "./ProductFormModal"
import { toast } from "sonner"
import { api } from "@/lib/api" // axios instance ของคุณ

type Product = {
  id: string
  name: string
  price: number
  stock: number
  category: string
  is_active: boolean
  description: string
}

export function ProductsTable() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ["products", search, page],
    queryFn: () => api.get("/products", { params: { q: search, page } }).then(res => res.data)
  })

  const handleDelete = async (id: string) => {
    await api.delete(`/products/${id}`)
    toast.success("ลบสินค้าแล้ว")
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>สินค้า</CardTitle>
        <Button onClick={() => { setEditing(null); setModalOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" /> เพิ่มสินค้า
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="ค้นหาสินค้า..." className="pl-8" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ชื่อ</TableHead>
                <TableHead>หมวดหมู่</TableHead>
                <TableHead>ราคา</TableHead>
                <TableHead>สต็อก</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}><TableCell colSpan={6}><Skeleton className="h-8 w-full" /></TableCell></TableRow>
                ))
              ) : (
                data?.items.map((p: Product) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.category}</TableCell>
                    <TableCell>฿{p.price.toLocaleString()}</TableCell>
                    <TableCell>{p.stock}</TableCell>
                    <TableCell>
                      <Badge variant={p.is_active ? "default" : "secondary"}>
                        {p.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => { setEditing(p); setModalOpen(true) }}>แก้ไข</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(p.id)}>ลบ</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationPrevious onClick={() => setPage(p => Math.max(1, p-1))} />
            <PaginationItem><PaginationLink>{page}</PaginationLink></PaginationItem>
            <PaginationNext onClick={() => setPage(p => p+1)} />
          </PaginationContent>
        </Pagination>
      </CardContent>

      <ProductFormModal open={modalOpen} onOpenChange={setModalOpen} product={editing} />
    </Card>
  )
}
