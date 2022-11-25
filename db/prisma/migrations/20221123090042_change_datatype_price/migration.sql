/*
  Warnings:

  - You are about to alter the column `price` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "pages" INTEGER NOT NULL DEFAULT 1,
    "isbn" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Book" ("id", "isbn", "pages", "price", "title", "views") SELECT "id", "isbn", "pages", "price", "title", "views" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_title_isbn_key" ON "Book"("title", "isbn");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
