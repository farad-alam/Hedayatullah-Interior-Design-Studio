import { VideoReelForm } from '@/dashboard/forms/VideoReelForm'
import { getVideoReelAction } from '@/core/actions/video.actions'
import { notFound } from 'next/navigation'

export default async function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getVideoReelAction(id)

  if (!data) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <VideoReelForm initialData={data} />
    </div>
  )
}
