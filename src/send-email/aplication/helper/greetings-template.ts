import fs from 'fs';

export const greetingsTemplate = (email: string) => {
  const imagePath = 'public/images/pdv-logo.png';
  const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });

  return `
    <body style="margin: 0; padding: 0; background-color: #f9f9f9;">
      <table role="presentation" style="width: 100%; height: 100%; border-spacing: 0; border-collapse: collapse; background-color: #f9f9f9;">
        <tr>
          <td align="center" style="padding: 20px;">
            <table role="presentation" style="width: 500px; background-color: #ffffff; border-radius: 10px; overflow: hidden; border-spacing: 0; text-align: left; font-family: Arial, sans-serif;">
              <tr>
                <td style="padding: 30px; text-align: center;">
                  <img src="data:image/png;base64,${imageBase64}" alt="Logo" style="width: 180px; height: auto; margin-bottom: 20px;">
                </td>
              </tr>
              <tr>
                <td style="padding: 30px; text-align: center;">
                  <h2 style="font-size: 22px; color: #333333; margin: 0 0 20px;">Nota fiscal referente a assinatura!</h2>
                  <p style="font-size: 16px; color: #666666; margin: 0 0 20px;">
                    Caro(a) ${email},<br>
                    Agradecemos por utilizar nosso sistema.<br>
                    Nesse e-email você encontrará todos os anexos da sua nota fiscal e nfse:
                  </p>
              </tr>
              <tr>
                <td style="padding: 30px; text-align: center;">
                  <h3 style="font-size: 18px; color: #333333; margin: 0 0 10px;">Alguma dúvida?</h3>
                  <p style="font-size: 14px; color: #666666; margin: 0 0 20px;">Se tiver alguma dúvida, não hesite em nos contatar. Temos um time de suporte pronto para lhe atender.</p>
                  <a href="https://wa.me/message/OK2YEKKOSHT4G1" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #ffffff; border: 1px solid #ffcc00; color: #333333; text-decoration: none; font-size: 14px; border-radius: 5px;">Suporte por WhatsApp</a>
                  <p style="font-size: 12px; color: #666666; margin: 20px 0 0;">
                    Edifício Artur Hauer - Praça Gen. Osório, 368 - SL 505 e 506 - Centro<br>
                    Curitiba - PR, 80020-010
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    `;
};
