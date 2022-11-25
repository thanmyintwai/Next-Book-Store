/*
  Warnings:

  - A unique constraint covering the columns `[provider,email]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Profile_provider_email_key" ON "Profile"("provider", "email");
