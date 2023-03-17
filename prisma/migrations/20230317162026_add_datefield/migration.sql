/*
  Warnings:

  - Added the required column `date` to the `HabbitEvent` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HabbitEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "habbitId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "HabbitEvent_habbitId_fkey" FOREIGN KEY ("habbitId") REFERENCES "Habbit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HabbitEvent" ("createdAt", "habbitId", "id", "updatedAt") SELECT "createdAt", "habbitId", "id", "updatedAt" FROM "HabbitEvent";
DROP TABLE "HabbitEvent";
ALTER TABLE "new_HabbitEvent" RENAME TO "HabbitEvent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
