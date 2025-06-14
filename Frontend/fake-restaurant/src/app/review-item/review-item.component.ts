import { Component, Input } from '@angular/core';
import { ReviewItem } from '../_models/review-item.type';

@Component({
  selector: 'app-review-item',
  imports: [],
  templateUrl: './review-item.component.html',
  styleUrl: './review-item.component.scss'
})
export class ReviewItemComponent {
  @Input({ required: true }) reviewItem: ReviewItem;

}
