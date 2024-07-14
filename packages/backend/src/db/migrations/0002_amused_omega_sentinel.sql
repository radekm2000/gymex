CREATE TABLE IF NOT EXISTS "workout_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"workout_plan_id" integer NOT NULL,
	"started_at" timestamp with time zone,
	"finished_at" timestamp with time zone,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "workout_exercise_sets" ADD COLUMN "workout_session_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_workout_plan_id_workout_plans_id_fk" FOREIGN KEY ("workout_plan_id") REFERENCES "public"."workout_plans"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_exercise_sets" ADD CONSTRAINT "workout_exercise_sets_workout_session_id_workout_sessions_id_fk" FOREIGN KEY ("workout_session_id") REFERENCES "public"."workout_sessions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
