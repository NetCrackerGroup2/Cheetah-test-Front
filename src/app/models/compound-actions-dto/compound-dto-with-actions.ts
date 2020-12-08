import {CompoundCreateDto} from '../compoundDto/compound-create-dto';
import {Action} from '../action/action';

export class CompoundDtoWithActions {
  compound: CompoundCreateDto;
  actions: Action[];

  constructor(compound: CompoundCreateDto, actions: Action[]) {
    this.compound = compound;
    this.actions = actions;
  }
}
