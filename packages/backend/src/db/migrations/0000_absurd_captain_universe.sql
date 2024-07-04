CREATE TABLE IF NOT EXISTS "user_discord_connections" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"discord_access_token" text,
	"discord_avatar" text,
	"discord_id" text,
	"discord_username" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_metrics" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"weight" text,
	"height" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_discord_connections" ADD CONSTRAINT "user_discord_connections_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_metrics" ADD CONSTRAINT "user_metrics_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_metrics_user_id_index" ON "user_metrics" USING btree ("user_id");