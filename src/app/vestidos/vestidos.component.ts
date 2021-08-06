import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { VestidoComponent } from '../vestido/vestido.component';

import { NovoVestidoComponent } from './../novo-vestido/novo-vestido.component';
import { VestidoService } from '../shared/vestido.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-vestidos',
  templateUrl: './vestidos.component.html',
  styleUrls: ['./vestidos.component.scss']
})

export class VestidosComponent implements OnInit {

  toSearch: any = '';
  siglas: Array<any> = []

  usuarioLogado: any;

  vestidos: Array<any> = [
    // {
    //   nome: "Minnie",
    //   descricao: "Descrição Minnie",
    //   tamanho: 2,
    //   compradoEm: new Date(),
    //   estrelas: 5
    // },
    // {
    //   nome: "Rapunzel",
    //   descricao: "Descrição Rapunzel",
    //   tamanho: 3,
    //   compradoEm: new Date(),
    //   estrelas: 5
    // },
    // {
    //   nome: "Bela Adormecida",
    //   descricao: "Descrição Bela Adormecida",
    //   tamanho: 1,
    //   compradoEm: new Date(),
    //   estrelas: 5
    // }
  ]

  constructor(
      // private _http: HttpClient,
      private dialog: MatDialog,
      private _vestidoService: VestidoService,
      private _authService: AuthService
    ) { }

  ngOnInit(): void {
    // this._http.get('https://servicodados.ibge.gov.br/api/v1/localidades/regioes/1|2|3|4|5/estados').subscribe((res: any) => {
    //   let estados = res;
    //   estados = estados.sort((a: any, b: any) => (a.nome > b.nome) ? 1 : -1);

    //   estados.forEach((estado: any) => {
    //     this.siglas.push({
    //       nome: estado.nome,
    //       sigla: estado.sigla
    //     })
    //   })
    // })

    this._authService.user$.subscribe(userInfos => {
      this.usuarioLogado = userInfos;
    });

    this.listarVestidos();
  }

  async listarVestidos() {
    await this._vestidoService.listarVestidos()
      .subscribe(vests => {
        this.vestidos = vests.map(vest => vest);
        this.vestidos = this.vestidos.sort((a, b) => b.compradoEm.seconds - a.compradoEm.seconds);
      })
  }

  novoVestido() {
    const dialogRef = this.dialog.open(NovoVestidoComponent, {
      width: '80%',
      height: 'max-content',
      data: {
        usuario: this.usuarioLogado
        // siglas: this.siglas
      }
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      this.vestidos.push(data);
    })
  }

  abrirVestido(vestido: any) {
    this.dialog.open(VestidoComponent, {
      width: '80%',
      height: '98vh',
      data: vestido,
      panelClass: 'custom-dialog-container'
    })
  }

  sair() {
    this._authService.sair()
  }

}
