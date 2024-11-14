interface JoinIdentityVerificationTemplateProps {
  verificationUrl: string;
}

export const joinEmailVerificationTemplate = ({ verificationUrl }: JoinIdentityVerificationTemplateProps) => ({
  id: 'joinVerification',
  subject: '길 가는 사람들 본인인증 메일',
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body>
        <div>
          <table
            cellpadding="0"
            width="600px"
            cellspacing="40"
            style="border: 1px solid #eaeaea"
          >
            <tbody>
              <tr>
                <td>
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/passersby-67eaa.firebasestorage.app/o/static%2Fbubble-logo.png?alt=media&token=c1bdaf96-8814-48f7-899d-1b976966d1fe"
                      width="87.5"
                      height="77"
                      alt="Logo"
                      loading="lazy"
                    />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <h1
                    style="
                      font-family: 'NanumGothic, sans-serif';
                      font-size: 30px;
                      font-weight: 400;
                      font-style: normal;
                      margin: 0;
                    "
                  >
                    길 가는 사람들 본인인증 메일
                  </h1>
                  <br />
                  <hr />
                </td>
              </tr>
              <tr>
                <td
                  style="
                    font-family: 'NanumGothic, sans-serif';
                    font-size: 16px;
                    font-weight: 200;
                    font-style: normal;
                    color: #5d5d5d;
                    padding-bottom: 20px;
                  "
                >
                  길 가는 사람들 본인인증 메일입니다.<br/>
                  길 가는 사람들의 회원이 되어주셔서 감사합니다.<br/>
                  아래의 링크로 접속해주시면 이메일 본인인증이 완료됩니다.<br/><br/>
                  <a href="${verificationUrl}" target="_blank">길 가는 사람들 본인인증 계속하기</a>
                </td>
              </tr>
            </tbody>
          </table>
          <table cellpadding="0" width="600px" cellspacing="0">
            <tbody style="background: #eaeaea; height: 100px">
              <tr>
                <td align="center">
                  <span style="color:#5d5d5d">℗ Zeroequaltwo All Rights Reserved.</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  `
});