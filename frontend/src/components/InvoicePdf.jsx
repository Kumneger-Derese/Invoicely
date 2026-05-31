import {
  Document,
  Page,
  StyleSheet,
  Text,
  Tspan,
  View,
} from "@react-pdf/renderer";
import { FormatDate } from "../utils/formatDate";
import { HiUserCircle } from "react-icons/hi2";

const InvoicePdf = ({ invoice }) => {
  console.log({ invoice });
  const { country, city, street } = invoice.client.address;

  return (
    <Document author="invoicely">
      <Page
        style={styles.page}
        orientation="portrait"
        size={"A4"}
        id={invoice?.id}
      >
        <View>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.header.title}>Invoice.</Text>
            <Text style={styles.header.name}>{invoice?.client?.name}</Text>
          </View>

          {/* Invoice date and Number */}
          <View style={styles.date}>
            <Text>Invoice Number: {invoice?.invoiceNumber}</Text>
            <Text>Date: {FormatDate(invoice?.issueDate)}</Text>
            <Text>Due Date: {FormatDate(invoice?.dueDate)}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 8,
            }}
          >
            {/* Sender */}
            <View style={{ fontSize: 12, flexDirection: "column", rowGap: 4 }}>
              <Text style={styles.limeTitle}>From:</Text>
              <Text>
                <Tspan style={styles.darkTitle}>Name: </Tspan>
                {invoice?.user?.username}
              </Text>

              <Text>
                <Tspan style={styles.darkTitle}>Email: </Tspan>
                {invoice?.user?.email}
              </Text>
            </View>

            {/* Receiver */}
            <View style={{ fontSize: 12, flexDirection: "column", rowGap: 4 }}>
              <Text style={styles.limeTitle}>To client:</Text>
              <Text>
                <Tspan style={styles.darkTitle}>Name:</Tspan>
                <HiUserCircle />
                {invoice?.client?.name}
              </Text>
              <Text>
                <Tspan style={styles.darkTitle}>Phone: </Tspan>
                {invoice?.client?.phone}
              </Text>

              <Text>
                <Tspan style={styles.darkTitle}>Email: </Tspan>
                {invoice?.client?.email}
              </Text>

              <Text>
                <Tspan style={styles.darkTitle}>Address: </Tspan>
                {country},{city},{street}
              </Text>
            </View>
          </View>

          {/* Invoice Title */}
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 12 }}>
              <Tspan style={styles.darkTitle}>Title: </Tspan>
              {invoice?.title}
            </Text>
          </View>

          {/* Items List */}
          <View>
            <View style={styles.tableHeader}>
              <Text style={{ flex: 4, fontSize: 12 }}>Item</Text>
              <Text style={{ flex: 1.5, fontSize: 12 }}>Qty</Text>
              <Text style={{ flex: 3, fontSize: 12 }}>Price</Text>
              <Text style={{ flex: 2, fontSize: 12 }}>Amount</Text>
              <Text style={{ flex: 8, fontSize: 12 }}>Description</Text>
            </View>

            {invoice?.items?.map((item) => (
              <View style={styles.row} key={item?.id}>
                <Text
                  style={{ flex: 4, fontSize: 12, textTransform: "capitalize" }}
                >
                  {item.title}
                </Text>
                <Text style={{ flex: 1.5, fontSize: 12 }}>{item.quantity}</Text>
                <Text style={{ flex: 3, fontSize: 12 }}>
                  <Tspan style={styles.currency}>{invoice?.currency}</Tspan>{" "}
                  {item.price}
                </Text>
                <Text style={{ flex: 2, fontSize: 12 }}>
                  {item.price * item?.quantity}
                </Text>
                <Text style={{ flex: 8, fontSize: 12 }}>
                  {item.description}
                </Text>
              </View>
            ))}
          </View>

          <View
            style={{
              fontSize: 12,
              flexDirection: "column",
              rowGap: 4,
              paddingVertical: 8,
            }}
          >
            <View style={{ flexDirection: "row", columnGap: 8 }}>
              <Text>
                <Tspan style={styles.darkTitle}>Tax: </Tspan>
                {invoice?.taxAmount}
              </Text>

              <Text>
                <Tspan style={styles.darkTitle}>Discount: </Tspan>
                {invoice?.discountAmount}
              </Text>
            </View>

            {/* Total and Subtotal */}
            <View style={{ flexDirection: "row", columnGap: 8 }}>
              <Text>
                <Tspan style={styles.darkTitle}>Subtotal: </Tspan>
                {invoice?.subTotal}
              </Text>

              <Text>
                <Tspan style={styles.darkTitle}>Total: </Tspan>
                {invoice?.totalAmount.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* FOOTER */}
        <View style={{ flexDirection: "column", rowGap: 4 }}>
          <Text style={styles.darkTitle}>
            <Tspan style={styles.limeTitle}>Payment method</Tspan>:{" "}
            {invoice?.paymentMethod}
          </Text>

          <Text style={styles.darkTitle}>
            <Tspan style={styles.limeTitle}>Payment status</Tspan>:{" "}
            {invoice?.paymentStatus}
          </Text>

          <Text style={{ color: "darkgray", fontSize: 12 }}>
            <Tspan style={styles.limeTitle}>Notes</Tspan>: {invoice?.notes}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  darkTitle: {
    color: "darkgray",
    fontSize: 12,
    textTransform: "capitalize",
  },
  limeTitle: { color: "lime", fontWeight: "bold" },
  tableHeader: {
    backgroundColor: "#212121",
    flexDirection: "row",
    columnGap: 20,
    marginBottom: 4,
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 6,
    fontWeight: "bold",
    color: "lime",
    textTransform: "uppercase",
  },
  page: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 32,
    border: "1px solid #9e9e9e",
    backgroundColor: "#424242",
    color: "white",
  },
  row: {
    flexDirection: "row",
    columnGap: 20,
    marginBottom: 4,
    alignItems: "flex-start",
    justifyContent: "space-between",
    color: "white",
    backgroundColor: "gray",
    padding: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 16,
    title: {
      fontSize: 60,
      color: "lime",
      fontWeight: "bold",
    },
    name: {
      fontWeight: "bold",
    },
  },
  date: {
    flexDirection: "row",
    fontSize: 12,
    color: "#fff6",
    marginBottom: 48,
    fontWeight: "bold",
    justifyContent: "flex-start",
    columnGap: 16,
    border: "lime solid 4px",
  },
  currency: {
    color: "#0008",
    fontWeight: "bold",
  },
});

export default InvoicePdf;
