-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serviceId" TEXT NOT NULL,
    "provider" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "password" TEXT,
    "customerId" TEXT,
    CONSTRAINT "Profile_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("customerId", "email", "firstName", "id", "lastName", "password", "provider", "serviceId") SELECT "customerId", "email", "firstName", "id", "lastName", "password", "provider", "serviceId" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_serviceId_key" ON "Profile"("serviceId");
CREATE UNIQUE INDEX "Profile_customerId_key" ON "Profile"("customerId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
