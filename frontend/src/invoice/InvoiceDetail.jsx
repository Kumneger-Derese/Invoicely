import {useParams} from "react-router-dom";
import {useGetInvoice} from "../hooks/useInvoiceApi.js";
import Loading from "../components/Loading.jsx";

const InvoiceDetail = () => {
    const {invoiceId} = useParams()

    const {data: invoice, isLoading} = useGetInvoice(invoiceId)

    if (isLoading) {
        return <Loading/>
    }
    return (
        <div>
            <h1>Invoice Detail</h1>
            <p>lororem </p>
            <p>{
                JSON.stringify(invoice, null, 2)
            }</p>
        </div>
    );
};

export default InvoiceDetail;