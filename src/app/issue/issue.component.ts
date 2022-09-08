import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssueService } from '../services/issue.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {


  myForm!: FormGroup;
  issues: any[] = [];
  today = new Date();

  initialValues!: any;
  

  constructor(
    private issueService: IssueService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.refreshData();
    this.initForm();
    this.initialValues = this.myForm.value;
  }

  refreshData() {
    this.issueService.getAll().subscribe( (issues: any) => this.issues = issues);
  }

  initForm() {
    this.myForm = this.fb.group({
      id: [0, []],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: [parseInt(''), [Validators.required]],
      issueType: [parseInt(''), [Validators.required]],
      created: [this.today,[]],
      completed: [null,[]]  
    })
  }

  fillForm(issue: any) {
    this.myForm.controls['id'].setValue(issue.id);
    this.myForm.controls['title'].setValue(issue.title);
    this.myForm.controls['description'].setValue(issue.description);
    this.myForm.controls['priority'].setValue(issue.priority);
    this.myForm.controls['issueType'].setValue(issue.issueType);
    this.myForm.controls['created'].setValue(issue.created);
    this.myForm.controls['completed'].setValue(issue.completed);


  }

  updateIssue() {
    this.myForm.controls['priority'].setValue(parseInt(this.myForm.get('priority')!.value)); //we cast it to number because backend requires it
    this.myForm.controls['issueType'].setValue(parseInt(this.myForm.get('issueType')!.value));//we cast it to number because backend requires it
    this.issueService.update(this.myForm.get('id')!.value, this.myForm.value).subscribe( response => {
      console.log(response);
      this.refreshData();
     // this.myForm.reset(this.initialValues);
    })
  }

  deleteIssue(id: string) {
    const confirmation = confirm("Are you sure to delete issue "+id);
    if (confirmation) {
      this.issueService.delete(id).subscribe( response => {
        console.log(response);
        this.refreshData();
      })
    }
  }

  addIssue() {
    if (!this.myForm.valid) {
      alert("Please fill all fields");
    }

    this.myForm.controls['priority'].setValue(parseInt(this.myForm.get('priority')!.value)); //we cast it to number because backend requires it
    this.myForm.controls['issueType'].setValue(parseInt(this.myForm.get('issueType')!.value));//we cast it to number because backend requires it
    this.myForm.controls['id'].setValue(0);
    this.issueService.add(this.myForm.value).subscribe( response =>  {
      console.log(response);
      this.myForm.reset();
      this.refreshData();
    });

  }

}
