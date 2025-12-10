/* eslint-disable react-hooks/set-state-in-effect */
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetInvoice, useUpdateInvoice } from '../hooks/useInvoiceApi'
import { useGetClients } from '../hooks/useClientApi'
import { useEffect } from "react"

const EditInvoice = () => {
  const { invoiceId } = useParams()
  const [invoiceData, setInvoiceData] = useState({
    title: '',
    notes: '',
    taxRate: 0,
    discountRate: 0,
    currency: 'ETB',
    issueDate: '',
    dueDate: '',
    paymentMethod: 'bank',
    clientId: ''
  })

  const navigate = useNavigate()
  const updateInvoiceMutation = useUpdateInvoice()
  const { data: clients } = useGetClients()
  const { data: invoice } = useGetInvoice(invoiceId)

  useEffect(() => {
    if (invoice) {
      setInvoiceData((prev) => ({
        ...prev,
        title: invoice?.title,
        notes: invoice?.notes,
        currency: invoice?.currency,
        taxRate: invoice?.taxRate,
        discountRate: invoice?.discountRate,
        paymentMethod: invoice?.paymentMethod,
        issueDate: invoice?.issueDate,
        dueDate: invoice?.dueDate,
        clientId: invoice?.clientId
      }))
    }
  }, [invoice])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setInvoiceData((prev) => ({
      ...prev, [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { issueDate, dueDate, ...data } = invoiceData
    const isoIssueDate = new Date(issueDate).toISOString()
    const isoDueDate = new Date(dueDate).toISOString()

    updateInvoiceMutation.mutate({
      invoiceId,
      body: { ...data, issueDate: isoIssueDate, dueDate: isoDueDate }
    }, {
      onSuccess: () => {
        navigate('/invoices', { replace: true })
      }
    })
  }

  return (
    <div className="p-8">
      <h1 className="text-lime-500 font-bold text-xl mb-4 text-center">Edit Invoice</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-8 flex-wrap">
        {/* Left Side*/}
        <section className="flex flex-col gap-2 ">
          {/* Clients */}
          <div className="flex flex-col gap-2">
            <label htmlFor="clientId" className="font-semibold text-neutral-400">
              Client
            </label>
            <select
              name="clientId"
              value={invoiceData.clientId}
              onChange={handleInputChange}
              placeholder="payment method"
              className="w-full rounded-md p-2 border border-neutral-600 outline-none focus:border-lime-200 bg-neutral-800">
              {
                clients?.map((client) => (
                  <option key={client.id} value={client.id}>{client.name}</option>

                ))
              }
            </select>
          </div>

          {/* Title Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-semibold text-neutral-400">Title</label>
            <input type="text" name="title"
              value={invoiceData.title}
              onChange={handleInputChange}
              placeholder="Invoice title here..."
              className="w-full rounded-md p-2 border border-neutral-600 outline-none focus:border-lime-200"
            />
          </div>

          {/* Issue Date Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="issueDate" className="font-semibold text-neutral-400">Issue Date</label>
            <input type="date" name="issueDate"
              value={invoiceData.issueDate}
              onChange={handleInputChange}
              placeholder="Issue date here..."
              className="w-full rounded-md p-2 border border-neutral-600 outline-none focus:border-lime-200"
            />
          </div>


        </section>

        {/* Middle*/}
        <section className="flex flex-col gap-2">
          {/* Currency Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="currency" className="font-semibold text-neutral-400">Currency</label>
            <input type="text" name="currency"
              value={invoiceData.currency}
              onChange={handleInputChange}
              placeholder="ETB"
              className="w-full rounded-md p-2 border border-neutral-600 outline-none focus:border-lime-200"
            />
          </div>

          {/* Due Date Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="dueDate" className="font-semibold text-neutral-400">Due Date</label>
            <input type="date" name="dueDate"
              value={invoiceData.dueDate}
              onChange={handleInputChange}
              placeholder="Due date here..."
              className="w-full rounded-md p-2 border border-neutral-600 outline-none focus:border-lime-200 appearance-none"
            />
          </div>
          {/* Notes Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="notes" className="font-semibold text-neutral-400">Notes</label>
            <textarea
              name="notes"
              value={invoiceData.notes}
              onChange={handleInputChange}
              rows={1}
              placeholder="Notes here..."
              className="w-full rounded-md p-2 border border-neutral-600 outline-none focus:border-lime-200"
            />
          </div>

        </section>

        {/* Right Side */}
        <section className="flex h-fit flex-col gap-2 rounded-md">
          {/* Tax Rate Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="taxRate" className="font-semibold text-neutral-400">Tax rate</label>
            <input type="text" name="taxRate"
              value={invoiceData.taxRate}
              onChange={handleInputChange}
              placeholder="tax"
              className="w-full rounded-md p-2 border border-neutral-600 outline-none focus:border-lime-200"
            />
          </div>

          {/* Discount Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="discountRate" className="font-semibold text-neutral-400">Discount rate</label>
            <input type="text" name="discountRate"
              value={invoiceData.discountRate}
              onChange={handleInputChange}
              placeholder="discount"
              className="w-full rounded-md p-2 border border-neutral-600 outline-none focus:border-lime-200"
            />
          </div>

          {/* Payment Method Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="paymentMethod" className="font-semibold text-neutral-400">
              Payment method
            </label>
            <select
              name="paymentMethod"
              value={invoiceData.paymentMethod}
              onChange={handleInputChange}
              placeholder="payment method"
              className="w-full rounded-md p-2 border border-neutral-600 outline-none focus:border-lime-200 bg-neutral-800">
              <option value="bank">Bank</option>
              <option value="cash">Cash</option>
              <option value="chapa">Chapa</option>
            </select>
          </div>
        </section>

        <button
          className="px-8 py-2 rounded-md bg-lime-500 text-neutral-900 font-bold">
          {updateInvoiceMutation.isPending ? 'Processing' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default EditInvoice