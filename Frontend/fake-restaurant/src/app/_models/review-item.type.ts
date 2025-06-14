export interface ReviewItem {
  id: number; 
  title: string;
  content: string;  
  overallRating: number;
  serviceRating: number;
  qualityPriceRating: number;
  foodRating: number;
  atmosphereRating: number;
  upvotes: number;
  downvotes: number;
  createdAt?: Date; 
  updatedAt?: Date;


}
