import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserRole } from "../models/user_structures";
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {

  private rolesDataCollection: AngularFirestoreCollection<UserRole>;
  rolesDataList: Observable<UserRole[]>;

  constructor(private db: AngularFirestore) { 
    this.rolesDataCollection = this.db.collection<UserRole>('/roles');
    this.rolesDataList = this.rolesDataCollection.valueChanges({ idField: 'id'});
  }

  addUserRole(user_id: string) {
    let role: UserRole = {
      id: "newRole",
      user_id: user_id,
      role: "user"
    }
    delete role.id;
    return this.rolesDataCollection.add(role);
  }

  userRole(user_id: string) {
    return this.rolesDataList.pipe(
      map(roles => roles.find(obj => obj.user_id === user_id))
    );
  }

  updateUserRole(userRole: UserRole, newRole: string) {
    const id: string = userRole.id;
    userRole.role = newRole;
    delete userRole.id;
    this.rolesDataCollection.doc(id).update(userRole);
  }

}
