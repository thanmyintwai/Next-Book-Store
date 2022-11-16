-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "pages" INTEGER NOT NULL DEFAULT 1,
    "isbn" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Book" ("id", "isbn", "pages", "price", "title") SELECT "id", "isbn", "pages", "price", "title" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_title_isbn_key" ON "Book"("title", "isbn");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
