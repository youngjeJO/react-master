
## React master

**typescript는 프로그래밍 언어로 작성한 코드는 javascript로 변환 된다.**

typescript를 컴파일해서 javascript로 변환되는 과정에서 에러가 발생 될 수 있는 코드를 감지하면 컴파일을 하지 않는다.

이런 보호장치로 인해 런타임 에러가 생기지 않는다.

**타입추론** 처음 선언된 변수의 값이 어떤 타입인지 type checker가 확인 후 다음 값을 대입할 때 반영한다.

let a : string = “hi” 같은 명시적 표현보다 type checker가 추론할 수 있게 하는게 가독성이 좋고 코드를 적게 작성할 수 있다.

변수 뒤 ? 를 붙이면 선택적 타입을 만들수 있다.

let a?: string = let a : string | undefined

`type Animal = string | number | undefined; *// => type alias(=type 변수)*`

type alias를 이용해 사용자 정의 type을 만들 수 있다.

### void , never, unknown

 

unknown : 예를 들어 api를 불러올 때 불러올 데이터의 타입을 모를 때 사용한다.

```jsx
let a : unknown;

if(typeof a === ‘number’ ){

let b = a + 1

}

if(typeof a === ‘string’){

let b = a.toUpperCase();

}
```

와 같은 타입 확인 작업을 실시해줘야함

void : 함수에서 return 값이 없는 함수에 사용함

`fuction hi(): void{`

`console.log(’hi’)`

`}`

never : 절대 return 되지 않는 함수(error를 알려줄 때 사용할 수도)

**call siginatures :** 함수나 변수에 커서를 올렸을 때 나오는 안내창?  함수, 반환, 인자의 타입을 알려줌

**interface :** 오직 object  형태에 타입을 지정할 때 사용
