-- CreateTable
CREATE TABLE "HabbitEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "habbitId" TEXT NOT NULL,
    CONSTRAINT "HabbitEvent_habbitId_fkey" FOREIGN KEY ("habbitId") REFERENCES "Habbit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
