## 같은 그림 맞추기 게임

- DocumentFragments(MDN)
  - 임시 DOM 노드 입니다.
  - 메인 DOM 트리의 일부가 되지 않습니다.
  - 일반적인 사용방법은 임시 노드를 생성하고, 엘리먼트들을 임시 노드에 추가하고 그 임시 노드를 DOM 트리에 추가하는 것입니다.
  - 그 노드는 DOM 트리 내에서 그 부모의 모든 자식들로 대체됩니다.

- setCards 메서드 - 랜덤한 카드리스트를 리턴
- setGame 메서드를 완성해보세요.
- scores와 total이 같을 때는 'win'을 리턴
- limit과 moves를 비교해서 'defeat'을 리턴