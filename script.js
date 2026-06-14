const quizData = [
      {
        question: "1.Which language runs in a web browser?",
        a:"java",
        b:"C",
        c:"Python",
        d:"JavaScript",
        correct:"d"
      },
      {
        question: "2.What does CSS stand for?",
        a:"Central Style sheet",
        b:"Cascading Style Sheet",
        c:"Computer Style Sheet",
        d:"Creative Style System",
        correct:"b"
      },
      {
        question: "3.What year was JavaScript launched?",
        a:"1996",
        b:"1995",
        c:"1994",
        d:"None of the above",
        correct:"b"
      },
      {
  question: "4.Which symbol is used for comments in JavaScript?",
  a: "//",
  b: "<!-- -->",
  c: "#",
  d: "**",
  correct: "a"
},
{
  question: "5.Which keyword is used to declare a variable?",
  a: "var",
  b: "int",
  c: "string",
  d: "float",
  correct: "a"
},
{
  question: "6.JavaScript is a ___ language?",
  a: "Compiled",
  b: "Interpreted",
  c: "Assembly",
  d: "Machine",
  correct: "b"
},
{
  question: "7.Which method converts JSON to object?",
  a: "JSON.stringify()",
  b: "JSON.parse()",
  c: "JSON.convert()",
  d: "JSON.object()",
  correct: "b"
},
{
  question: "8.Which operator is used to compare value & type?",
  a: "==",
  b: "=",
  c: "===",
  d: "!=",
  correct: "c"
},
{
  question: "9.Which function runs after page load?",
  a: "onload()",
  b: "ready()",
  c: "load()",
  d: "window.onload",
  correct: "d"
},
{
  question: "10.What is the output of: console.log(2 + '2')?",
  a: "4",
  b: "22",
  c: "NaN",
  d: "undefined",
  correct: "b"
},
{
  question: "11.What is the output of: console.log(typeof [])?",
  a: "array",
  b: "object",
  c: "list",
  d: "undefined",
  correct: "b"
}
    ];
    const quiz=document.getElementById('quiz');
    const questionEle =document.getElementById('question');
    const AnswerElm=document.querySelectorAll('.answer');
    const AnswerLab=document.querySelectorAll('.op_label');
    const a_text =document.getElementById('a_text');
    const b_text =document.getElementById('b_text');
    const c_text =document.getElementById('c_text');
    const d_text =document.getElementById('d_text');
    const prevbtn =document.getElementById('prev');
    const nextbtn =document.getElementById('next');
    const submitbtn =document.getElementById('submit');
    const result=document.getElementById('result');
    const score=document.getElementById('score');
    const showans= document.getElementById('showans');
    const reload= document.getElementById('rel');
    const msg=document.getElementById('msg');
    const count=document.getElementById('count');
    
    let currentQn=0;
    let answered=0;
    let submitted=false;
    let userSelected={

     };

    loadQuiz();
    
    function loadQuiz(){
        
        count.innerText=currentQn+1 +"/"+quizData.length;
        questionEle.innerText=quizData[currentQn].question;
        a_text.innerText=quizData[currentQn].a;
        b_text.innerText=quizData[currentQn].b;
        c_text.innerText=quizData[currentQn].c;
        d_text.innerText=quizData[currentQn].d;
        
        deSelected();
        
        if(userSelected[currentQn]){
            let Selected=userSelected[currentQn];
            document.getElementById(Selected).checked=true;
        }
        if(currentQn==quizData.length-1){
            nextbtn.style.display="none";
            if(submitted){
            submitbtn.style.display="none";
            rel.style.display="block"
            }else{
                submitbtn.style.display="block";
            }
        }
       if(submitted){
            let actualAns=quizData[currentQn].correct;
            let userSelect=userSelected[currentQn];
            AnswerLab.forEach(
                (AnswerLab)=>{
                    AnswerLab.classList.remove('correct')
                    AnswerLab.classList.remove('wrong')
                }
            )
            if(actualAns==userSelect){
                let op=actualAns+"_text"
                document.getElementById(op).classList.add('correct');
            }
            else{
                let cor_op=actualAns+"_text"
                document.getElementById(cor_op).classList.add('correct');
                let user_op=userSelect+"_text"
                document.getElementById(user_op).classList.add('wrong');
            }
        }

    
    }
    function deSelected(){
        AnswerElm.forEach(
            (AnswerElm)=>{
                AnswerElm.checked=false;
            }
        )
    }
nextbtn.addEventListener(
    'click',()=>{
        
        let answer=getSelected();
        if(!submitted){
        if(answer){
            if(answer==quizData[currentQn].correct){
                answered++;
            }
            currentQn++;
        }
        if(currentQn<quizData.length){
            loadQuiz();

        }
        
    }
 else{
    msg.style.display="none"
    currentQn++;
    loadQuiz();
}
    }
)
prevbtn.addEventListener(
    'click',()=>{
        if(currentQn>0){
            currentQn--;
            nextbtn.style.display="block";
            submitbtn.style.display="none";
            loadQuiz();
        }
    }
)
submitbtn.addEventListener(
    'click',()=>{
        let answer=getSelected();
        if(answer==quizData[currentQn].correct){
            answered++;
        }
        if(getSelected()){
            submitted=true;
            quiz.style.display="none";
            result.style.display="block";
            score.innerText= answered+ "/" + quizData.length + " questions corrected";
        }
    }
)
function getSelected(){

    let answer;
    AnswerElm.forEach(
        (AnswerElm)=>{
            if(AnswerElm.checked){
                answer=AnswerElm.id;
                userSelected[currentQn]=answer;
            }
            
    
        }
    )
    return answer;

}
function showan(){
    currentQn=0;
    msg.style.display="none";
     quiz.style.display="block";
            result.style.display="none";
             AnswerElm.forEach(
                (AnswerElm)=>{
                    AnswerElm.disabled=true;
        }
    )
    submitbtn.style.display="none";
    nextbtn.style.display="block";
    loadQuiz();

}
