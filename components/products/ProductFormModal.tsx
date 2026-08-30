import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { api } from "@/lib/api"

const productSchema = z.object({
  name: z.string().min(1, "ต้องระบุชื่อ"),
  price: z.coerce.number().min(0),
  stock: z.coerce.number().int().min(0),
  category: z.string().min(1),
  is_active: z.boolean(),
  description: z.string().optional(),
})

type ProductForm = z.infer<typeof productSchema>

export function ProductFormModal({ open, onOpenChange, product }: any) {
  const form = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: "", price: 0, stock: 0, category: "", is_active: true, description: "" }
  })

  useEffect(() => {
    if (product) form.reset(product)
    else form.reset()
  }, [product, form])

  const onSubmit = async (values: ProductForm) => {
    if (product) await api.put(`/products/${product.id}`, values)
    else await api.post("/products", values)
    toast.success(product ? "อัปเดตแล้ว" : "สร้างแล้ว")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>{product ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField name="name" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>ชื่อสินค้า</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField name="category" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>หมวดหมู่</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="เลือกหมวด" /></SelectTrigger></FormControl>
                  <SelectContent><SelectItem value="food">อาหาร</SelectItem><SelectItem value="drink">เครื่องดื่ม</SelectItem></SelectContent>
                </Select><FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField name="price" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>ราคา</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="stock" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>สต็อก</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField name="description" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>รายละเอียด</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>
            )} />
            <FormField name="is_active" control={form.control} render={({ field }) => (
              <FormItem className="flex items-center justify-between"><FormLabel>เปิดใช้งาน</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>
            )} />
            <Button type="submit" className="w-full">บันทึก</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
