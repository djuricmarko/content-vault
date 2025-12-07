-- Add a nullable password_hash column for credentials sign-in
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'password_hash'
  ) THEN
    ALTER TABLE "users" ADD COLUMN "password_hash" text;
  END IF;
END $$;
