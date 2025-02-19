
export class TaskDTOModel {
  id: number;
  name: string;
  description: string;
  categoryName:string;
  categoryColor:string;
  statusId: number;

  constructor(id: number, name: string,
              description :string , categoryName: string , categoryColor:string, statusId: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.categoryName = categoryName;
    this.categoryColor = categoryColor;
    this.statusId = statusId;

  }

}
