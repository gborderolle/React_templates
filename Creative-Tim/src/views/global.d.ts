// Validaciones de campo personalizadas
// Clase 74: https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core/learn/lecture/25915414#overview
import { StringSchema } from 'yup';

declare module 'yup' {
    class StringSchema {
        firstCharCapitalization(): this;
    }
}

