// // import { Document, Packer, Paragraph, TextRun } from 'docx';
// const OneDriveAdapter = require('./OneDriveAdapter.ts');
// const fs = require('fs');

// class WordAdapter {
//   createFile({ token, path, name }) {
//     const doc = new Document();
//     // const outDir = path.join(__dirname, '../tmp/');
//     // console.log('after outDir  \n');
//     // docx.on('error', function (err) {
//     //   console.log(err);
//     // });
//     // console.log('after on \n');

//     // const paragraphObj = docx.createP();
//     // paragraphObj.addText('Testing DOCX', { bold: true });
//     // const out = fs.createWriteStream(path.join(outDir, 'test.docx'));

//     // out.on('error', function (err) {
//     //   console.log(err);
//     // });
//     // console.log('before onedrive');
//     doc.addSection({
//       properties: {},
//       children: [
//         new Paragraph({
//           children: [
//             new TextRun('Hello World'),
//             new TextRun({
//               text: 'Foo Bar',
//               bold: true,
//             }),
//           ],
//         }),
//       ],
//     });

//     Packer.toBuffer(doc).then((buffer) => {
//       fs.writeFileSync(`${name}.docx`, buffer);
//     });
//     const OneDrive = new OneDriveAdapter();
//     const { uploadUrl } = OneDrive.createUploadSession({ token, path, name });
//   }
// }

// module.exports = WordAdapter;
// export { };
