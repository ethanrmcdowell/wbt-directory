import { Injectable } from '@angular/core';
import { DocumentData, Firestore, addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  async getDirectoryData() {
    const directoryArray: DocumentData[] = [];
    const q = collection(this.firestore, 'directory');
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      let data = doc.data();
      const id = doc.id;
      data = { id, ...data };
      directoryArray.push(data);
    });

    directoryArray.sort((a: any, b: any) => a.lname.localeCompare(b.lname));

    return directoryArray;
  }

  async getFaxData() {
    const faxArray: DocumentData[] = [];
    const q = collection(this.firestore, 'faxes');
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      let data = doc.data();
      const id = doc.id;
      data = { id, ...data };
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
}
