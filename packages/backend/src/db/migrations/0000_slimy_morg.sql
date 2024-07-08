DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('Admin', 'User');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."muscle_name" AS ENUM('chest', 'back', 'legs', 'shoulders', 'bicep', 'triceps', 'abs', 'calves', 'cardio', 'butt', 'forearm', 'base');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_role" "user_role" DEFAULT 'User' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"exercise_name" text NOT NULL,
	"exercise_description" text,
	"user_id" integer,
	"is_default_exercise" boolean DEFAULT false NOT NULL,
	"primary_muscle_targeted" "muscle_name" NOT NULL,
	"is_exercise_creator_developer" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "primary_muscles" (
	"id" serial PRIMARY KEY NOT NULL,
	"muscle_name" "muscle_name" NOT NULL,
	CONSTRAINT "primary_muscles_muscle_name_unique" UNIQUE("muscle_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workout_exercise_sets" (
	"id" serial PRIMARY KEY NOT NULL,
	"workout_exercise_workout_plan_id" integer NOT NULL,
	"workout_exercise_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"exercise_set_number" text DEFAULT '0' NOT NULL,
	"reps" text DEFAULT '0' NOT NULL,
	"weight" text DEFAULT '0' NOT NULL,
	"rir" text,
	"tempo" text,
	"rest_time" text DEFAULT '60' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workout_plan_exercises" (
	"workout_plan_id" integer NOT NULL,
	"exercise_id" integer NOT NULL,
	"order_index" integer NOT NULL,
	CONSTRAINT "workout_plan_exercises_workout_plan_id_exercise_id_pk" PRIMARY KEY("workout_plan_id","exercise_id"),
	CONSTRAINT "workout_plan_exercises_workout_plan_id_unique" UNIQUE("workout_plan_id"),
	CONSTRAINT "workout_plan_exercises_exercise_id_unique" UNIQUE("exercise_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workout_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"workout_plan_name" text NOT NULL,
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
DO $$ BEGIN
 ALTER TABLE "exercises" ADD CONSTRAINT "exercises_primary_muscle_targeted_primary_muscles_muscle_name_fk" FOREIGN KEY ("primary_muscle_targeted") REFERENCES "public"."primary_muscles"("muscle_name") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_exercise_sets" ADD CONSTRAINT "workout_exercise_sets_workout_exercise_workout_plan_id_workout_plan_exercises_workout_plan_id_fk" FOREIGN KEY ("workout_exercise_workout_plan_id") REFERENCES "public"."workout_plan_exercises"("workout_plan_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_exercise_sets" ADD CONSTRAINT "workout_exercise_sets_workout_exercise_id_workout_plan_exercises_exercise_id_fk" FOREIGN KEY ("workout_exercise_id") REFERENCES "public"."workout_plan_exercises"("exercise_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_exercise_sets" ADD CONSTRAINT "workout_exercise_sets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_plan_exercises" ADD CONSTRAINT "workout_plan_exercises_workout_plan_id_workout_plans_id_fk" FOREIGN KEY ("workout_plan_id") REFERENCES "public"."workout_plans"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_plan_exercises" ADD CONSTRAINT "workout_plan_exercises_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_plans" ADD CONSTRAINT "workout_plans_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_metrics_user_id_index" ON "user_metrics" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "workout_exercise_sets_workout_exercise_index" ON "workout_exercise_sets" USING btree ("workout_exercise_workout_plan_id","workout_exercise_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "workout_exercises_workout_plan_id_index" ON "workout_plan_exercises" USING btree ("workout_plan_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "workout_exercises_exercise_id_index" ON "workout_plan_exercises" USING btree ("exercise_id");