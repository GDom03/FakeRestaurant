export interface ReviewRequest {
  restaurantId: number; 
  title: string;
  content: string;  
  overallRating: number;
  serviceRating: number;
  qualityPriceRating: number;
  foodRating: number;
  atmosphereRating: number;
}
