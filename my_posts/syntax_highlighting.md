---
title: "Syntax Highlighting"
subtitle: "in Code Blocks"
subheading: "Share code snippets with syntax highlighting"
isVisible: true
hideContent: false
image: ""
imagePositionX: 50
imagePositionY: 50
showImageInHeader: true
weight: 50
date: 2024-01-13T20:01:16
author: ""
snippet: "Writing a technical blog? Need to share code snippets? Eggspress can breathe life into your code blocks with syntax highlighting."
description: "Writing a technical blog? Need to share code snippets? Here's how to use syntax highlighting in your code blocks."
sidebar: "eggspress_links"
category: ""
prevPost: ""
nextPost: ""
relatedPost1: "editing-content"
relatedPost2: ""
relatedPost3: ""
relatedPost4: ""
relatedPost5: ""
relatedPost6: ""
relatedPost7: ""
relatedPost8: ""
relatedPost9: ""
---



## Hello, World!
The following examples show "Hello World" rendered with syntax highlighting in Eggspress. Each code block is preceded by the first set of three backticks followed by the name of the language. 

Note that some languages have abbreviated names. JavaScript can be highlighted either by opening a code block with `` ```javascript`` or `` ```js``.

`` ```ccp``

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

`` ```python``
```python
print("Hello, world!")
```

`` ```js``
```js
console.log('Hello, world!');
```

`` ```ts``
```ts
let message: string = 'Hello, World!';
console.log(message);
```

`` ```html``
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello, World!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>  
  </body>
</html>
```

`` ```kotlin``
```kotlin
fun main() {
   println("Hello World!")
}
```

`` ```sql``
```sql
 CREATE TABLE message (text char(15));
 INSERT INTO message (text) VALUES ('Hello, world!');
 SELECT text FROM message;
 DROP TABLE message;
 ```

`` ```fortran``
```fortran
C AREA OF A TRIANGLE - HERON'S FORMULA
C INPUT - CARD READER UNIT 5, INTEGER INPUT
C OUTPUT -
C INTEGER VARIABLES START WITH I,J,K,L,M OR N
      READ(5,501) IA,IB,IC
  501 FORMAT(3I5)
      IF (IA) 701, 777, 701
  701 IF (IB) 702, 777, 702
  702 IF (IC) 703, 777, 703
  777 STOP 1
  703 S = (IA + IB + IC) / 2.0
      AREA = SQRT( S * (S - IA) * (S - IB) * (S - IC) )
      WRITE(6,801) IA,IB,IC,AREA
  801 FORMAT(4H A= ,I5,5H  B= ,I5,5H  C= ,I5,8H  AREA= ,F10.2,
     $13H SQUARE UNITS)
      STOP
      END
```


