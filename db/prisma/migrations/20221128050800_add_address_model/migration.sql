/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `customerId` on the `Profile` table. All the data in the column will be lost.
  - Made the column `email` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `provider` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Customer";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Addresses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "unit" INTEGER,
    "streetNumber" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postCode" INTEGER NOT NULL,
    "linkedToId" TEXT NOT NULL,
    CONSTRAINT "Addresses_linkedToId_fkey" FOREIGN KEY ("linkedToId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serviceId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT
);
INSERT INTO "new_Profile" ("email", "firstName", "id", "lastName", "password", "provider", "serviceId") SELECT "email", "firstName", "id", "lastName", "password", "provider", "serviceId" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_serviceId_key" ON "Profile"("serviceId");
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderById" TEXT NOT NULL,
    "orderDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'Progress',
    "total" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Order_orderById_fkey" FOREIGN KEY ("orderById") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("id", "orderById", "orderDate", "status", "total") SELECT "id", "orderById", "orderDate", "status", "total" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
