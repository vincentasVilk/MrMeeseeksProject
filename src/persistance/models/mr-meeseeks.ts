import { model } from 'mongoose';

import { MrMeeseeks } from '../../domain/mr-meeseeks';
import { MrMeeseeksSchema } from '../schemas/mr-meeseeks';

export const MrMeeseeksModel = model<MrMeeseeks>('mr_meeseeks', MrMeeseeksSchema);

export type MrMeeseeksModelType = typeof MrMeeseeksModel;
