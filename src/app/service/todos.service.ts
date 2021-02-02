import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private firestore: AngularFirestore) { 
    
  }
  
  findMondayTodos(){
    return this.firestore.collection('Todos', ref => ref.where("day", "==", 1)).snapshotChanges();
  }

  findTuesdayTodos(){
    return this.firestore.collection('Todos', ref => ref.where("day", "==", 2)).snapshotChanges();
  }

  findWednesdayTodos(){
    return this.firestore.collection('Todos', ref => ref.where("day", "==", 3)).snapshotChanges();
  }

  findThursdayTodos(){
    return this.firestore.collection('Todos', ref => ref.where("day", "==", 4)).snapshotChanges();
  }

  findFridayTodos(){
    return this.firestore.collection('Todos', ref => ref.where("day", "==", 5)).snapshotChanges();
  }

  findSaturdayTodos(){
    return this.firestore.collection('Todos', ref => ref.where("day", "==", 6)).snapshotChanges();
  }
 
  findSundayTodos(){
    return this.firestore.collection('Todos', ref => ref.where("day", "==", 7)).snapshotChanges();
  }

  findLastCreatedTodos(limit: number) {
    return this.firestore.collection('Todos', ref => ref.orderBy('date', 'desc').limit(limit)).snapshotChanges();
  }

  findAllTodos() {
    return this.firestore.collection('Todos', ref => ref.orderBy('date', 'desc')).snapshotChanges();
  }

  updateTodo(id: string, todo: {}) {
    return this.firestore.collection('Todos').doc(id).set(todo, { merge: true });
  }

  deleteTodo(todo){
    // console.log(todo.payload.doc.id)
    return this.firestore.collection('Todos').doc(todo.payload.doc.id).delete();
  }

  createTodo(todo: {}, day?: number) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
      .collection('Todos')
      .add(todo)
      .then(res => {}, err => reject(err));
    });
  }
}