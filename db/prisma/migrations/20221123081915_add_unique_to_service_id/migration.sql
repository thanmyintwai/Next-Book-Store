/*
  Warnings:

  - A unique constraint covering the columns `[serviceId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Profile_provider_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "Profile_serviceId_key" ON "Profile"("serviceId");
