# AIVLE_School_BigProject
에이블스쿨 3기 AI트랙 2반 8조 빅프로젝트 VITA(Video To Answer)</BR>

![8조  3기 8조 썸네일](https://github.com/rakkeshasa/AIVLE_School_BigProject/assets/77041622/5a8bd623-600a-42b4-8587-a1c864fc45d1)
</BR></BR>

VITA 간단한 소개
---
사용자가 가지고 있는 영상 기반으로 AI채팅을 할 수 있는 서비스입니다.</BR>
영상을 업로드하면 AI가 내용을 요약하여 사용자에게 보여주고 영상 내용을 기반으로 말을 주고 받을 수 있는 챗봇입니다.

![8조  3기 8조 소개이미지](https://github.com/rakkeshasa/AIVLE_School_BigProject/assets/77041622/ff5950c6-efd0-4994-8695-047026170dbe)
</BR></BR>

핵심기능
---
![vita](https://github.com/rakkeshasa/AIVLE_School_BigProject/assets/77041622/0de90085-8cff-4177-882d-c6161d563465)
</BR></BR>

프로젝트에서 맡은 역할
---
- DB 설계
- 로그인 기능
- 게시글 기능
- 카테고리 구분 AI기능
- AWS 배포
</BR></BR>

코드 구현
---
- 로그인 기능

![3](https://github.com/rakkeshasa/AIVLE_School_BigProject/assets/77041622/1c7469b1-2089-4417-8949-b6f75b37caaa)

1) 프론트엔드에서 JSON기반으로 넘겨준 로그인 데이터를 DB에 있는 정보와 비교
2) 로그인 정보 일치 시, 사용자명과 ID를 세션으로 저장하여 다시 JSON형태로 리턴
3) 아이디가 맞으나, 비번이 틀릴경우 '아이디 또는 비밀번호가 올바르지 않습니다'를 리턴
4) DB에 저장된 아이디가 아닐경우 '존재하지 않는 id입니다'를 리턴
</BR>

- 게시글 기능

![5](https://github.com/rakkeshasa/AIVLE_School_BigProject/assets/77041622/fcc4c308-284d-4ba4-adb8-5697a091b7d6)

1) 프론트엔드에서 id2(post테이블 외래키), 게시글 제목, 게시글 내용 정보를 JSON으로 전달 받음
2) DB에서 id2값과 같은 유저를 찾음(id2는 로그인 시 유저의 id가 세션으로 저장됨)
3) 해당 유저가 DB에 있을 시 post테이블에 게시글을 저장
4) 관련 내용들을 JSON형태로 response함
</BR>

- 카테고리 구분 AI기능

![2](https://github.com/rakkeshasa/AIVLE_School_BigProject/assets/77041622/180139ed-fea3-4647-9f10-56c8f413e82d)

1) Google Console Cloud API를 사용
2) 영상이 한글 내용일 경우 카테고리가 안나와 영어로 번역을 해줌
3) 영어로 된 텍스트 기반으로 주제를 분류함
4) 내용과 관련된 주제를 3가지가 출력되고 그 중 관련성이 제일 높은 첫번째만 뽑아옴
5) 내용에서 카테고리 추출이 힘들경우 'No category found'라고 출력됨. (예시: 침착맨 삼국지)
