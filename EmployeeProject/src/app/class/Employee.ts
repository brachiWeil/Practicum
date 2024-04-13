import { AddRole } from "./AddRole";
import { Role } from "./Role";

export class Employee {
  idEmployee!: string  ;
  firstName!: string;
  lastName!: string;
  startDate!: Date;
  bornDate!: Date;
  gender!: boolean;
  roles!: AddRole[];

  constructor() {}
}
