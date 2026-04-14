CREATE TABLE `activities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`characterId` varchar(50) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`domain` varchar(100) NOT NULL,
	`easyDescription` text,
	`mediumDescription` text,
	`hardDescription` text,
	`activityType` varchar(50) NOT NULL,
	`minAge` int DEFAULT 2,
	`maxAge` int DEFAULT 5,
	`estimatedDuration` int DEFAULT 300,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `activities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `activitySessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`childProfileId` int NOT NULL,
	`activityId` int NOT NULL,
	`difficultyLevel` enum('easy','medium','hard') DEFAULT 'medium',
	`accuracy` decimal(5,2) DEFAULT '0.00',
	`responseTime` int DEFAULT 0,
	`attemptCount` int DEFAULT 1,
	`completed` boolean DEFAULT false,
	`starsEarned` int DEFAULT 0,
	`nextDifficultyRecommendation` enum('easy','medium','hard'),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `activitySessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `characterProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`childProfileId` int NOT NULL,
	`characterId` varchar(50) NOT NULL,
	`growthStage` int DEFAULT 1,
	`skillPercentage` int DEFAULT 50,
	`activitiesCompleted` int DEFAULT 0,
	`starsEarned` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `characterProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `childProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`age` int NOT NULL,
	`avatarEmoji` varchar(10),
	`baselineAssessmentScore` int DEFAULT 50,
	`assessmentAnswers` json,
	`hicapReadinessScore` int DEFAULT 50,
	`dailyActivitiesUsed` int DEFAULT 0,
	`dailyStreak` int DEFAULT 0,
	`lastActivityDate` timestamp,
	`isPremium` boolean DEFAULT false,
	`premiumExpiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `childProfiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `parentSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`dailySessionLimit` int DEFAULT 30,
	`enablePushNotifications` boolean DEFAULT true,
	`enableEmailReports` boolean DEFAULT true,
	`parentLockPin` varchar(255),
	`enableBiometric` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `parentSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `parentSettings_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`childProfileId` int NOT NULL,
	`stripeCustomerId` varchar(255),
	`stripeSubscriptionId` varchar(255),
	`plan` enum('free','premium') DEFAULT 'free',
	`amount` decimal(10,2) DEFAULT '14.99',
	`currency` varchar(3) DEFAULT 'USD',
	`status` enum('active','canceled','past_due') DEFAULT 'active',
	`currentPeriodStart` timestamp,
	`currentPeriodEnd` timestamp,
	`canceledAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `subscriptions_stripeSubscriptionId_unique` UNIQUE(`stripeSubscriptionId`)
);
