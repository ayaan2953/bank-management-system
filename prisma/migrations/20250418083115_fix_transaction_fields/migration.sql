/*
  Warnings:

  - You are about to drop the column `fromId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `toId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `fromAccountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toAccountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fromAccountId" TEXT NOT NULL,
    "toAccountId" TEXT NOT NULL,
    CONSTRAINT "Transaction_fromAccountId_fkey" FOREIGN KEY ("fromAccountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_toAccountId_fkey" FOREIGN KEY ("toAccountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "id") SELECT "amount", "id" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
