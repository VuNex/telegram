import { Context as ContextTelegraf } from 'telegraf';
export interface Context extends ContextTelegraf {
    session: {
        type?: 'registration' | 'registered' | 'list' | 'notify';
        user?: Array<any>;
    };
}
