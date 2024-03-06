import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from './user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

export interface User {
  id: number;
  username: string;
  email: string;
  role: {
    role_name: string;
  };
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  showCreate= false
  users_loading = false
  role = '';
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'username', 'email', 'role'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      depotId: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.showCreate = false
      this.role = params['role']; // Retrieve the role from the path parameter
      this.loadUsers(this.role); // Load users based on the specified role
    });
  }

  loadUsers(role: any): void {
    this.users_loading = true
    this.userService.getUsersByRole(role).subscribe(
      (users: any) => {
        users.reverse();
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.users_loading = false
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onSubmit(role: string) {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.userService.createUser(userData, role).subscribe(
        (response: any) => {
          // Clear the form after successful creation
          this.showCreate = false
          this.userForm.reset();
          this.loadUsers(role)
        },
        (error: any) => {
          console.error('Error creating user:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
  clearForm() {
    this.userForm.reset();
  }

  getTitle(role: any) {
    switch (role) {
      case 'coursier':
        return 'livreur';
      case 'manager':
        return 'Chef de dépôt';
      default:
        return role;
    }
  }
}
