CREATE TABLE IF NOT EXISTS "user_achievements" (
	"achievement_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"is_unlocked" boolean DEFAULT false NOT NULL,
	"progress" double precision,
	CONSTRAINT "user_achievements_achievement_id_user_id_pk" PRIMARY KEY("achievement_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_stats_sessions" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"total_sessions" integer DEFAULT 0 NOT NULL,
	"total_training_time" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_stats_weight_lift" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"total_weight" integer DEFAULT 0 NOT NULL,
	"max_weight" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_achievements_user_id_index" ON "user_achievements" USING btree ("user_id");