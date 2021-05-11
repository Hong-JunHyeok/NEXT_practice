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
