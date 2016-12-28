import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'speedUnit'
})
export class SpeedUnitPipe implements PipeTransform {
    // declare the "transform" method with at least ONE parameter 
    // (ie) the data you are transforming
    transform( speed: number, unitType: string ) {
        switch( unitType ) {
            case "mph": 
                const miles = Math.floor( speed / 1.6 );
                return `${miles} mph`;
            default:
                return `${Math.floor( speed )} kph`;
        }
    }
}