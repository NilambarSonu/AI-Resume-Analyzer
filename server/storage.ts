import { users } from "@shared/schema";

export interface IStorage {
  // Simple storage for now, mostly needed for the analyze endpoint logic if we were saving history
  // For this prototype, we just pass through mock data.
  getUser(id: number): Promise<typeof users.$inferSelect | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, typeof users.$inferSelect>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<typeof users.$inferSelect | undefined> {
    return this.users.get(id);
  }
}

export const storage = new MemStorage();
