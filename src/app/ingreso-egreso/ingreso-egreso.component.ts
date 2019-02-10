import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  private egresoIngresoForm: FormGroup;
  private tipo = 'ingreso'; 

  constructor(private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.egresoIngresoForm =  new FormGroup({
      'description': new FormControl('', Validators.required),
      'monto': new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  crearIngresoEgreso(){
    let ingresoEgreso: IngresoEgreso = this.egresoIngresoForm.value;
    ingresoEgreso.tipo = this.tipo;
    console.log(this.egresoIngresoForm.value);
    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        swal('Exito!', 'Operacion exitosa', 'success');
        this.egresoIngresoForm.patchValue({
          monto: 0
        });
      })
    
  }

}
