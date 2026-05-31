import { prisma } from "../config/prisma.js";

const calculateInvoice = async (invoiceId) => {
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
  });

  const items = await prisma.invoiceItem.findMany({
    where: { invoiceId },
  });

  const taxRate = invoice.taxRate;
  const discountRate = invoice.discountRate;

  const subTotal = items.reduce(
    (acc, cur) => (acc += cur.quantity * cur.price),
    0,
  );

  const taxAmount = (subTotal * (taxRate / 100)).toFixed(2);
  const discountAmount = (subTotal * (discountRate / 100)).toFixed(2);

  const totalAmount = subTotal + taxAmount - discountAmount;

  const calculationData = await prisma.invoice.update({
    where: { id: invoiceId },
    data: { subTotal, totalAmount },
  });

  return {
    calculationData,
    taxAmount,
    discountAmount,
    subTotal,
    totalAmount,
  };
};

export { calculateInvoice };
