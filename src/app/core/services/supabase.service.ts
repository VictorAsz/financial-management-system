import { Injectable } from "@angular/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable({
    providedIn: "root"
})
export class SupabaseService{
    private supaBase: SupabaseClient;

    constructor(){
        this.supaBase = createClient("https://yuzqcuzbkkydwbnekfos.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1enFjdXpia2t5ZHdibmVrZm9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NjYyNTcsImV4cCI6MjA2NjM0MjI1N30.xYdyj6AYAYSri9pLXStDvunaWuVW1dFDTdVfO7ymzoY" )
    }

    get client(){
        return this.supaBase;
    }
}