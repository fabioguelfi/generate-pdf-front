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
  protected images: Array<any> = []

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
		    const imgWidth = 180;
        const doc = new jsPDF()
        
        this.images.map((image, i) => {
          const lastIndex = this.images.length - 1
          const imgHeight = image.height * imgWidth / image.width;

          doc.addImage(image, 'JPEG', 15, 10, imgWidth, imgHeight);

          if (i === lastIndex) {
            doc.save()
          } else {
            doc.addPage();
          }
        })
      })
  }
}
