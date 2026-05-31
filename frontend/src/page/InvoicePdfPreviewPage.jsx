import { useParams } from "react-router-dom";
import InvoicePdf from "../components/InvoicePdf";
import Loading from "../components/Loading";
import { useGetInvoice } from "../hooks/useInvoiceApi";
import { PDFViewer } from "@react-pdf/renderer";

const InvoicePdfPreviewPage = () => {
  const { invoiceId } = useParams();
  const { data: invoice, isLoading } = useGetInvoice(invoiceId);

  if (isLoading) return <Loading />;

  return (
    <PDFViewer style={{ width: "100vw", minHeight: "100vh" }}>
      <InvoicePdf invoice={invoice} />
    </PDFViewer>
  );
};

export default InvoicePdfPreviewPage;
