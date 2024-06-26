import { Injectable } from '@angular/core';
import { DocumentData, Firestore, addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from '@angular/fire/firestore';
import { Person, Fax } from './models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  async getDirectoryData(): Promise<Person[]> {
    const directoryArray: Person[] = [];
    const q = collection(this.firestore, 'directory');
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      let data = doc.data() as Person;
      data.id = doc.id;
      directoryArray.push(data);
    });

    directoryArray.sort((a: any, b: any) => a.lname.localeCompare(b.lname));

    return directoryArray;
  }

  async getFaxData(): Promise<Fax[]> {
    const faxArray: Fax[] = [];
    const q = collection(this.firestore, 'faxes');
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      let data = doc.data() as Fax;
      data.id = doc.id;
      faxArray.push(data);
    });

    return faxArray;
  }

  async addEmployee(person: any) {
    const collectionInstance: any = collection(this.firestore, 'directory');
    await addDoc(collectionInstance, person).then(() => {
      return;
    }).catch(error => {
      console.error(error);
    })
  }

  async updateEmployee(person: any, id: any) {
    const documentInstance: any = doc(this.firestore, 'directory', id);
    await updateDoc(documentInstance, person).then(() => {
      return;
    }).catch(error => {
      console.error(error);
    })
  }

  async deleteEmployee(person: any) {
    const documentInstance: any = doc(this.firestore, 'directory', person.id);
    await deleteDoc(documentInstance).then(() => {
      return;
    }).catch(error => {
      console.error(error);
    });
  }

  async updateFax(fax: any, id: any) {
    const documentInstance: any = doc(this.firestore, 'faxes', id);
    await updateDoc(documentInstance, fax).then(() => {
      return;
    }).catch(error => {
      console.error(error);
    })
  }

  async addFax(fax: any) {
    const collectionInstance: any = collection(this.firestore, 'faxes');
    await addDoc(collectionInstance, fax).then(() => {
      return;
    }).catch(error => {
      console.error(error);
    })
  }

  async deleteFax(fax: any) {
    const documentInstance: any = doc(this.firestore, 'faxes', fax.id);
    await deleteDoc(documentInstance).then(() => {
      return;
    }).catch(error => {
      console.error(error);
    });
  }
}
