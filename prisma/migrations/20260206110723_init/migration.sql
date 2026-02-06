-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weight" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "dogId" TEXT NOT NULL,

    CONSTRAINT "Weight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Health" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dogId" TEXT NOT NULL,

    CONSTRAINT "Health_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dog" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "assignedName" TEXT,
    "passport" TEXT,
    "bornAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Weight" ADD CONSTRAINT "Weight_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "Dog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Health" ADD CONSTRAINT "Health_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "Dog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dog" ADD CONSTRAINT "Dog_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
