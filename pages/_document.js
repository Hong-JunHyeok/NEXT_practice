import Document, { Head, Main, NextScript, Html } from "next/document";
import flush from "styled-jsx/server";
import { ServerStyleSheet, createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
       html, body {
            height: 100%;
            overflow: auto;
          }
          #__next {
            height: 100%;
          }
`;

export default class MyDocument extends Document {
  static getInitialProps(context) {
    const sheet = new ServerStyleSheet(); // 서버사이드 렌더링 할 수 있게함.
    const { html, head } = context.renderPage();

    const page = context.renderPage(
      (App) => (props) =>
        sheet.collectStyles(
          <>
            <GlobalStyles />
            <App {...props} />
          </>
        )
    ); // 아래의 스타일들을 모아서 페이지를 그려준다. 원래는 <GlobalStyles/> 없이 하는데 글로벌 스타일을 지정해주기 위해 저렇게 적었다.
    const styles = flush();
    const styleTags = sheet.getStyleElement();

    return { ...page, html, head, styles, styleTags };
  }

  render() {
    return (
      <Html>
        <Head>
          {this.props.styleTags}

          <style>{`body { margin: 0 } /* custom! */`}</style>
          <title>Next.js 연습</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
