/*
  Warnings:

  - You are about to drop the column `amount` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `InvoiceItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - Added the required column `title` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "totalAmount" SET DEFAULT 0,
ALTER COLUMN "discountRate" SET DEFAULT 0,
ALTER COLUMN "subTotal" SET DEFAULT 0,
ALTER COLUMN "taxRate" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "InvoiceItem" DROP COLUMN "amount",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "total" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);
