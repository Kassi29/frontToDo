import {Category} from './category.model';

export class Task {
  id: number;
  name:  string;
  description: string;
  category: Category;



  constructor(id: number, name: string,
              description :string ,
              category: Category) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
  }
}

