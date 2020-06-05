<template>
  <div class="about">
    <markdown-it-vue :content="this.context"/>
  </div>
</template>

<script>
  import MarkdownItVue from 'markdown-it-vue'
  import 'markdown-it-vue/dist/markdown-it-vue.css'
  import Submit from "../Problem/submit";
    export default {
        name: "about",
      components: { MarkdownItVue },
      data(){
          return{
            context:'# About us\n' +
              '\n' +
              '>  **Watermelon [在线评测系统]([https://zh.wikipedia.org/wiki/%E5%9C%A8%E7%BA%BF%E8%AF%84%E6%B5%8B%E7%B3%BB%E7%BB%9F](https://zh.wikipedia.org/wiki/在线评测系统))**（英语：**Watermelon Online Judge**，缩写**WmOJ**）是一个通过提供大量算法题目，定期举行[编程](https://zh.wikipedia.org/wiki/编程)比赛的在线系统。\n' +
              '\n' +
              '## 我如何能够提交我的代码?\n' +
              '\n' +
              '1. 注册一个账号\n' +
              '2. 进入一个题目\n' +
              '3. 粘贴你的代码\n' +
              '4. 点击提交，查看返回结果\n' +
              '\n' +
              '## 我的编译环境是什么？\n' +
              '\n' +
              '| Language |                Command                 |\n' +
              '| :------: | :------------------------------------: |\n' +
              '|   C 99   |    ``gcc -std=c99 Main.c -o C.out``    |\n' +
              '|  C++ 11  | ``g++ -std=c++11 Main.cpp -o C++.out`` |\n' +
              '|  Java 8  |          ``javac Main.java``           |\n' +
              '| Python2  |                  none                  |\n' +
              '| Python3  |                  none                  |\n' +
              '\n' +
              '\n' +
              '\n' +
              '## 评测机返回的结果代表什么意思?\n' +
              '\n' +
              '| 评测结果                       | 含义                                                         |\n' +
              '| ------------------------------ | ------------------------------------------------------------ |\n' +
              '| Waiting/等待                   | 等待评测队列对代码进行评测                                   |\n' +
              '| Compiling/编译中               | 系统正在编译代码                                             |\n' +
              '| Running/运行并评判             | 系统正在运行程序，并进行评判                                 |\n' +
              '| Accept/答案正确                | 代码通过所有的评测样例                                       |\n' +
              '| Presentation Error/格式错误    | 代码结果可以通过所有样例，但是没有符合题目要求的格式         |\n' +
              '| Wrong Answer/答案错误          | 代码没有通过所有的评测样例                                   |\n' +
              '| Time Limit Exceeded/时间超限   | 代码运行的时间超出了题目的要求，程序被提前强行终止           |\n' +
              '| Memory Limit Exceeded/内存超限 | 代码运行的内存超出了题目的要求，程序被提前强行终止           |\n' +
              '| Runtime Error/运行错误         | 代码在运行过程中出现段错误/访问非法内存空间/非法调用系统操作/浮点数除零错误/系统错误 |\n' +
              '| Compile Error/编译错误         | 编译过程中发生错误，编译失败                                 |\n' +
              '| Queuing/已加入队列             | 代码已加入爬虫提交队列，等待向远程服务器发送提交请求         |\n' +
              '\n' +
              '### 特别说明:格式错误\n' +
              '\n' +
              '> 什么是格式错误？\n' +
              '\n' +
              '格式错误是你的答案和标准输出的答案一致，但是控制字符/换行字符/空格数量与标准答案不同的情况。\n' +
              '例如:\n' +
              '\n' +
              '| 期望输出            | 实际输出 |\n' +
              '| :------------------ | :------- |\n' +
              '| a = b(间隔两个空格) | a=b      |\n' +
              '\n' +
              '这种时候判题机会返回**格式错误**\n' +
              '以下情况也会被认为是格式错误:\n' +
              '\n' +
              '| 期望输出      | 实际输出       |\n' +
              '| :------------ | :------------- |\n' +
              '| * * *  * *  * | * * *  * *   * |\n' +
              '\n' +
              '以上两个的区别是:期望输出的右边**直接是换行，没有空格**\n' +
              '但是，以下的输出不会被认为是格式错误，而是认为是**答案正确**\n' +
              '\n' +
              '| 期望输出       | 实际输出     |\n' +
              '| -------------- | ------------ |\n' +
              '| Hello,world!\\n | Hello,world! |\n' +
              '\n' +
              '这是因为判题机会**自动忽略最后一行行尾的换行符、空格以及控制字符**。\n' +
              '\n' +
              '以Problem 1000 A+B Problem 为例\n' +
              '\n' +
              '\n' +
              '\n' +
              '## 我如何针对OJ编写程序？\n' +
              '\n' +
              '以Problem 1000 A+B Problem 为例\n' +
              '\n' +
              '### C\n' +
              '\n' +
              '```C\n' +
              '#include <stdio.h>\n' +
              'int main()\n' +
              '{\n' +
              '  int a,b;\n' +
              '  scanf("%d%d",&a,&b);\n' +
              '  printf("%d\\n");\n' +
              '}\n' +
              '```\n' +
              '\n' +
              '### C++\n' +
              '\n' +
              '```c++\n' +
              '#include <iostream>\n' +
              'using namespace std;\n' +
              'int main()\n' +
              '{\n' +
              '  int a,b;\n' +
              '  cin >> a >> b;\n' +
              '  cout << a + b << endl;\n' +
              '}\n' +
              '```\n' +
              '\n' +
              '### Java\n' +
              '\n' +
              '**注:Java程序必须以`Main`作为主类，否则将返回编译错误\n' +
              '\n' +
              '```java\n' +
              'import java.util.*\n' +
              'public class Main {\n' +
              '\tpublic static void main(String[] args) throws Exception {\n' +
              '  \tScanner in = new Scanner(System.in);\n' +
              '    int a = in.nextInt();\n' +
              '    int b = in.nextInt();\n' +
              '    System.out.println(a+b);\n' +
              '  }\n' +
              '}\n' +
              '```\n' +
              '\n' +
              '### Python 2\n' +
              '\n' +
              '```python\n' +
              'print sum(map(int,raw_input().split()))\n' +
              '```\n' +
              '\n' +
              '### Python 3\n' +
              '\n' +
              '```python\n' +
              'print(sum(map(int,input().split()))\n' +
              '```\n' +
              '\n' +
              '\n' +
              '\n' +
              '## 注意事项\n' +
              '\n' +
              '### C/C++\n' +
              '\n' +
              '1. `main`函数的返回值必须为`int`,`void main()`等非标准的写法将不被允许\n' +
              '2. 对于64位整数，请使用`long long/unsigned long long`而不是`__int64`声明变量，并使用`%lld`或`%llu`输入输出\n' +
              '3. 由于众所周知的原因，`cin`和`cout`的速度慢于`scanf`以及`printf`。因此我们推荐使用后两者读写数据。(事实上`cin`以及`cout`并不一定比`scanf`和`printf`慢。详情见[感性对比评测机效率](https://oj.cupacm.com/discuss/thread/8)以及[cin加速](http://www.hankcs.com/program/cpp/cin-tie-with-sync_with_stdio-acceleration-input-and-output.html))\n' +
              '\n' +
              '### Java\n' +
              '\n' +
              '1. 提交的代码中只能存在一个public 类,该类名必须为`Main`,类`Main`必须设置为`public`\n' +
              '2. `Main`类中必须存在一个`static main`方法，并保证该方法返回`void`\n' +
              '\n' +
              '## 我明明本地跑样例过了，为什么提交没有AC?\n' +
              '\n' +
              '样例只是题目所有测试点中的一个例子，不代表你的代码能够通过所有测试点的测试。请认真思考后修改你的代码\n' +
              '\n' +
              '\n' +
              '\n' +
              '## 开发团队\n' +
              '\n' +
              '[孙增奎](https://github.com/Acerkoo) 、[徐维彦](https://github.com/aichikaodigua)、[张愉飞](https://github.com/Slanely)'
          }
      }
    }
</script>

<style scoped>
  .about{
    width: 70%;
    margin-top: 155px;
    margin-left: 15%;
    margin-bottom: 100px;
    position: absolute;
  }
</style>
