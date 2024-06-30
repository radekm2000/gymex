import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UsersTable } from 'src/db/schema/users';
import { DrizzleService } from 'src/drizzle/drizzle.service';

type UsersTableInsertRow = typeof UsersTable.$inferInsert;
type UsersTableInsertSelect = typeof UsersTable.$inferSelect;

@Controller('users')
export class UsersController {
  constructor(
    @Inject(DrizzleService) private readonly drizzleService: DrizzleService,
  ) {}

  @Get()
  async getUsers(): Promise<UsersTableInsertSelect[]> {
    return await this.drizzleService.db.select().from(UsersTable);
  }

  @Post()
  async createUser(@Body() data: UsersTableInsertRow) {
    return await this.drizzleService.db
      .insert(UsersTable)
      .values(data)
      .returning();
  }
}
