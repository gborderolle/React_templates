// Clase 81: https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core/learn/lecture/25919858#overview
import { Field, useFormikContext } from "formik";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import './FormGroupMarkdown.css'

export default function FormGroupMarkdown(props: formGroupMarkdownProps) {

    const { values } = useFormikContext<any>();

    return (
        <div className="form-group form-markdown">
            <div>
                <label>{props.label}</label>
                <div>
                    <Field name={props.field} as="textarea" className="form-textarea" />
                </div>
            </div>
            <div>
                <label>{props.label} (preview):</label>
                <div className="markdown-container">
                    <ReactMarkdown>
                        {values[props.field]}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    )
}
interface formGroupMarkdownProps {
    field: string;
    label: string;
}