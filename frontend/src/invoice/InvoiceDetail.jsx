import {useParams} from "react-router-dom";
import {useGetInvoice} from "../hooks/useInvoiceApi.js";
import Loading from "../components/Loading.jsx";
import {useState} from "react";

const InvoiceDetail = () => {
    const {invoiceId} = useParams()
    const [color, setColor] = useState("#6de10e")

    const {data: invoice, isLoading} = useGetInvoice(invoiceId)
    const {} = useGetItems(invoiceId)

    console.log({invoice})

    if (isLoading) {
        return <Loading/>
    }
    return (
        <div className={'p-8 flex flex-col gap-4 sm:gap-8 sm:flex-row'}>
            <section className={`w-full sm:w-5/6 flex flex-col gap-2 p-4`}>
                <div className={'flex gap-2 items-center'}>
                    <h1 className={'text-neutral-300 text-lg font-medium'}>Pdf</h1>
                    <h1 className={'text-neutral-300 text-lg font-medium'}>Link</h1>
                    <h1 className={'text-neutral-300 text-lg font-medium'}>Email</h1>
                </div>

                {/*Pdf generator*/}
                <div style={{borderTopColor: color}} className={' border-t-4 rounded-md flex flex-col gap-4 p-4'}>
                    {/*MY Information*/}
                    <div className={'flex flex-col self-start gap-2 rounded-md '}>
                        <p>From : {invoice?.user.username}</p>
                        <p>Email: {invoice?.user.email}</p>
                    </div>

                    {/*Client Information*/}
                    <div className={'flex flex-col self-end rounded-md  gap-2'}>
                        <p>Client Name: {invoice?.client.name}</p>
                        <p>Client Email: {invoice?.client.email}</p>
                        <p>Client Phone: {invoice?.client.phone}</p>
                    </div>

                    {/*Items Info*/}
                    <div className={'flex flex-col'}>
                        <h2>Tittle: {invoice?.title}</h2>
                        <p>{invoice?.description}</p>
                    </div>
                </div>
            </section>

            {/*Right Section*/}
            <section className={'w-full sm:w-1/6 h-fit flex flex-col gap-2 border border-neutral-500 p-3 rounded-md'}>
                <div className={'flex gap-2 items-center'}>
                    <label className={'text-neutral-400'}>Color</label>
                    <input
                        type={'color'}
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>

                <div className={'text-neutral-400'}>Tax rate: <span
                    className={'font-bold text-neutral-200'}>{invoice?.taxRate}</span></div>
                <div className={'text-neutral-400'}>Discount: <span
                    className={'font-bold text-neutral-200'}>{invoice?.discountRate}</span></div>
                <div className={'text-neutral-400'}>Currency: <span
                    className={'font-bold text-neutral-200'}>{invoice?.currency}</span></div>
                <div className={'text-neutral-400 capitalize'}>Status: <span
                    className={'font-bold text-neutral-200'}>{invoice?.status}</span></div>
                <div className={'text-neutral-400 capitalize'}>Payment: <span
                    className={'font-bold text-neutral-200'}>{invoice?.paymentStatus}</span></div>
                <div className={'text-neutral-400 capitalize'}>Method: <span
                    className={'font-bold text-neutral-200'}>{invoice?.paymentMethod}</span></div>
            </section>
        </div>
    );
};

export default InvoiceDetail;