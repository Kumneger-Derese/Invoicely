import {Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import {HiOutlinePlusCircle} from "react-icons/hi2";
import {useDeleteInvoice, useGetInvoices} from "../hooks/useInvoiceApi";
import {useState} from "react";
import Modal from "../components/Modal.jsx";
import EmptySection from "../components/EmptySection.jsx";
import SearchAnyThing from "../components/SearchAnyThing.jsx";

const InvoiceList = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInvoiceDeleteModalOpen, setIsInvoiceDeleteModalOpen] =
    useState(false);

  const { data: invoiceData, isLoading } = useGetInvoices();
  const deleteInvoiceMutation = useDeleteInvoice();

  const handleInvoiceDelete = (id) => {
    deleteInvoiceMutation.mutate(id, {
      onSuccess: () => setIsInvoiceDeleteModalOpen(false),
    });
  };

  const handleOpenDeleteInvoiceModal = (id) => {
    setSelectedId(id);
    setIsInvoiceDeleteModalOpen(true);
  };

  const handleSearch = () => {
    setSearchTerm("");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-8">
      <Navbar />
      <div className="flex justify-between px-2 mb-6 items-center">
        {/*title dot*/}
        <h1 className="text-lg text-lime-100 flex gap-x-1 items-center">
          <span className="size-2 rounded-full animate-pulse bg-lime-400"></span>
          <span>({invoiceData?.length}) Invoices</span>
        </h1>

        {/* Search functionality */}
        <SearchAnyThing
          label={"invoice"}
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          setSearchTerm={setSearchTerm}
        />

        {/*create invoice btn*/}
        <div className="flex gap-x-4 items-center">
          <Link
            to={"/create-invoice"}
            className="text-neutral-300 box"
            title="Create Client"
          >
            <HiOutlinePlusCircle
              size={32}
              className="text-lime-400 hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/*Todo Not found or empty array page*/}
        {invoiceData?.length === 0 ? (
          <EmptySection
            title={"No invoice Found."}
            description={"Hey, create invoice to get started."}
          />
        ) : (
          invoiceData?.map((invoice) => (
            <div
              key={invoice.id}
              className="p-4 box border border-neutral-600 bg-neutral-700 rounded-md flex flex-col gap-y-1"
            >
              <h1 className="text-xl  font-semibold text-neutral-200 line-clamp-1">
                {invoice.title}
              </h1>

              <p className="text-neutral-500 text-sm mb-4">
                {invoice.invoiceNumber}
              </p>

              <div className="flex items-center justify-between">
                <p className="capitalize">
                  For:{" "}
                  <span className="font-semibold">{invoice?.client?.name}</span>
                </p>

                <p className="text-neutral-300">
                  Currency:{" "}
                  <span className="font-semibold">{invoice?.currency}</span>
                </p>
              </div>

              {/* Info */}
              <div className="flex capitalize items-center justify-between gap-y-2 text-neutral-300">
                <p>Method: {invoice.paymentMethod}</p>
                <p>Status: {invoice.paymentStatus}</p>
              </div>
              <hr className="text-neutral-500 mb-2" />

              {/* date */}

              <p className="mt-1">
                <span className="font-bold">Due:</span>{" "}
                {new Date(invoice.dueDate).toDateString()}
              </p>

              {/* Prices */}
              <div className="flex gap-x-4 items-center text-lime-100">
                <p>
                  <span className="font-semibold">Subtotal:</span>{" "}
                  {invoice.subTotal}
                </p>
                <p>
                  <span className="font-semibold">Total:</span>{" "}
                  {invoice.totalAmount}
                </p>
              </div>

              {/* Action Button */}
              <div className="flex gap-x-4 items-center">
                <Link
                  to={`/edit-invoice/${invoice?.id}`}
                  className="px-6 py-2 mt-4 rounded-md bg-neutral-50 text-center font-medium text-neutral-900 hover:scale-105 transition-transform duration-300 hover:font-semibold"
                >
                  Edit
                </Link>

                <Link
                  to={`/invoice-detail/${invoice?.id}`}
                  className="px-6 py-2 mt-4 rounded-md bg-neutral-900 text-center font-medium text-neutral-50 hover:scale-105 transition-transform duration-300 hover:font-semibold"
                >
                  Detail
                </Link>

                <button
                  onClick={() => handleOpenDeleteInvoiceModal(invoice.id)}
                  className="px-4.5 py-1.5 mt-4 rounded-md bg-red-400 text-center font-medium text-red-50 hover:scale-105 transition-transform duration-300 hover:font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/*  Modal to delete invoice*/}
      {isInvoiceDeleteModalOpen && (
        <Modal
          setIsModalOpen={setIsInvoiceDeleteModalOpen}
          title={"Are you sure to delete invoice?"}
          size={"small"}
        >
          <div className={"flex gap-x-6"}>
            <button
              onClick={() => setIsInvoiceDeleteModalOpen(false)}
              className="px-6 py-2 mt-4 rounded-md bg-neutral-900 text-center hover:bg-neutral-800 text-neutral-100"
            >
              Cancel
            </button>

            <button
              onClick={() => handleInvoiceDelete(selectedId)}
              className="px-6 py-2 mt-4 rounded-md bg-red-600 text-center hover:bg-red-800 text-neutral-100"
            >
              {deleteInvoiceMutation.isPending ? "Deleting.." : "Delete"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default InvoiceList;
