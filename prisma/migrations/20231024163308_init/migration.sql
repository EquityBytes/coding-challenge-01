-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT,
    "address_line_1" TEXT NOT NULL,
    "address_line_2" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "county" TEXT,
    "country" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Delivery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "from_id" TEXT NOT NULL,
    "to_id" TEXT NOT NULL,
    CONSTRAINT "Delivery_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Delivery_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Webhook" (
    "url" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "delivery_id" INTEGER NOT NULL,
    CONSTRAINT "Webhook_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "Delivery" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ArticleToDelivery" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ArticleToDelivery_A_fkey" FOREIGN KEY ("A") REFERENCES "Article" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ArticleToDelivery_B_fkey" FOREIGN KEY ("B") REFERENCES "Delivery" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Webhook_delivery_id_key" ON "Webhook"("delivery_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToDelivery_AB_unique" ON "_ArticleToDelivery"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToDelivery_B_index" ON "_ArticleToDelivery"("B");
