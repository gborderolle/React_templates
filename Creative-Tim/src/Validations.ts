// Validaciones de campo personalizadas
// Clase 74: https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core/learn/lecture/25915414#overview

import * as Yup from "yup";

export default function setupValidations() {
  Yup.addMethod<Yup.StringSchema>(
    Yup.string,
    "firstCharCapitalization",
    function (this: Yup.StringSchema) {
      return this.test(
        "first-char-capitalization",
        "La primera letra debe ser mayúscula.",
        function (value: string | undefined) {
          if (value && value.length > 0) {
            const firstChar = value.substring(0, 1);
            return firstChar === firstChar.toUpperCase();
          }
          return true;
        }
      );
    }
  );
}
