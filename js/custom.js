$(function(){//document.ready
  //팝업
  $(".about").click(function(){
    $("#modal").css("display","block");
  })
  $(".close").click(function(){
    $("#modal").css("display","none");
  }) 

  //로고없애기
  $(window).scroll(function(){
    var scroll = $(window).scrollTop();//스크롤 이동값을 변수 scroll에 할당
    var worksTop = $(".box02").offset().top;//worksTop변수에 .works의 top위치값을 저장

    //스크롤 이동시 top버튼 표시
    if(scroll > 50){//scroll이동값이 50보다 크면
      $(".logo").css("display","none");//top버튼 표시
    }else{//scroll이동값이 50보다 작으면
      $(".logo").css("display","block")//top버튼 제거
    }
  });

  $(function(){
    $("html,body").animate({scrollTop:0},"slow");
  });

  //한바닥씩 스크롤
  var count = 0;//콘텐츠 요소의 순번
  var scrollEvent = false; //스크롤 이벤트가 중복으로 적용되지 않고 한번씩만 실행될 수 있도록 해주기위한 변수
  var delta; //마우스 휠 이벤트가 발생했을때 반환되는 값을 담기 위한 변수(위 = 120, 아래 = -120)
  var artMax = $("article").length-1;//article의 갯수를 번수에 할당(인덱스번호와 같게 설정하기 위해 -1설정)
  $("article").on("mousewheel DOMMouseScroll",function(e){
  //article요소에 마우스휠 이벤트 생성
    e.preventDefault();//브라우저기능을 차단, 스크립트와 브라우저 간의 휠기능 간섭을 막아줌
    var E = e.originalEvent;//변수에 mousewheel이벤트의 originalEvent값을 할당.
    if(E.detail){//파이어폭스용
      delta = E.detail*-40;
    }else{//그 외 브라우저용
      delta = E.wheelDelta;
    }
    //파이어폭스 외 브라우저는 값이 120, -120으로 반환되지만 파이어폭스의 경우 -3, 3으로 반환됩니다. 값을 동일하게 맞춰주기 위해 -40을 곱하여 변수 delta에 할당합니다.
    
    
    //마우스휠을 위로 올렸을 경우
    if(delta>1 && scrollEvent == false && count >=1){
      //delta변수값이 1보다 크고 scrollEvent변수값이 false이고 count변수값이 1보다 크거나 같을때 실행
      console.log(delta);//콘솔창에 delta 값 출력
      scrollEvent = true;//scrollEvent변수를 ture로 할당하여 animate함수가 종료되기 전까지 중복 적용되지 않도록 해준다.
      count--;//count(순번)변수값에 1을 빼서 다시 count변수에 할당
      var ht = $(window).height()//ht변수에 브라우저의 높이값을 할당
      $("html,body").animate({"scrollTop":count*ht},500,function(){
        scrollEvent = false;//animate함수가 종료된 후에 다시 이벤트가 실행될수 있도록 scrollEvent값을 false로 변경	
      });
      //브라우저의 스크롤위치를 count*ht값으로 애니메이션 효과 적용
    //마우스 휠을 아래로 내렸을 경우	
    }else if(delta<1 && scrollEvent == false && count < artMax){//delta값이 1보다 작고 scrollEvent값이 false이고 count변수가 aritcle의 갯수보다 작을때 실행
      console.log(delta);
      scrollEvent = true;//위와 동일
      count++; //count변수에 1을 더해서 다시 count변수에 저장
      var ht = $(window).height()//ht변수에 브라우저의 높이값을 할당
      $("html,body").animate({"scrollTop":ht*count},500,function(){
        scrollEvent = false;	
      })
    }
  });

  //주황색바탕 회전
  var countt = 45; //이미지를 회전시킬 각도를 담을 변수
      $(".left-btn").click(function(){//왼쪽 화살표에 클릭이벤트 생성
        countt += 40; // countt변수에 40을 더해서 다시 countt변수에 할당합니다.
        var remainder = countt % 40; //countt변수를 40으로 나눴을때 나머지 값을 변수 remainder에 할당
        countt -= remainder;//countt변수에 remainder값을 빼서 다서 countt변수에 할당
        //content-carrusel요소의 transform:rotateY값을 countt값으로 할당
        $(".content-carrousel").css("transform","rotateY("+countt+"deg)");
      });

      $(".right-btn").click(function(){//오른쪽 화살표에 클릭이벤트 생성
        countt -= 40; // countt변수에 40을 빼서 다시 countt변수에 할당합니다.
        var remainder = countt % 40; //countt변수를 40으로 나눴을때 나머지 값을 변수 remainder에 할당
        countt -= remainder;//countt변수에 remainder값을 빼서 다서 countt변수에 할당
        //content-carrusel요소의 transform:rotateY값을 countt값으로 할당
        $(".content-carrousel").css("transform","rotateY("+countt+"deg)");
      });

    //자동으로 회전하는 효과
    var timer = setInterval(rotate,50); //0.05초마다 rotate함수 호출
    function rotate(){//rotate함수 생성
      countt += 0.5; //countt변수에 1을 더해서 다시 countt변수에 할당
      //content-carrusel요소의 transform:rotateY값을 countt값으로 할당
      $(".content-carrousel").css("transform","rotateY("+countt+"deg)");
    };

    //자동회전 멈추기
    $(".slideshow").hover(
      function(){
        clearInterval(timer);//timer변수에 할당한 setInterval 함수를 제거
    },function(){//mouseout
        timer = setInterval(rotate,50);//0.05초마다 rotate함수 호출
    });
});