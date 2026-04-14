import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================================================
// CHILD PROFILES
// ============================================================================

export const childProfiles = mysqlTable("childProfiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  age: int("age").notNull(), // 2-5
  avatarEmoji: varchar("avatarEmoji", { length: 10 }),
  
  // Assessment results
  baselineAssessmentScore: int("baselineAssessmentScore").default(50),
  assessmentAnswers: json("assessmentAnswers"),
  
  // Current HiCAP readiness
  hicapReadinessScore: int("hicapReadinessScore").default(50),
  
  // Daily usage tracking
  dailyActivitiesUsed: int("dailyActivitiesUsed").default(0),
  dailyStreak: int("dailyStreak").default(0),
  lastActivityDate: timestamp("lastActivityDate"),
  
  // Subscription
  isPremium: boolean("isPremium").default(false),
  premiumExpiresAt: timestamp("premiumExpiresAt"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ChildProfile = typeof childProfiles.$inferSelect;
export type InsertChildProfile = typeof childProfiles.$inferInsert;

// ============================================================================
// CHARACTER GROWTH TRACKING
// ============================================================================

export const characterProgress = mysqlTable("characterProgress", {
  id: int("id").autoincrement().primaryKey(),
  childProfileId: int("childProfileId").notNull(),
  characterId: varchar("characterId", { length: 50 }).notNull(),
  
  growthStage: int("growthStage").default(1),
  skillPercentage: int("skillPercentage").default(50),
  activitiesCompleted: int("activitiesCompleted").default(0),
  starsEarned: int("starsEarned").default(0),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CharacterProgress = typeof characterProgress.$inferSelect;
export type InsertCharacterProgress = typeof characterProgress.$inferInsert;

// ============================================================================
// ACTIVITIES
// ============================================================================

export const activities = mysqlTable("activities", {
  id: int("id").autoincrement().primaryKey(),
  characterId: varchar("characterId", { length: 50 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  domain: varchar("domain", { length: 100 }).notNull(),
  
  easyDescription: text("easyDescription"),
  mediumDescription: text("mediumDescription"),
  hardDescription: text("hardDescription"),
  
  activityType: varchar("activityType", { length: 50 }).notNull(),
  minAge: int("minAge").default(2),
  maxAge: int("maxAge").default(5),
  estimatedDuration: int("estimatedDuration").default(300),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = typeof activities.$inferInsert;

// ============================================================================
// ACTIVITY SESSIONS
// ============================================================================

export const activitySessions = mysqlTable("activitySessions", {
  id: int("id").autoincrement().primaryKey(),
  childProfileId: int("childProfileId").notNull(),
  activityId: int("activityId").notNull(),
  
  difficultyLevel: mysqlEnum("difficultyLevel", ["easy", "medium", "hard"]).default("medium"),
  accuracy: decimal("accuracy", { precision: 5, scale: 2 }).default("0.00"),
  responseTime: int("responseTime").default(0),
  attemptCount: int("attemptCount").default(1),
  
  completed: boolean("completed").default(false),
  starsEarned: int("starsEarned").default(0),
  nextDifficultyRecommendation: mysqlEnum("nextDifficultyRecommendation", ["easy", "medium", "hard"]),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ActivitySession = typeof activitySessions.$inferSelect;
export type InsertActivitySession = typeof activitySessions.$inferInsert;

// ============================================================================
// SUBSCRIPTIONS
// ============================================================================

export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  childProfileId: int("childProfileId").notNull(),
  
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }).unique(),
  
  plan: mysqlEnum("plan", ["free", "premium"]).default("free"),
  amount: decimal("amount", { precision: 10, scale: 2 }).default("14.99"),
  currency: varchar("currency", { length: 3 }).default("USD"),
  
  status: mysqlEnum("status", ["active", "canceled", "past_due"]).default("active"),
  
  currentPeriodStart: timestamp("currentPeriodStart"),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  canceledAt: timestamp("canceledAt"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

// ============================================================================
// PARENT SETTINGS
// ============================================================================

export const parentSettings = mysqlTable("parentSettings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  
  dailySessionLimit: int("dailySessionLimit").default(30),
  enablePushNotifications: boolean("enablePushNotifications").default(true),
  enableEmailReports: boolean("enableEmailReports").default(true),
  
  parentLockPin: varchar("parentLockPin", { length: 255 }),
  enableBiometric: boolean("enableBiometric").default(false),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ParentSettings = typeof parentSettings.$inferSelect;
export type InsertParentSettings = typeof parentSettings.$inferInsert;