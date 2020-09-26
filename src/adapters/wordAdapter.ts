import {
  Document,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
  UnderlineType,
} from 'docx';
import { saveAs } from 'file-saver';

export default class wordAdapter {
  public generateReceite(): void {
    const document = new Document();
    document.addSection({
      children: [
        new Paragraph({
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: TabStopPosition.MAX,
            },
          ],
          children: [new TextRun('תאריך: 23/09/2020'), new TextRun('\tלכבוד')],
        }),
        new Paragraph({
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: TabStopPosition.MAX,
            },
          ],
          children: [
            new TextRun('סימוכין:100000'),
            new TextRun('\tישראל'),
            new TextRun({
              text: 'שם החברה בע"מ',
              underline: {
                type: UnderlineType.SINGLE,
              },
            }).break(),
          ],
        }),
      ],
    });

    Packer.toBlob(document).then((blob) => {
      console.log(blob);
      saveAs(blob, 'test.docx');
      console.log('Document created Successfully');
    });
  }
}
