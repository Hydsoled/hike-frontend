import {Injectable} from "@angular/core";

@Injectable()
export class ImageFilter{
  extractImageFromBody(body: string, title: string): Array<any> {
    const images: Array<any> = [];
    let k = 0;
    while (body.indexOf(' src="data:image/') !== -1) {
      const idx = body.indexOf(' src="data:image/') + 6;
      let base64Url = body.substring(idx, body.indexOf('"', idx + 2));
      const name = new Date().getTime() + k + '_' + title;
      body = body.substring(0, idx) + name + body.substring(body.indexOf('"', idx + 1));
      base64Url = base64Url.replace(/^data:image\/[a-z]+;base64,/, "");
      const imageName = name + '.png';
      const imageBlob = this.dataURItoBlob(base64Url);
      const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
      images.push(imageFile);
      k++;
    }
    return [images, body];
  }

  dataURItoBlob(dataURI: any) {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([int8Array], { type: 'image/png' });
  }
}
