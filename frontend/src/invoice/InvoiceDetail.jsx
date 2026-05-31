import {Link, useParams} from "react-router-dom";
import {useGetInvoice} from "../hooks/useInvoiceApi.js";
import Loading from "../components/Loading.jsx";
import {useState} from "react";
import CreateItem from "../items/CreateItem.jsx";
import ItemsList from "../items/ItemsList.jsx";
import Navbar from "../components/Navbar.jsx";

const InvoiceDetail = () => {
  const { invoiceId } = useParams();
  const [color, setColor] = useState("#6de10e");

  const { data: invoice, isLoading } = useGetInvoice(invoiceId);
  console.log(invoice);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="p-8 ">
      <Navbar />
      <div className={"flex flex-col gap-4 sm:gap-8 sm:flex-row"}>
        <section className={`w-full sm:w-5/6 flex flex-col gap-2 p-4`}>
          {/*Invoice Detail Navbar*/}
          <div className={"flex justify-between items-center mb-2"}>
            <div className={"flex gap-4 font-medium items-center"}>
              <Link
                to={`/pdf/${invoiceId}`}
                className={
                  "text-neutral-300 hover:text-lime-300 text-lg font-semibold"
                }
              >
                Pdf
              </Link>
              <h1
                className={
                  "text-neutral-300 hover:text-lime-300 text-lg font-semibold"
                }
              >
                Link
              </h1>
              <h1
                className={
                  "text-neutral-300 hover:text-lime-300 text-lg font-semibold"
                }
              >
                Email
              </h1>
            </div>

            <Link
              to={`/edit-invoice/${invoiceId}`}
              className={
                "px-4 py-1 box rounded-md bg-neutral-600 text-neutral-100 border border-neutral-500"
              }
            >
              Edit Invoice
            </Link>
          </div>

          {/*Pdf generator*/}
          <div
            style={{ borderTopColor: color, borderBottomColor: color }}
            className={" border-y-4 rounded-md flex flex-col gap-4 p-4"}
          >
            {/*MY Information*/}
            <div className={"flex flex-col self-start gap-2 rounded-md "}>
              <p>From : {invoice?.user.username}</p>
              <p>Email: {invoice?.user.email}</p>
            </div>

            {/*Client Information*/}
            <div className={"flex flex-col self-end rounded-md  gap-2"}>
              <p>Client Name: {invoice?.client.name}</p>
              <p>Client Email: {invoice?.client.email}</p>
              <p>Client Phone: {invoice?.client.phone}</p>
            </div>

            {/*Items Info*/}
            <div className={"flex flex-col"}>
              <h2>Tittle: {invoice?.title}</h2>
              <p>{invoice?.description}</p>
            </div>

            {/* Create Items */}
            <div className="mb-8">
              <CreateItem invoiceId={invoiceId} />
            </div>

            {/* list Items */}
            <div className="flex flex-col py-4">
              <h1 className="font-semibold text text-center text-xl text-lime-200">
                Invoice Items
              </h1>

              <ItemsList invoiceId={invoiceId} />
            </div>

            <div className="text-xl border-t-2 py-4">
              <div>
                {" "}
                <span className="text-neutral-400">Subtotal = </span>{" "}
                {invoice.subTotal}
              </div>
              <div>
                {" "}
                <span className="text-neutral-400">Total Amount = </span>
                {invoice.totalAmount.toFixed(2)}
              </div>
            </div>

            {/* Notes */}
            <div>
              <h1 className="font-semibold italic text-2xl mt-8">Notes:</h1>
              <p className="text-sm text-neutral-500">{invoice?.notes}</p>
            </div>
          </div>
        </section>

        {/*Right Section*/}
        <section
          className={
            "w-full box sm:w-1/6 mt-12 sticky top-40 h-fit flex flex-col gap-2 border border-neutral-500 p-3 rounded-md"
          }
        >
          <div className={"flex gap-2 items-center"}>
            <label className={"text-neutral-400"}>Color</label>
            <input
              type={"color"}
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className={"text-neutral-400"}>
            Tax rate:{" "}
            <span className={"font-bold text-neutral-200"}>
              {invoice?.taxRate}
            </span>
          </div>

          <div className={"text-neutral-400"}>
            Discount:{" "}
            <span className={"font-bold text-neutral-200"}>
              {invoice?.discountRate}
            </span>
          </div>

          <div className={"text-neutral-400"}>
            Currency:{" "}
            <span className={"font-bold text-neutral-200"}>
              {invoice?.currency}
            </span>
          </div>

          <div className={"text-neutral-400 capitalize"}>
            Status:{" "}
            <span className={"font-bold text-neutral-200"}>
              {invoice?.status}
            </span>
          </div>
          <div className={"text-neutral-400 capitalize"}>
            Payment:{" "}
            <span className={"font-bold text-neutral-200"}>
              {invoice?.paymentStatus}
            </span>
          </div>
          <div className={"text-neutral-400 capitalize"}>
            Method:{" "}
            <span className={"font-bold text-neutral-200"}>
              {invoice?.paymentMethod}
            </span>
          </div>
        </section>
      </div>
    </section>
  );
};

export default InvoiceDetail;
