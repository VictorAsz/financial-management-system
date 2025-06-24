import { Component } from "@angular/core";
import { SupabaseService } from "../../services/supabase.service";
import { Route, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


@Component({
    standalone: true,
    selector: 'app-login',
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html'
})
export class LoginScreenComponent{
    email = '';
    password = '';
    errorMessage = '';

    constructor(private supabase: SupabaseService, private router: Router){}

    async login(event: Event){
        event.preventDefault();

        const { error } =  await this.supabase.client.auth.signInWithPassword({
            email: this.email,
            password: this.password
        })

        if(error){
            this.errorMessage = error.message;
        } else {
            this.router.navigate(['/home'])
        }
        
    }

}   