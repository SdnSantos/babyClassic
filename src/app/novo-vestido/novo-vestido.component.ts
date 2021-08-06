import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VestidoService } from '../shared/vestido.service';

@Component({
  selector: 'app-novo-vestido',
  templateUrl: './novo-vestido.component.html',
  styleUrls: ['./novo-vestido.component.scss']
})

export class NovoVestidoComponent implements OnInit {

  selectedFile: any;
  currentFileUpload: any;
  // siglas: Array<any> = [];
  cidades: Array<any> = [];

  rating: number = 3;
  starCount: number = 5;
  ratingArr: Array<number> = [];

  novoVestido = new FormGroup({
    nome: new FormControl('', Validators.required),
    tamanho: new FormControl('', Validators.required),
    // estado: new FormControl('', Validators.required),
    // cidade: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required)
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _http: HttpClient,
    public dialogRef: MatDialogRef<NovoVestidoComponent>,
    private _vestidoService: VestidoService,
  ) { }

  ngOnInit(): void {
    // this.data = this.data.siglas;

    for(let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating: number) {
    this.rating = rating;
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    }
    else {
      return 'star_border';
    }
  }

  onFileSelect(e: any) {
    if (e.target.files && e.target.files[0]) {
      this.currentFileUpload = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (ev) => {
        if (ev.target) {
          this.selectedFile = ev.target.result;
        }
      }
    }
  }

//   buscaCidade(estado: any) {
//     this.cidades = [];
//     this._http.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.sigla}/distritos`).subscribe((cidades: any) => {
//       cidades = cidades.sort((a: any, b: any) => (a.nome > b.nome) ? 1 : -1)
//       cidades.forEach((cidade: any) => {
//         this.cidades.push(cidade.nome);
//       });
//     });
// }

  salvarVestido() {
    const avaliacao = {
      nome: this.novoVestido.value.nome,
      tamanho: this.novoVestido.value.tamanho,
      // estado: this.novoVestido.value.estado,
      // cidade: this.novoVestido.value.cidade,
      descricao: this.novoVestido.value.descricao,
      autorVestido: this.data.usuario,
      compradoEm: new Date(),
      estrelas: this.rating
    }

    if (this.selectedFile) {
      this._vestidoService.pushFileToStorage(avaliacao, this.currentFileUpload);
    } else {
      alert('Parece que não foi inserido nenhum arquivo de imagem.')
    }

    this.dialogRef.close(avaliacao);
  }

}
