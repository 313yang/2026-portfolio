# Soundy - 스포티파이 플레이리스트 음원 스트리밍 사이트

[Soundy](https://www.soundy-playlist.link/)

https://github.com/313yang/playlist

## Description

> 2023.01 ~ 2023.02

### Summary

![](https://user-images.githubusercontent.com/78190786/219079390-81b59393-3cc0-4343-b735-d019384bcd9d.png)

- spotify api를 통해 플레이리스트 조회
- 조회된 플레이리스트 내 음원을 유튜브에 검색
- 검색된 음원을 플레이어로 재생

## About Project

### 개발환경

`Next.js` , `Typesctript`, `React-query`, `Zustand`, `styled-components`

- Next.js : PC·모바일 데이터 응답 차이와 Core 에러 방지를 위해 데이터 조회·응답 처리를 Next.js 서버에서 구현
- React-query : 한정된 api사용량으로 인해 캐쉬된 데이터를 이용해 api호출을 최소화 하기 위해 사용.
- Zustand : 플레이어의 상태를 전역으로 관리하기 위해 사용. `persist`로 localstorage에 저장함으로써 브라우저 새로고침이나 종료후에도 삭제되지 않게 설정.

### Result

![](https://user-images.githubusercontent.com/78190786/219071539-401560ef-a6d0-40cf-9a71-94e933d315a2.png)

- 상황별 및 장르별 플레이리스트 선정

![](https://user-images.githubusercontent.com/78190786/219082086-928d71dd-02c5-4ce1-bccb-4c0d5569170a.png)

- 검색을 통해 플레이리스트 검색가능.
- Play : 해당 플레이리스트로 재생목록 순차재생.
- Random : 해당 플레이리스트로 재생목록 랜덤재생
- Add : 재생목록에 해당 플레이리스트 추가

![](https://user-images.githubusercontent.com/78190786/219082371-2f34e971-f6e4-41de-8585-c664daf0a664.png)

- 플레이어 : 자동재생, 한곡반복, 랜덤재생, 다음곡 및 이전곡 넘기기, 음원 재생바 및 볼륨 조절 & 뮤트기능

![](https://user-images.githubusercontent.com/78190786/219083242-2ebb6688-dcc6-4ca9-b1e4-eeede3fbe552.png)

- 재생목록 : 현재 재생목록 리스트 전체 및 개별삭제 기능.

### 트러블슈팅

- Zustand에서 useStore로 모든 상태와 액션을 하나의 스토어에 담아 사용했으나, 전체 스토어를 구독하게 되어 불필요한 렌더링이 발생하는 문제를 인지하고, 이를 해결하기 위해 각각의 스토어를 분리, 상태와 액션을 별도의 객체로 구성하여 개별적으로 export하는 방식으로 개선했습니다.
- 유튜브 API 할당량 제한으로 비디오 ID를 가져오는 대신, 유튜브에 음원 제목과 가수 이름을 쿼리로 검색한 후 HTML에서 비디오 ID를 크롤링해 React Player로 재생했습니다.
  하지만 모바일에서는 유튜브 모바일 페이지와 PC 버전의 HTML 차이로 인해 비디오 ID 추출 방식이 달라져 분기 처리가 필요했습니다.
  이를 해결하기 위해, 프론트에서 데이터를 Next.js 서버로 요청하고, 서버에서 처리한 후 응답을 반환하는 방식으로 개선했습니다.
