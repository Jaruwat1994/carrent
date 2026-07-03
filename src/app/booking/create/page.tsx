import { Suspense } from 'react'
import { BookingCreateForm } from './BookingCreateForm'

export default function BookingCreatePage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">กำลังโหลด...</div>}>
      <BookingCreateForm />
    </Suspense>
  )
}
