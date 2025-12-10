const generateInvoiceNumber = async (prisma) => {
  const year = new Date().getFullYear();

  const lastInvoice = await prisma.invoice.findFirst({
    where: {
      invoiceNumber: {
        startsWith: `INV-${year}-`,
      },
    },
    orderBy: {
      invoiceNumber: "desc",
    },
  });

  let nextSeq = 1;

  if (lastInvoice) {
    const parts = lastInvoice.invoiceNumber.split("-");
    const lastSeq = parseInt(parts[2], 10);
    nextSeq = lastSeq + 1;
  }
  const padded = String(nextSeq).padEnd(4, "0");
  return `INV-${year}-${padded}`;
};

export { generateInvoiceNumber };
