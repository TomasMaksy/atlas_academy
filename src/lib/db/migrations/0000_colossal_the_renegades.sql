CREATE TABLE `essay` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`html` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_data` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`friendDescriptions` text NOT NULL,
	`motivations` text NOT NULL,
	`challenges` text NOT NULL,
	`leadership` text NOT NULL,
	`extracurriculars` text NOT NULL,
	`seeYou` text NOT NULL,
	`storyStyle` text NOT NULL,
	`personalQualities` text NOT NULL,
	`futureImpact` text NOT NULL,
	`academicStrenght` text NOT NULL,
	`introduction` text NOT NULL,
	`keyMoments` text NOT NULL,
	`fiveSec` text NOT NULL,
	`digDeeper` text NOT NULL
);
