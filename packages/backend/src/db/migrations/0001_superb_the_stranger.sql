ALTER TABLE "exercises" ADD COLUMN "rest_time" text DEFAULT '60' NOT NULL;--> statement-breakpoint
ALTER TABLE "workout_exercise_sets" DROP COLUMN IF EXISTS "rest_time";