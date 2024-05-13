CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`surname` text NOT NULL,
	`birthdate` text NOT NULL,
	`address` text NOT NULL,
	`password` text NOT NULL,
	`email` text NOT NULL,
	`role` text DEFAULT 'user',
	`createdAt` text DEFAULT '13/05/2024'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);