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

