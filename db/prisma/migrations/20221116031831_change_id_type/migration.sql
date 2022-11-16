/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL
);
INSERT INTO "new_Customer" ("address", "city", "country", "email", "firstName", "id", "lastName", "postCode") SELECT "address", "city", "country", "email", "firstName", "id", "lastName", "postCode" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "pages" INTEGER NOT NULL DEFAULT 1,
    "isbn" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Book" ("id", "isbn", "pages", "price", "title", "views") SELECT "id", "isbn", "pages", "price", "title", "views" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_title_isbn_key" ON "Book"("title", "isbn");
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderById" TEXT NOT NULL,
    "orderDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'Progress',
    "total" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Order_orderById_fkey" FOREIGN KEY ("orderById") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("id", "orderById", "orderDate", "status", "total") SELECT "id", "orderById", "orderDate", "status", "total" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new__BookToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BookToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BookToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__BookToOrder" ("A", "B") SELECT "A", "B" FROM "_BookToOrder";
DROP TABLE "_BookToOrder";
ALTER TABLE "new__BookToOrder" RENAME TO "_BookToOrder";
CREATE UNIQUE INDEX "_BookToOrder_AB_unique" ON "_BookToOrder"("A", "B");
CREATE INDEX "_BookToOrder_B_index" ON "_BookToOrder"("B");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
