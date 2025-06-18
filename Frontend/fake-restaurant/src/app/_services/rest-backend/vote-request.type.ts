export interface VoteRequest {
  isUpVote: boolean;
  reviewId: number;
  UserEmail?: string;
  createdAt?: Date; 
  updatedAt?: Date;
}
