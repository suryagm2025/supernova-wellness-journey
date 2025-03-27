
export type UserType = 'individual' | 'coach' | 'team';

export interface UserTypeOption {
  id: UserType;
  label: string;
  description: string;
  icon: string;
}
