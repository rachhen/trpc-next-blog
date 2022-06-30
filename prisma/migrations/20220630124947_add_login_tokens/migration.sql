-- CreateTable
CREATE TABLE "login_tokens" (
    "id" VARCHAR(50) NOT NULL,
    "redirect" VARCHAR(255) NOT NULL DEFAULT '/',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(50) NOT NULL,

    CONSTRAINT "login_tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "login_tokens" ADD CONSTRAINT "login_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
