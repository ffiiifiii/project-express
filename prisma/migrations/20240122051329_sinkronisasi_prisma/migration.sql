/*
  Warnings:

  - You are about to drop the column `rowNumber` on the `seats` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `seats` DROP FOREIGN KEY `Seats_eventId_fkey`;

-- AlterTable
ALTER TABLE `seats` DROP COLUMN `rowNumber`,
    ADD COLUMN `rowNum` VARCHAR(191) NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `seats` ADD CONSTRAINT `seats_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Events`(`eventId`) ON DELETE RESTRICT ON UPDATE CASCADE;
