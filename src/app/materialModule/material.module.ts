import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';


 const MaterialComponents = [
    MatToolbarModule
 ];

@NgModule({
    imports: [MaterialComponents],
    exports: [MaterialComponents]
})
export class MaterialModule { }