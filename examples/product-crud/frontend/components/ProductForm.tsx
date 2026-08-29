import type { InertiaFormProps } from '@inertiajs/react'
import { useRef } from 'react'
import { ProductImageField } from './ProductImageField'

export type ProductFormData = {
  name: string
  sku: string
  price: string
  is_active: boolean
  image: File | null
  remove_image: boolean
}

type Props = {
  form: InertiaFormProps<ProductFormData>
  submitLabel: string
  onSubmit: () => void
  existingImageUrl?: string | null
}

export function ProductForm({ form, submitLabel, onSubmit, existingImageUrl = null }: Props) {
  const nameRef = useRef<HTMLInputElement>(null)

  function update<K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) {
    form.setData(key, value)
    form.clearErrors(key)
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <fieldset disabled={form.processing} className="space-y-6 disabled:opacity-60">
        <ProductImageField form={form} existingImageUrl={existingImageUrl} />

        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">Tên</label>
          <input
            ref={nameRef}
            id="name"
            value={form.data.name}
            aria-invalid={Boolean(form.errors.name)}
            onChange={(event) => update('name', event.target.value)}
            className="w-full rounded-md border px-3 py-2"
          />
          {form.errors.name && <p className="mt-1 text-sm text-red-600">{form.errors.name}</p>}
        </div>

        <div>
          <label htmlFor="sku" className="mb-1 block text-sm font-medium">SKU</label>
          <input
            id="sku"
            value={form.data.sku}
            aria-invalid={Boolean(form.errors.sku)}
            onChange={(event) => update('sku', event.target.value.toUpperCase())}
            className="w-full rounded-md border px-3 py-2"
          />
          {form.errors.sku && <p className="mt-1 text-sm text-red-600">{form.errors.sku}</p>}
        </div>

        <div>
          <label htmlFor="price" className="mb-1 block text-sm font-medium">Giá (VND)</label>
          <input
            id="price"
            inputMode="numeric"
            value={form.data.price}
            aria-invalid={Boolean(form.errors.price)}
            onChange={(event) => update('price', event.target.value.replace(/\D/g, ''))}
            className="w-full rounded-md border px-3 py-2"
          />
          {form.errors.price && <p className="mt-1 text-sm text-red-600">{form.errors.price}</p>}
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.data.is_active}
            onChange={(event) => update('is_active', event.target.checked)}
          />
          Đang hoạt động
        </label>
      </fieldset>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={form.processing || !form.isDirty}
          className="rounded-md bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {form.processing ? 'Đang lưu…' : submitLabel}
        </button>

        {form.processing && (
          <button type="button" onClick={() => form.cancel()} className="text-sm underline">
            Hủy request
          </button>
        )}

        {form.isDirty && <span className="text-sm text-amber-700">Có thay đổi chưa lưu</span>}
        {form.recentlySuccessful && <span className="text-sm text-green-700">Đã lưu</span>}
      </div>
    </form>
  )
}
