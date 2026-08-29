import { Head, Link, useForm } from '@inertiajs/react'
import { ProductForm, type ProductFormData } from '../../components/ProductForm'
import type { Product } from '../../types/product'

type Props = { product: Product }

export default function Edit({ product }: Props) {
  const form = useForm<ProductFormData>(`EditProduct:${product.id}`, {
    name: product.name,
    sku: product.sku,
    price: String(product.price),
    is_active: product.is_active,
    image: null,
    remove_image: false,
  })

  function submit() {
    form
      .transform((data) => ({
        ...data,
        _method: 'put',
        price: Number(data.price),
      }))
      .post(`/products/${product.id}`, {
        forceFormData: true,
        preserveScroll: 'errors',
      })
  }

  return (
    <>
      <Head title={`Sửa ${product.name}`} />
      <main className="mx-auto max-w-2xl space-y-6 p-6">
        <Link href="/products" prefetch>← Danh sách</Link>
        <h1 className="text-2xl font-semibold">Sửa sản phẩm</h1>
        <ProductForm
          form={form}
          submitLabel="Lưu thay đổi"
          onSubmit={submit}
          existingImageUrl={product.image_url}
        />
      </main>
    </>
  )
}
