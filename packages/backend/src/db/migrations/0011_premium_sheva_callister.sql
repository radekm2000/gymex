CREATE TABLE IF NOT EXISTS "user_exercise_stats" (
	"user_id" serial NOT NULL,
	"exercise_id" integer,
	"finished_at" timestamp with time zone,
	"total_weight" double precision DEFAULT 0 NOT NULL,
	"total_reps" integer DEFAULT 0 NOT NULL,
	"total_sets" integer DEFAULT 0 NOT NULL,
	"max_weight" double precision DEFAULT 0 NOT NULL,
	CONSTRAINT "user_exercise_stats_exercise_id_user_id_pk" PRIMARY KEY("exercise_id","user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_exercise_stats" ADD CONSTRAINT "user_exercise_stats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_exercise_stats" ADD CONSTRAINT "user_exercise_stats_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
