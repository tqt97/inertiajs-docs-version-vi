import { Head, Link, useForm } from '@inertiajs/react'
import { ProductForm, type ProductFormData } from '../../components/ProductForm'

export default function Create() {
  const form = useForm<ProductFormData>('CreateProduct', {
    name: '',
    sku: '',
    price: '',
    is_active: true,
    image: null,
    remove_image: false,
  })

  function submit() {
    form
      .transform((data) => ({ ...data, price: Number(data.price) }))
      .post('/products', {
        forceFormData: true,
        preserveScroll: 'errors',
        onError: () => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      })
  }

  return (
    <>
      <Head title="Tạo sản phẩm" />
      <main className="mx-auto max-w-2xl space-y-6 p-6">
        <Link href="/products" prefetch>← Danh sách</Link>
        <h1 className="text-2xl font-semibold">Tạo sản phẩm</h1>
        <ProductForm form={form} submitLabel="Tạo sản phẩm" onSubmit={submit} />
      </main>
    </>
  )
}
