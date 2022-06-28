import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';

declare var $:any;

@Component({
  selector: 'app-view-employee-list',
  templateUrl: './view-employee-list.component.html',
  styleUrls: ['./view-employee-list.component.css']
})
export class ViewEmployeeListComponent implements OnInit {

  @Input() employee: Employee = new Employee();

  constructor() { }

  ngOnInit(): void {
  }

  showViewModal(){
    $('#viewModal').modal('show');
  }

}
