
export class TaskDTOModel {
  id: number;
  name: string;
  description: string;
  categoryName:string;

  constructor(id: number, name: string,
              description :string , categoryName: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.categoryName = categoryName;

  }

}
