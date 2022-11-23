-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "pages" INTEGER NOT NULL DEFAULT 1,
    "isbn" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "socialId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    CONSTRAINT "Profile_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "postCode" TEXT,
    "city" TEXT,
    "country" TEXT
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderById" TEXT NOT NULL,
    "orderDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'Progress',
    "total" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Order_orderById_fkey" FOREIGN KEY ("orderById") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_BookToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BookToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BookToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_isbn_key" ON "Book"("title", "isbn");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_customerId_key" ON "Profile"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToOrder_AB_unique" ON "_BookToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToOrder_B_index" ON "_BookToOrder"("B");
