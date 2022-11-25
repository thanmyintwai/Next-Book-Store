/*
  Warnings:

  - You are about to drop the column `socialId` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serviceId" TEXT NOT NULL,
    "provider" TEXT,
    "customerId" TEXT NOT NULL,
    CONSTRAINT "Profile_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("customerId", "id", "provider") SELECT "customerId", "id", "provider" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_customerId_key" ON "Profile"("customerId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
