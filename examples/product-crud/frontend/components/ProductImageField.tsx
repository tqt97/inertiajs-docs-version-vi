import type { InertiaFormProps } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'
import type { ProductFormData } from './ProductForm'

type Props = {
  form: InertiaFormProps<ProductFormData>
  existingImageUrl?: string | null
}

export function ProductImageField({ form, existingImageUrl = null }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const objectUrlRef = useRef<string | null>(null)
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    }
  }, [])

  const previewUrl = localPreviewUrl ?? (form.data.remove_image ? null : existingImageUrl)

  function clearObjectUrl() {
    if (!objectUrlRef.current) return

    URL.revokeObjectURL(objectUrlRef.current)
    objectUrlRef.current = null
  }

  function chooseImage(file: File | null) {
    clearObjectUrl()

    if (file) {
      objectUrlRef.current = URL.createObjectURL(file)
      setLocalPreviewUrl(objectUrlRef.current)
    } else {
      setLocalPreviewUrl(null)
    }

    form.setData('image', file)
    form.setData('remove_image', false)
    form.clearErrors('image')
  }

  function removeImage() {
    const hasNewImage = form.data.image instanceof File

    clearObjectUrl()
    setLocalPreviewUrl(null)
    form.setData('image', null)
    form.setData('remove_image', hasNewImage ? false : Boolean(existingImageUrl))
    form.clearErrors('image')

    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-4">
        <div className="h-28 w-28 overflow-hidden rounded-xl border bg-neutral-50">
          {previewUrl ? (
            <img src={previewUrl} alt="Ảnh xem trước sản phẩm" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center p-3 text-center text-xs text-neutral-400">
              Chưa có ảnh
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <label htmlFor="image" className="block text-sm font-medium">Ảnh sản phẩm</label>
          <input
            ref={inputRef}
            id="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => chooseImage(event.target.files?.[0] ?? null)}
            className="block w-full text-sm"
          />
          <p className="text-xs text-neutral-500">JPG, PNG hoặc WebP. Tối đa 2 MB.</p>

          {previewUrl && (
            <button type="button" onClick={removeImage} className="text-sm text-red-700 underline">
              {existingImageUrl && !form.data.image ? 'Xóa ảnh hiện tại' : 'Bỏ ảnh đã chọn'}
            </button>
          )}
        </div>
      </div>

      {form.errors.image && <p className="text-sm text-red-600">{form.errors.image}</p>}

      {form.progress && (
        <div className="space-y-1" aria-live="polite">
          <div className="flex justify-between text-xs text-neutral-500">
            <span>Đang tải ảnh lên…</span>
            <span>{form.progress.percentage}%</span>
          </div>
          <progress value={form.progress.percentage} max={100} className="h-2 w-full" />
        </div>
      )}
    </div>
  )
}
