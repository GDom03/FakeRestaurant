import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-add-restaurant',
  imports: [ReactiveFormsModule],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss'
})
export class AddRestaurantComponent {

	submitted: boolean = false;
	imageFiles: File[] = [];
  	imagePreviews: string[] = [];
  	toastr = inject(ToastrService);
  	restService = inject(RestBackendService);
  	router = inject(Router);
	location = inject(Location);

  	addRestaurantForm = new FormGroup({
  	  
		name: new FormControl('', [
			Validators.required,
			Validators.minLength(2),
			Validators.maxLength(255),
			]
		),
    	
		description: new FormControl('', [
			Validators.required, 
			Validators.minLength(5),
			Validators.maxLength(255),]
		),

		type: new FormControl('', [
			Validators.required,
			Validators.minLength(2),
			Validators.maxLength(255), 
			]
		),
    	
		latitude: new FormControl(null, [
			Validators.required, 
			Validators.min(-90), 
			Validators.max(90)]
		),
    	
		longitude: new FormControl(null, [
			Validators.required, 
			Validators.min(-180), 
			Validators.max(180)]
		),

		images: new FormControl(null, [
			Validators.required
		])
    	
	  
  	});

	goBack() {
		this.location.back();
	}

	handleAddRestaurant() {

		if(this.submitted == true){
			return;
		}
		
		this.submitted = true;
		
		if(this.addRestaurantForm.invalid){
      		this.toastr.error("The data you provided is invalid!", "Oops! Invalid data!");
			this.submitted = false;
    	}else{
			this.restService.addRestaurant({
      	  		name: this.addRestaurantForm.value.name as string,
      	  		description: this.addRestaurantForm.value.description as string,
				type: this.addRestaurantForm.value.type as string,
				latitude: this.addRestaurantForm.value.latitude ?? 1 as number,
				longitude: this.addRestaurantForm.value.longitude ?? 1 as number,
      			}).subscribe({
      	  			next: (msg) => {
						
						const uploadObservables = this.imageFiles.map(img =>
        				  this.restService.uploadImg({
        				    restaurantId: msg?.id ?? 0,
        				    image: img
        				  })
        				);

						// Aspetta tutti gli upload
        				forkJoin(uploadObservables).subscribe({
        				  next: () => {
        				    this.router.navigateByUrl("/user-restaurants");
        				    this.toastr.success(`Restaurant submitted successfully!`, `Success`);
        				  },
        				  error: (err) => {
        				
        				    this.toastr.error("Image upload failed. Restaurant was not submitted.", "Upload Error");
        				    this.restService.RemoveResturant(msg.id ?? 0).subscribe();  
        				  },
        				  complete: () => {
        				    this.submitted = false;
        				  }
        				});
						
      	  			},
      	 			 	error: (err) => {
      	    				this.toastr.error("Please fill all fields correctly before submitting the restaurant.", "Submission Error");
      	  			},
      	  			complete: () => {
						this.submitted = false;
						
					
      	  			}
      			}
			);
			
		}
	}

	onFileChange(event: Event): void {
    	const input = event.target as HTMLInputElement;

    	if (input.files && input.files.length > 0) {

    		for(const file of input.files){
				this.imageFiles.push(file);
		  	}

			this.renderPreview();		  
		    
    	}
  	}

	renderPreview() {
		this.imagePreviews = [];
		for(const file of this.imageFiles){
			// Anteprima leggendo il contenuto del file
			const reader = new FileReader();
			reader.onload = () => {
				const result = reader.result as string;
				this.imagePreviews.push(result);
			};
			reader.readAsDataURL(file); // Legge il file come URL base64
		}
	}

	delete() {
		if(this.imageFiles.length == 0){
			this.toastr.warning("No image yet, you can't delete", "Warning")
		}else{
			this.imageFiles.pop();
			this.renderPreview();
		}

	}



}


