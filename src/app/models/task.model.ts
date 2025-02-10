import {Category} from './category.model';
import {Status} from './status.model';

export class Task {

  id: number;
  name:  string;
  description: string;
  category: Category;
  status: Status;

  constructor(id: number, name: string, description: string, category: Category, status: Status)  {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.status = status;
  }
}
