import { Link } from "react-router-dom"
import Loading from "../components/Loading"
import { HiOutlineBell, HiOutlinePlusCircle } from 'react-icons/hi2'
import { useGetNotificationsCount } from "../hooks/useNotificationApi"
import { useDeleteInvoice, useGetInvoices } from "../hooks/useInvoiceApi"

const InvoiceList = () => {
  const { data: invoiceData, isLoading } = useGetInvoices()
  const { data: notificationCount } = useGetNotificationsCount()
  const deleteInvoiceMutation = useDeleteInvoice()


  const handleInvoiceDelete = (id) => {
    deleteInvoiceMutation.mutate(id)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="p-8">
      <div className="flex justify-between px-4 mb-6 items-center">
        <h1 className="text-2xl font-bold text-lime-500">InvoiceList</h1>

        <div className="flex gap-x-4 items-center">
          <Link to={'/notifications'} className="text-neutral-300 relative hover:text-lime-500" title="Notification">
            <HiOutlineBell size={28} />
            <span className="absolute -top-2 -right-2 text-sm font-bold py-.5 px-2 rounded-full bg-white text-neutral-900">{notificationCount}</span>
          </Link>

          <Link to={'/create-invoice'} className="text-neutral-300" title="Create Client">
            <HiOutlinePlusCircle size={28} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {
          invoiceData?.map((invoice) => (
            <div key={invoice.id} className="p-4 bg-neutral-700 rounded-md flex flex-col gap-y-1">
              <h1>{invoice.title}</h1>
              <p>{invoice.notes}</p>
              <p>{invoice.issueDate}</p>

              <p>{invoiceData.paymentMethod}</p>

              {/* Action Button */}
              <div className="flex gap-x-4 items-center">
                <Link to={`/edit-invoice/${invoice?.id}`} className="px-6 py-2 mt-4 rounded-md bg-lime-400 text-center font-semibold text-neutral-900">Edit</Link>

                <button
                  onClick={() => handleInvoiceDelete(invoice.id)}
                  className="px-6 py-2 mt-4 rounded-md bg-red-900 text-center font-semibold text-neutral-100">Delete</button>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default InvoiceList







