
import { Colors } from './colors';
import { Measures } from './measures';

const controlsBg = {
           type: 'Linear',
            direction: {
             from: {x: 0.5, y: 0 },
             to:   {x: 0.5, y: 0.9999999999999999 },
           },
            stops: [
             {
               color: "#10101000",
               position: 0
             },
             {
               color: "#10101080",
               position: 0.299338161945343
             },
             {
               color: "#101010",
               position: 1
             },
           ],
         };


export const Gradients = {
      controlsBg,
}