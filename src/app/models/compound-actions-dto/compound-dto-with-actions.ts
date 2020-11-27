import {CompoundCreateDto} from '../compoundDto/compound-create-dto';
import {ActionCreateDto} from '../action-create-dto/action-create-dto';

export class CompoundDtoWithActions {
  compound: CompoundCreateDto;
  actions: ActionCreateDto[];

  constructor(compound: CompoundCreateDto, actions: ActionCreateDto[]) {
    this.compound = compound;
    this.actions = actions;
  }
}
