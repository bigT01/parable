import {Html, Head, Main, NextScript} from 'next/document'
import Layout from "@/Components/Layout";

export default function Document() {
    return (
        <Html lang="ru">
            <Head/>
            <body>
            <Layout>
                <Main/>
            </Layout>

            <NextScript/>
            </body>
        </Html>
    )
}
