import { Component } from '@angular/core'
import * as jsPDF from 'jspdf'
import * as html2canvas from 'html2canvas'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  protected idViews: Array<string> = ['teste', 'teste2', 'teste3']
  protected images: Array<string> = []

  public generateCanvas() {
    return new Promise((resolve, reject) => {
      this.idViews.map((id, i, arr) => {
        const lastIndex = this.idViews.length - 1
        if (i === lastIndex) {
          html2canvas(document.querySelector(`#${id}`)).then(canvas => {
            this.images.push(canvas)
            resolve()
          })
        } else {
          html2canvas(document.querySelector(`#${id}`)).then(canvas => {
            this.images.push(canvas)
          })
        }
      })
    })
  }

  public callPDF() {
    this.generateCanvas()
      .then(() => {
        const doc = new jsPDF()
        this.images.map((image, i) => {
          const lastIndex = this.images.length - 1
          doc.addImage(image, 'JPEG', 15, 40, 180, 180)
          if (i === lastIndex) {
            doc.save()
          } else {
            doc.addPage();
          }
        })
      })
  }
}
