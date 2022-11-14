import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheet } from 'google-spreadsheet';
// const { GoogleSpreadsheet } = require('google-spreadsheet');
// var creds = require('./api-project-387049758591-b320945998ae.json')

@Injectable()
export class GoogleSpreadsheetService {
  /** */
  async showInfo() {
    // 參考文檔: https://docs.google.com/spreadsheets/d/1lV7jAuB_Es3o9ZNDwgH9vyYmsctEsDH5qjjL4Wi0ZCQ/edit#gid=0
    const doc = new GoogleSpreadsheet(
      '1lV7jAuB_Es3o9ZNDwgH9vyYmsctEsDH5qjjL4Wi0ZCQ',
    );
    const _creds = {
      type: 'service_account',
      project_id: 'api-project-387049758591',
      private_key_id: 'b320945998ae939650f10061a1674cb1ec8a540e',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyDLqJ2thM8im7\n/k7f6o578KkzzqgBOfE03EyvXmsG9F7FcJ6tnYR81UzWPrmQB18eGVd6t0Hdd6Jz\nRMyRDTgyBZxXvzEpjtgqF6v1msYk5BF295sQ84C5KTWgSKHLaigO7F/xN/o6eDg3\nw/stAnnRrEUeXz1Igdc6AvvjDJ9uscNPs7Hl+4gUTZxeNhtwwJIDyOr0UcFoPpth\nS8ud51oFA/AqQHahRObWB63/E9qyPpcu3GUGOD0wxd35P3kfKH4jWSnt+8gzddq8\nU0vfaHBAMjS8r0YukrDeJ94EbNSblCp5N5S5xTOl3FxlzXryj0MVFc6kw3dOvYOp\nVtucYq57AgMBAAECggEAA0Bp/D7LC6XJbw8Sqt4bD5apm09Jc1vrTtOZ2xo4AeMZ\nDxJ59BxgpBSfJpB/gg2il6dyMDk4dXzpD4ofP+n+Y/YFFrGx8ux7OjtiKp1qCZhY\nf6t5rP9wWPck7Sl8OpS9aKIuBdQkvlPMXZRaLl3AEponqqDUjHTww0CAbQqWBMzK\n6jhE0MaUHifMCPV8rscy5XTnzcZeEKj/zXdmidPcXs6ahbwx4NNlSsYCfAFFiOc3\ngX1dPsUXuJoV8JNlktMzx6OaWBHAfx4v4oHXxIfn+/pp+oLgCYi8Y7CauvG95tA1\n1Kv9GyyLQPWPvICypFxOvKTU53hth3HeafzmVPW9aQKBgQDoNBaoJbWRA4gpbzTO\nL1JbRXdzttRJAanC6Sb01DtcNJ3yjCzYWV6GbY3SpqruIuh5g4NjuAFJwZ39VsQy\nTFd+FsBPjob39npYxTLmtoZjQuzAWI2huT/pqJI8/UmiTjS1v7ZilxjnTMcdbOdJ\nK75Jk4rp1dIvF/2+6cGaskYxwwKBgQDES+dyFQbIXhKdF+v/uKH/L4d077GizcfM\nf6oaR8XyX7FCSr+NxJHaq3T9NIwtuwOLMkYEAkJbcQZf/hT3HGKPiXAmJrIqwJMR\nvLvdgsmdeprWDItr2EcUPHWj2L+OPCjm63U+9CEKZAL3CEjMCfNNjoHcc1hR6jUK\nepCWJEjM6QKBgQDFLS4sHNFgUbJ3FNKvXym9DXEQ1qjPUdU5CMkmz22Ur62MABI4\nqTMGTdNHlHXDf+sO/Gk+7UpSulIRhXNXDtKg5GrrY6kiuK9N4C6IEWhus67c6pVi\nRi+Kl7WOirrTUzuZNjGG6K2iA+V1DDweO0H7sokcZZB0oxe63T6kwUuwBwKBgFBL\nnEkWQMgFcye/eVIJfHqePpKe2dL2yhvkvPgzE82pRyEO4nxjRCZmrFxG+nBaZ4Cw\n9+L76ZjuCuWJUZojik2csrtoaMkELSS8Rzy9GyvH0z5rszxSJAErGhQDvZe5FCIh\nfrxZsIpHjs7uHJkaGORIvuYmaKJZY4j9ydcg0IbBAoGAZv/GVSXkk2yeXUy6vHj1\nGUIhuK4WIKUSJESIH+mZOt0ExytV4ZkzRvlD59R7yWQA1VQ1qnqeqVwc+lMuqa1/\nKZ+lwm2SFfBk2zDsodKbpjcWy/Dy/OLkke+s+wutFxNGCpAFeOyiBcUpFiCPHIno\nI4LYqW9NTWGbK6mv5yG4eWk=\n-----END PRIVATE KEY-----\n',
      client_email:
        'googlesheeteasy@api-project-387049758591.iam.gserviceaccount.com',
      client_id: '111539106785233309639',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/googlesheeteasy%40api-project-387049758591.iam.gserviceaccount.com',
    };

    await doc.useServiceAccountAuth(_creds);
    // console.log("test", test);
    doc.loadInfo(); // loads document properties and worksheets

    // console.log('await doc.loadInfo(): ', await doc.loadInfo());
    // 更新標題
    await doc.updateProperties({
      title: `title_${new Date().toLocaleDateString()}_${new Date().toTimeString()}`,
    });


    const sheet = doc.sheetsByIndex[0];  // 取得第一張工作表


    sheet.setHeaderRow([enum_headerValues.name, enum_headerValues.item, enum_headerValues.item2, enum_headerValues.price, enum_headerValues.price2])  // 特定標題
    console.log("sheet.headerValues:", sheet.headerValues)
    await sheet.saveUpdatedCells() // 儲存

    const rows = await sheet.getRows(); // can pass in { limit, offset }
    console.log('rows: ', rows[1]); // 顯示第一航資訊

    // 修改第二列資料
    rows[1][
      enum_headerValues.item
    ] = `sergey@abc.xyz_${new Date().toLocaleDateString()}_${new Date().toTimeString()}`; // update a value
    rows[1][
      enum_headerValues.item2
    ] = `abc.xyz_${new Date().toLocaleDateString()}_${new Date().toTimeString()}`; // update a value
    await rows[1].save(); // save updates


    // 建立新的 sheets
    const newSheet = await doc.addSheet({
      title: `hot new sheet!_${new Date().toLocaleDateString()}_${new Date().toTimeString()}`,
    });
    // 刪除 sheets
    await newSheet.delete();

    return doc;
  }
}

/** */
enum enum_headerValues {
  name = 'name',
  item = 'item',
  item2 = 'item2',
  price = 'price',
  price2 = 'price2',
}
