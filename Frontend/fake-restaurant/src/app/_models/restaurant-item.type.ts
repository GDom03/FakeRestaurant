export interface RestaurantItem {
  id: number; 
  name: string;
  description: string;  
  type: string;  
  latitude: number;
  longitude: number;
  UserEmail?: string;  
  createdAt?: Date; 
  updatedAt?: Date;
}
