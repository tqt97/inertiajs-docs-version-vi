import { Deferred, Head, Link, router, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import type { Paginated, Product, ProductFilters, ProductStats } from '../../types/product'

type Props = {
  products: Paginated<Product>
  filters: ProductFilters
  stats?: ProductStats
}

type SharedProps = {
  flash?: { success?: string; error?: string }
}

export default function Index({ products, filters, stats }: Props) {
  const { flash } = usePage<SharedProps>().props
  const [search, setSearch] = useState(filters.search)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (search === filters.search) return

      router.get('/products', { ...filters, search, page: 1 }, {
        only: ['products', 'filters'],
        preserveState: true,
        preserveScroll: true,
        replace: true,
      })
    }, 300)

    return () => window.clearTimeout(timeout)
  }, [search, filters])

  function changeFilter(patch: Partial<ProductFilters>) {
    router.get('/products', { ...filters, ...patch, page: 1 }, {
      only: ['products', 'filters'],
      preserveState: true,
      preserveScroll: true,
      replace: true,
    })
  }

  function toggle(product: Product) {
    router
      .optimistic((pageProps) => {
        const current = pageProps.products as Paginated<Product>

        const currentStats = pageProps.stats as ProductStats | undefined
        const delta = product.is_active ? -1 : 1

        return {
          products: {
            ...current,
            data: current.data.map((item) =>
              item.id === product.id ? { ...item, is_active: !item.is_active } : item,
            ),
          },
          ...(currentStats
            ? {
                stats: {
                  ...currentStats,
                  active: currentStats.active + delta,
                  inactive: currentStats.inactive - delta,
                },
              }
            : {}),
        }
      })
      .patch(`/products/${product.id}/toggle`, {}, {
        preserveScroll: true,
        only: ['products'],
        onSuccess: () => router.reload({ only: ['stats'] }),
      })
  }

  function destroy(product: Product) {
    if (!window.confirm(`Xóa “${product.name}”?`)) return

    router.delete(`/products/${product.id}`, {
      preserveScroll: true,
      only: ['products'],
    })
  }

  return (
    <>
      <Head title="Sản phẩm" />
      <main className="mx-auto max-w-6xl space-y-6 p-6">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Sản phẩm</h1>
            <p className="text-sm text-neutral-500">CRUD tham chiếu Inertia.js v3</p>
          </div>
          <Link href="/products/create" prefetch cacheFor="1m" className="rounded-md bg-black px-4 py-2 text-white">
            Tạo sản phẩm
          </Link>
        </header>

        {flash?.success && <div role="status" className="rounded-md border p-3">{flash.success}</div>}
        {flash?.error && <div role="alert" className="rounded-md border p-3 text-red-700">{flash.error}</div>}

        <Deferred
          data="stats"
          fallback={<div className="h-20 animate-pulse rounded-md bg-neutral-100" />}
          rescue={({ reloading }) => (
            <div className="rounded-md border p-4 text-sm">
              Không tải được thống kê.{' '}
              <button disabled={reloading} onClick={() => router.reload({ only: ['stats'] })} className="underline">
                {reloading ? 'Đang thử lại…' : 'Thử lại'}
              </button>
            </div>
          )}
        >
          {stats && (
            <section className="grid grid-cols-3 gap-3">
              <Stat label="Tổng" value={stats.total} />
              <Stat label="Hoạt động" value={stats.active} />
              <Stat label="Tạm ẩn" value={stats.inactive} />
            </section>
          )}
        </Deferred>

        <section className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tìm tên hoặc SKU…"
            className="rounded-md border px-3 py-2"
          />

          <select
            value={filters.status}
            onChange={(event) => changeFilter({ status: event.target.value as ProductFilters['status'] })}
            className="rounded-md border px-3 py-2"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Tạm ẩn</option>
          </select>

          <select
            value={`${filters.sort}:${filters.direction}`}
            onChange={(event) => {
              const [sort, direction] = event.target.value.split(':') as [ProductFilters['sort'], ProductFilters['direction']]
              changeFilter({ sort, direction })
            }}
            className="rounded-md border px-3 py-2"
          >
            <option value="created_at:desc">Mới nhất</option>
            <option value="name:asc">Tên A → Z</option>
            <option value="price:asc">Giá tăng dần</option>
            <option value="price:desc">Giá giảm dần</option>
          </select>
        </section>

        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-left">
            <thead className="border-b bg-neutral-50">
              <tr>
                <th className="p-3">Sản phẩm</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Giá</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.data.map((product) => (
                <tr key={product.id} className="border-b last:border-0">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-lg border bg-neutral-50">
                        {product.image_url ? (
                          <img src={product.image_url} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[10px] text-neutral-400">No image</div>
                        )}
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-3">{product.sku}</td>
                  <td className="p-3">{product.price.toLocaleString('vi-VN')} ₫</td>
                  <td className="p-3">
                    <button type="button" onClick={() => toggle(product)} className="underline">
                      {product.is_active ? 'Hoạt động' : 'Tạm ẩn'}
                    </button>
                  </td>
                  <td className="space-x-3 p-3 text-right">
                    <Link href={`/products/${product.id}/edit`} prefetch cacheFor="30s">Sửa</Link>
                    <button type="button" onClick={() => destroy(product)} className="text-red-700">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav className="flex flex-wrap gap-2" aria-label="Phân trang">
          {products.links.map((link, index) =>
            link.url ? (
              <Link
                key={`${link.label}-${index}`}
                href={link.url}
                only={['products', 'filters']}
                preserveScroll
                preserveState
                className={`rounded border px-3 py-1 ${link.active ? 'bg-black text-white' : ''}`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ) : (
              <span key={`${link.label}-${index}`} className="rounded border px-3 py-1 opacity-40" dangerouslySetInnerHTML={{ __html: link.label }} />
            ),
          )}
        </nav>
      </main>
    </>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border p-4">
      <div className="text-sm text-neutral-500">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}
