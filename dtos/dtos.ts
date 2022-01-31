export interface Employee {
  id: string;
  fname: string;
  lname: string;
  username: string;
  password: string;
  reimburseAccount: Reimbursement[];
  isManager: boolean;
  department: string;
}

export interface Reimbursement {
  id: string;
  amount: number;
  date: string;
  comment: string;
  isApproved: boolean;
  isPending: boolean;
  username: string;
}

export interface User {
  id: string;
  name: string;
  isAuthenticated: string;
  isManager: string;
  username: string;
}
