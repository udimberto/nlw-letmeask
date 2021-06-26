export type RoomType = {
  id?: string;
  authorId?: string;
  title?: string;

  isEmpty?: boolean;
  isOwner?: boolean;
  counter?: number;
  questions?: Array<any>;
}
