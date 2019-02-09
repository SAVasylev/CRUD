import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { User } from './user';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    providers: [DataService]
})
export class AppComponent implements OnInit {

    user: User = new User();   // изменяемый товар
    users: User[];                // массив товаров
    tableMode: boolean = true;          // табличный режим

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.loadUsers();    // загрузка данных при старте компонента  
    }
    // получаем данные через сервис
    loadUsers() {
        this.dataService.getUsers()
            .subscribe((data: User[]) => this.users = data);
    }
    // сохранение данных
    save() {
        if (this.user.id == null) {
            this.dataService.createUser(this.user)
                .subscribe((data: User) => this.users.push(data));
        } else {
            this.dataService.updateUser(this.user)
                .subscribe(data => this.loadUsers());
        }
        this.cancel();
    }
    editUser(p: User) {
        this.user = p;
    }
    cancel() {
        this.user = new User();
        this.tableMode = true;
    }
    delete(p: User) {
        this.dataService.deleteUser(p.id)
            .subscribe(data => this.loadUsers());
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }
}