/*
  Warnings:

  - Added the required column `accountNumber` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountNumber" TEXT NOT NULL,
    "balance" REAL NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("balance", "id", "userId") SELECT "balance", "id", "userId" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_accountNumber_key" ON "Account"("accountNumber");
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
