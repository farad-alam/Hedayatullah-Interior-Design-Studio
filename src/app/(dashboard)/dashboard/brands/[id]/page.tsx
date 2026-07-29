import { BrandLogoForm } from '@/dashboard/forms/BrandLogoForm'
import { getBrandLogoAction } from '@/core/actions/brand.actions'
import { notFound } from 'next/navigation'

export default async function EditBrandPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getBrandLogoAction(id)

  if (!data) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <BrandLogoForm initialData={data} />
    </div>
  )
}
