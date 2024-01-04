export interface CelebrantDto {
  id: number;
  name: string;
  surname: string;
  birthday: string;
  relationship_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCelebrantDto {
  name: string;
  surname: string;
  birthday: string;
  relationship_id: number;
}
