import { NgModule } from '@angular/core';
import { ConstantesComponent } from './constantes/constantes';
import { AlunoComponent } from './aluno/aluno';
import { EvolucaoComponent } from './evolucao/evolucao';
import { TreinoComponent } from './treino/treino';
@NgModule({
	declarations: [ConstantesComponent,
    AlunoComponent,
    EvolucaoComponent,
    TreinoComponent],
	imports: [],
	exports: [ConstantesComponent,
    AlunoComponent,
    EvolucaoComponent,
    TreinoComponent]
})
export class ComponentsModule {}
