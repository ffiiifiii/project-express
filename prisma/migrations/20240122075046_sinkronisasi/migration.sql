/*
  Warnings:

  - You are about to alter the column `seatNum` on the `seats` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `seats` MODIFY `seatNum` INTEGER NOT NULL DEFAULT 0;
