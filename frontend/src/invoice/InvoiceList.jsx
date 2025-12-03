import { Link } from "react-router-dom"

const InvoiceList = () => {
  return (
    <div>
      <div>
        <h1>InvoiceList</h1>

        <Link to={'/create-invoice'}>Create Invoice</Link>
      </div>
    </div>
  )
}

export default InvoiceList
