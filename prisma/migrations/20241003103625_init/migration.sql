/*
  Warnings:

  - You are about to drop the column `password` on the `Users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "bio" TEXT,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME,
    "profile_image" TEXT
);
INSERT INTO "new_Users" ("bio", "created_at", "email", "id", "name", "profile_image", "updated_at") SELECT "bio", "created_at", "email", "id", "name", "profile_image", "updated_at" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
