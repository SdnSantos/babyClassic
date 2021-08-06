import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class VestidoService {

  private basePath = '/vestidos'

  constructor(
    // onde salvará os vestidos
    private _fireStore: AngularFirestore,
    // onde salvará as imagens/fotos
    private _fireStorage: AngularFireStorage
  ) { }

  criaVestido(avaliacao: any, fileUpload: any) {
    const vestidos = this._fireStore.collection('vestidos');
    vestidos.add({...avaliacao, downloadUrl: fileUpload}).then(doc => doc.update({ id: doc.id }));
  }

  listarVestidos() {
    return this._fireStore.collection('vestidos').valueChanges();
  }

  pushFileToStorage(avaliacao: any, fileUpload: any) {
    const filePath = `${this.basePath}/${fileUpload.name}_${avaliacao.nome}_${new Date()}`;
    const storageRef = this._fireStorage.ref(filePath);
    const uploadTask = this._fireStorage.upload(filePath, fileUpload);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          this.criaVestido(avaliacao, fileUpload.url);
        });
      })
    ).subscribe();
  }

  criaComentarioDoUsuario(idVestido: string, idUsuario: string, avaliacao: object) {
    return this._fireStore.collection('vestidos')
    .doc(idVestido).collection('avaliações').doc(idUsuario).set(avaliacao);
  }

  listaComentariosDoVestido(idVestido: string) {
    return this._fireStore.collection('vestidos')
    .doc(idVestido).collection('avaliações').valueChanges();
  }

  excluirComentario(idVestido: string, idUsuario: string) {
    return this._fireStore.collection('vestidos')
    .doc(idVestido).collection('avaliações').doc(idUsuario).delete();
  }

}
