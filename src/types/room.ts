export type RoomType = {
  id?: string;
  authorId?: string;
  title?: string;

  endedAt?: Date;
  isEmpty?: boolean;
  isOwner?: boolean;
  counter?: number;
  questions?: Array<any>;
}
