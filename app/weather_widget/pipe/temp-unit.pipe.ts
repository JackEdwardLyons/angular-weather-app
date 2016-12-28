import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tempUnit'
})
export class TempUnitPipe implements PipeTransform {
    transform( temp: number, tempUnit: string ) {
        const celcius = ( temp - 32 ) * 0.5556;
        return ( tempUnit === "celcius" ) ? celcius : temp;  
    }
}