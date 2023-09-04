import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';

import { collection } from '@firebase/firestore';
import { doc, setDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  item$: Observable<any>; //variablen mit Dollar Zeichen sind variablen die sich regelmäßig updatet , Observable ist eine variable die sich updated, kann man abbonieren
  firestore: Firestore = inject(Firestore); //import von Firestore auf variable

  todoText: string = '' ;


  constructor() {
    const itemCollection = collection(this.firestore, 'todos'); //collection ist todos , welcher er sich aus dem firestore holen soll
    this.item$ = collectionData(itemCollection); // holt aus der collection die daten in dem falle ein json array

    this.item$.subscribe((newTodos) => { //subscribe ist abbonnieren , funktion wird nun jedesmal aufgerufen , wenn die daten sich ändern
      console.log('Neue Todos sind', newTodos);
    });

  }

  addTodo() {
    const itemCollection = collection(this.firestore, 'todos');
    setDoc(doc(itemCollection), {name : this.todoText}) ; //fügt der collection was hinzu ; und in welches Feld
    console.log(this.todoText);
  }

}
