# NEXT의 장점

- 간단한 클라이언트 사이드 라우팅
- Hot Module Replacement를 지원하는 Webpack 기반 작업환경
- Express 나 그 어떤 Node.js 서버와 함께 사용 가능
- Babel / Webpack 환경설정 커스터마이징 가능

# NEXT에서 Link잘 사용하기

기존에 `react-router-dom`에서는 `Link`를 사용하는데 `to`를 사용했겠지만, 여기서는 `href`를 사용한다.

그리고 `Link`내에는 "문자열"이 아닌 컴포넌트 혹은 엘리먼트가 있어여한다.
그 이유는 예를들어 내부의 엘리먼트에 `style`이나 `className`을 설정하여 Link의 스타일링을 하기 때문이다.

그 외 여러 설정을 내부 엘리먼트에서 한다.

```js
<Link href="/about">
  <div style={{ background: "black", color: "white" }}>소개</div>
</Link>
```

# NEXT에서 공용 컴포넌트 사용해보기

공용 컴포넌트란 페이지상에서 공동으로 사용하는(많이 사용되는) 컴포넌트를 의미한다.

대표적인 예로 헤더와 푸터가 있다.

`components`폴더 안에 컴포넌트를 정의해보자.

```js
import Link from "next/link";

const linkStyle = {
  marginRight: "1rem",
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>홈</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>소개</a>
    </Link>
  </div>
);

export default Header;
```

이제 page에서 만든 컴포넌트를 사용하면 된다.

```js
import Link from "next/link";
import Header from "../components/Header";

const Index = () => (
  <div>
    <Header />
    <h1>안녕, Next.js</h1>
    <h2>
      <Link href="/about">
        <a style={{ background: "black", color: "white" }}>소개</a>
      </Link>
    </h2>
  </div>
);

export default Index;
```

# NEXT에서 유동적인 주소 사용하기

## 쿼리 파라미터

쿼리 파라미터의 형태는 `/search?keyword=something`이다.

![image](https://user-images.githubusercontent.com/48292190/117805523-07298e80-b294-11eb-9a40-1e4da18d8abc.png)

props로 url을 가져와서 `url.query.keyword`에 접근하면 된다.

다음과 같이 page를 작성해주자.

```js
import Layout from "../components/Layout";

const Search = ({ url }) => {
  return <Layout>당신이 검색한 키워드는 "{url.query.keyword}" 입니다.</Layout>;
};

export default Search;
```

이제 쿼리 파라미터에 원하는 값을 넣어보도록 하자.

(http://localhost:3000/search?keyword=%22%EC%B7%A8%EC%97%85%22)

# NEXT에서 외부 데이터 가져오기

우선 `getInitialProps`라는 것을 이해해야 한다.

이 메소드는 서버 사이드에서 실행될 수도 있고, 클라이언트 사이드에서도 실행 될 수 있다.

코드를 보며 이해해보도록 하자.

```js
import Layout from "../components/Layout";

const SSRTest = ({ from }) => {
  return <Layout>{from}에서 실행되었습니다.</Layout>;
};

SSRTest.getInitialProps = ({ req }) => {
  return req ? { from: "server" } : { from: "client" };
};

export default SSRTest;
```

여기서 `getInitialProps`에서 실행한 메서드에서 리턴하는 값이 해당 컴포넌트의 props로 전달되게 된다.

`req`에 집중해서 볼 필요가 있는데, req에는 서버측에서 렌더링 될 때 파라미터로 전달되게 된다. 때문에 client측에서는 req에 undefined가 뜨게 되는것이다.

그 원리로 다음과 같은 삼항 연산자를 쓴 것이다.

![gif](https://velopert.com/wp-content/uploads/2017/04/4%E1%84%8B%E1%85%AF%E1%86%AF-08-2017-03-10-34.gif)

## axios를 통한 데이터 fetch

```js
import Layout from "../components/Layout";
import axios from "axios";

const SSRTest = ({ users }) => {
  const userList = users.map((user) => <li key={user.id}>{user.username}</li>);
  return (
    <Layout>
      <ul>{userList}</ul>
    </Layout>
  );
};

SSRTest.getInitialProps = async ({ req }) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users`
  );

  return { users: response.data };
};

export default SSRTest;
```

다음과 같이 getInitialProps에는 비동기처리를 할 수 있다.

그래서 다음과 같이 작업하면

![image](https://velopert.com/wp-content/uploads/2017/04/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA-2017-04-08-%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB-3.25.31.png)

잘 매핑이 된 모습을 볼 수 있다.

## prefetch 기능 사용해보기

prefetch는 데이터를 먼저 불러온 다음, 라우팅을 시작하는 방식이다.

방식은 어렵지 않다.

```js
<Link prefetch href="/ssr-test">
  <a style={linkStyle}>SSR 테스트</a>
</Link>
```

prefetch를 Link의 속성에 명시해주기만 하면 된다.

# Head 설정하기

`react-helmet`이라는 것을 사용해본 경험이 있는가? Next에서는 비슷한 기능이 기본으로 내장되어 있다.

```js
import Link from "next/link";
import Layout from "../components/Layout";
import Head from "next/head";

const Index = () => (
  <Layout>
    <Head>
      <title>Index 페이지</title>
    </Head>
    <h1>안녕, Next.js</h1>
    <h2>
      <Link href="/about">
        <a style={{ background: "black", color: "white" }}>소개</a>
      </Link>
    </h2>
  </Layout>
);

export default Index;
```

Head라는걸 import한 다음에 다음과 같이 작성을 하면,

![image](https://user-images.githubusercontent.com/48292190/117808468-e19e8400-b297-11eb-9976-fa645b3fedd8.png)

페이지의 title이 잘 바뀌는 모습을 볼 수 있다.

여러 페이지에서 공통적으로 사용하는 헤더를 설정할 경우, `_document.js`를 pages에 만들어주고 다음과 같은 코드를 작성해주자.

```js
import Document, { Head, Main, NextScript, Html } from "next/document";
import flush from "styled-jsx/server";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head } = renderPage();
    const styles = flush();

    return { html, head, styles };
  }

  render() {
    return (
      <html>
        <Head>
          <style>{`body { margin: 0 } /* custom! */`}</style>
          <title>Next.js 연습</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
```

이렇게 될 경우엔 이 값을 기본적으로 설정하고 Head 컴포넌트가 사용된 페이지의 경우엔 이 기본값 위에 덮어씌운다.

