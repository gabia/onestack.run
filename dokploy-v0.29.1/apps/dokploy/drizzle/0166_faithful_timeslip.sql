ALTER TABLE "application" ADD COLUMN "analyticsEnabled" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "application" ADD COLUMN "umamiWebsiteId" text;--> statement-breakpoint
ALTER TABLE "application" ADD COLUMN "umamiShareId" text;