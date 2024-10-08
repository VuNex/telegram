import { AppService } from './app.service';
import {
  Ctx,
  Hears,
  InjectBot,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from './context.interface';
import { userMenu, regButtons } from './app.buttons';
import { attorneyList } from './app.utils';
import { UserEntity } from './User/user.entity';
import { UserService } from './User/user.service';

const listAttorney = [
  {
    id: 1,
    registration_name: '15efa215-acd4-5212-a003-f769a689390f',
    uin: '861005350331',
    reg_date: '05.10.2023',
    start_date: '05.10.2023',
    end_date: '05.10.2024',
    status: 'ACTIVE',
  },
  {
    id: 2,
    registration_name: '02462a96-5020-5885-8bf8-132c565b5da5',
    uin: '861005350331',
    reg_date: '05.10.2023',
    start_date: '05.10.2023',
    end_date: '05.10.2024',
    status: 'CREATED',
  },
  {
    id: 3,
    registration_name: '7406c707-06db-5af5-b02d-4b7f93242285',
    uin: '861005350331',
    reg_date: '05.10.2023',
    start_date: '05.10.2023',
    end_date: '05.10.2024',
    status: 'REVOKED',
  },
  {
    id: 4,
    registration_name: '4a9e9fb2-afeb-54e4-b993-80781045d141',
    uin: '861005350331',
    reg_date: '05.10.2023',
    start_date: '05.10.2023',
    end_date: '05.10.2024',
    status: 'DEFAULT',
  },
];

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Start()
  async StartCommand(ctx: Context) {
    const tgId = ctx.message.from.id;
    const findId = await this.userService.getByTgId(Number(tgId));
    if (!findId) {
      await ctx.reply(
        `Здравствуйте! \n\nДля дальнейшей работы с ботом eSenim необходимо зарегестрироваться.`,
        regButtons(),
      );
    }
    if (findId) {
      console.log(findId);
      ctx.session.user = [ctx.message.from];
      ctx.session.type = 'registered';
      await ctx.reply('Здравствуйте ' + findId.name + '!', userMenu());
    }
  }

  @Hears('📔  Мои доверенности')
  async attorneyList(ctx: Context) {
    await ctx.reply(attorneyList(listAttorney));
    ctx.session.type = 'list';
  }

  @Hears('Регистрация')
  async registration(@Message('text') message: string, @Ctx() ctx: Context) {
    await ctx.reply('Введите ИИН: ');
    ctx.session.type = 'registration';
  }

  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    const tgId = ctx.message.from.id;
    const findId = await this.userService.getByTgId(Number(tgId));
    const { id, first_name } = ctx.message.from;

    function isNumeric(value: any): value is number {
      return typeof value === 'number' && !isNaN(value);
    }
    console.log(message);
    if (!ctx.session.type) return;
    if (ctx.session.type === 'registration') {
      if (findId) return;
      if (!findId) {
        if (!isNumeric(message) && message.length !== 12) {
          await ctx.reply('Введите ИИН (12 чисел)');
        } else {
          const user = new UserEntity();
          user.tg_id = id;
          user.name = first_name;
          user.uin = message;
          await this.userService.create(user);
          await ctx.reply(
            `Здравствуйте ${first_name}! \n\nДля дальнейшей работы с ботом eSenim воспользуйтесь меню.`,
            userMenu(),
          );
          console.log(`Новый пользователь в боте ${tgId}`);
        }
      }
    }
    if (ctx.session.type === 'list') {

    }
  }
}
