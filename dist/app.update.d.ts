import { AppService } from './app.service';
import { Telegraf } from 'telegraf';
import { Context } from './context.interface';
import { UserService } from './User/user.service';
export declare class AppUpdate {
    private readonly bot;
    private readonly appService;
    private readonly userService;
    constructor(bot: Telegraf<Context>, appService: AppService, userService: UserService);
    StartCommand(ctx: Context): Promise<void>;
    attorneyList(ctx: Context): Promise<void>;
    registration(message: string, ctx: Context): Promise<void>;
    getMessage(message: string, ctx: Context): Promise<void>;
}
