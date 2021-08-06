import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { VestidoService } from '../shared/vestido.service';

@Component({
  selector: 'app-vestido',
  templateUrl: './vestido.component.html',
  styleUrls: ['./vestido.component.scss']
})

export class VestidoComponent implements OnInit {

  usuarioLogado: any;

  mediaGeral: Array<any> = [];

  ratingArr: Array<any> = [];
  rating: number = 5;
  starCount: number = 5;

  usuario_rating: number = 3 ;
  usuario_ratingArr: Array<number> = [];
  comentarios_usuarios_ratingArr: Array<number> = [];

  comentario_usuario: any;
  comentarios_usuarios: Array<any> = [
    {
      comentario: 'Realmente vestidos lindos.',
      estrelas: 1,
      comentadoEm: new Date()
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<VestidoComponent>,
    @Inject(MAT_DIALOG_DATA) public vestido: any,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _vestidoService: VestidoService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }

    for (let index = 0; index < this.starCount; index++) {
      this.usuario_ratingArr.push(index);
    }

    for (let index = 0; index < this.starCount; index++) {
      this.comentarios_usuarios_ratingArr.push(index);
    }

    this._authService.user$.subscribe(userInfos => {
      this.usuarioLogado = userInfos;
    });

    this.listarComentarios(this.vestido.estrelas);
  }

  showIcon(contagem: number, index: number) {
    if (contagem >= index + 1) {
      return 'star';
    }
    else {
      return 'star_border';
    }
  }

  onClick(rating: number) {
    this.usuario_rating = rating;
    return false;
  }

  enviarComentario() {
    this._vestidoService
    .criaComentarioDoUsuario(
      this.vestido.id,
      this.usuarioLogado.uid,
      {
      comentario: this.comentario_usuario,
      estrelas: this.usuario_rating,
      comentadoEm: new Date(),
      autor: {
        nome: this.usuarioLogado.displayName,
        foto: this.usuarioLogado.photoURL,
        uid: this.usuarioLogado.uid
      }
    }).then(() => this.comentario_usuario = '');
  }

  listarComentarios(param: number) {
    this.mediaGeral = [];
    this._vestidoService.listaComentariosDoVestido(this.vestido.id)
      .subscribe(comentarios => {
        this.comentarios_usuarios = comentarios.map(comentario => comentario);
        comentarios.forEach(comentarios => {
          return this.mediaGeral.push(comentarios.estrelas);
        })
      });

    this.mediaGeral.push(param);
    const sum = this.mediaGeral.reduce((a: number, b: number) => a + b, 0);
    const toDisplay = Math.round(sum / this.mediaGeral.length);
    return this.rating = toDisplay;
  }

  excluirComentario(comentario: any) {
    if (window.confirm('Deseja mesmo excluir esse comentário?')) {
      this._vestidoService.excluirComentario(this.vestido.id, comentario.autor.uid);
      this.snackBar.open('Comentário excluido com sucesso.', 'X', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 5000
      })
    }
  }

  formataData(seconds: number) {
    const data = new Date(seconds * 1000).toLocaleDateString();
    const horario = new Date(seconds * 1000).toLocaleTimeString();

    return `${data} às ${horario}`;
  }

}
