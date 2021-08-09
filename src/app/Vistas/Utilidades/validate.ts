
import { AbstractControl } from "@angular/forms";
export class validate {

    static valor(control: AbstractControl) {

       var str=control.value;   

        
    

        if(String(str).charAt(0)=="0" )
        {
           return {valor:true};
        }

        if(String(str).charAt(0)=="n" )
        {
           return {valor:true};
        }

        if(str<= 0 )
        {
           return {valor:true};
        }


   
        return null;

    }

}
